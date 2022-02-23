/// <reference types="cypress"/>

import { Given, Before, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  setupLogin,
  NAVIGATE_PAGE_VALUE,
  NAVIGATE_LEAD_SUB,
  TIMEOUT,
  API_URL,
  WEBSITE_URL,
  getDateWithOffset,
  stubNewRelic,
} from '../../../../cypress-variable';
import { buttons } from '../../../../fixtures/assignment-page-vars.json';
import { customQuote } from '../../../../fixtures/detail-page-vars.json';

// This before is from chai.hooks and is only once executed
// before all the test of the feature file.
before('Login before the test', () => {
  setupLogin();
});

// This Before hook is coming from cypress-cucumber-preprocessor.
// Normally this hook is executed before each scenario but,
// in combination with tags it is only executed before scenario with corresponding tags.
Before({ tags: '@new-data' }, () => {
  cy.addData(`${API_URL}/lead/v1alpha2/leads`, 'post-lead').then((res: any) => {
    cy.wrap(res).as('response');
  });
});

Before({ tags: '@navigate-to-lead-details' }, () => {
  const leads = `[data-cy=list-item_${NAVIGATE_PAGE_VALUE.LEADS}]`;
  cy.get(leads).should('have.length', 1).click();
  cy.get('span')
    .contains(NAVIGATE_LEAD_SUB.ALL)
    .should('be.visible', { timeout: TIMEOUT.WAIT_API })
    .click();

  cy.get('div[id=mui-component-select-selectValue]')
    .should('be.visible', { timeout: TIMEOUT.WAIT_API })
    .click()
    .focus();
  cy.get('li[data-value="id"]').click({ waitForAnimations: false });
  cy.get('@response').then((id: any) => {
    cy.get('input[name="inputValue"]').type(id?.humanId);
  });
  cy.get('button').contains(buttons.search_button.english).click();

  cy.intercept('GET', '**/api/bff/api/users/lookup').as('userload');
  cy.intercept('GET', '**/api/lead/v1alpha2/leads/*').as('leadload');

  cy.get('.MuiTableBody-root a')
    .should('be.visible', { timeout: TIMEOUT.WAIT_API })
    .first()
    .invoke('removeAttr', 'target')
    .click({ force: true });
  cy.wait('@leadload', { timeout: TIMEOUT.WAIT_API });
});

Before({ tags: '@post' }, () => {
  cy.intercept('PATCH', '**/api/lead/v1alpha2/leads/*').as('markImportant');
  cy.intercept('POST', '**/api/calendar/v1alpha1/calendars/*/events').as(
    'calendar'
  );
  cy.intercept('POST', '**/api/bff/api/leads/*/voucher').as('couponCreate');
  cy.intercept('POST', '**/api/bff/api/leads/*/voucher').as('couponDelete');
  cy.intercept('POST', '**api/bff/api/leads/*/package').as('customQuote');
});

beforeEach(() => {
  stubNewRelic();
});

Given('I have a confirmed package', () => {
  cy.request({
    url: `${WEBSITE_URL}/api/sales/motor/confirmation`,
    method: 'POST',
    body: {
      package_id: 994278,
      insurance_category: 'both',
    },
  }).should((response) => {
    expect(response.status).to.eq(201);
  });
  cy.fixture('confirm-package').then((data: any) => {
    cy.url().then((url: string) => {
      // eslint-disable-next-line no-param-reassign
      data.id = `leads/${url.split('/').pop()}`;
      cy.request({
        url: `${WEBSITE_URL}/api/sales/motor/confirmation/confirm`,
        method: 'POST',
        body: data,
      }).should((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
});

When('I change the status to {string} and submit the form', (status) => {
  cy.get('#mui-component-select-status').scrollIntoView().click();
  cy.get('ul > li').contains(status).click();

  cy.get('form[class="summary-call-form"]').submit();
});

Then('expect the status should update to {string}', (actualStatus) => {
  cy.get('div[class="header-content"]').within(() => {
    cy.get('span').should('have.text', actualStatus);
  });
});

When('I insert a sum insured of {string}', (sumInsured) => {
  cy.get('input[name="preferredSumInsured"]').clear().type(sumInsured).blur();
  cy.get('button').contains('Save').click();
});

Then('expect the sum insured must be {string}', (expectedSumInsured) => {
  cy.get('input[name="preferredSumInsured"]').should(
    'have.value',
    expectedSumInsured
  );
});

When('I type a comment {string}', (comment: string) => {
  cy.get('.lead-detail-page__boards__activity').within(() => {
    cy.get('.unittest-text-area-comment').first().clear().type(comment);
    cy.get('button').contains('span', 'Save').first().click();
  });
});

Then('expect the comment should have the text {string}', (comment: string) => {
  cy.get('.lead-detail-page__boards__activity').within(() => {
    cy.get('li > div > p:nth-child(2)').should('contain', comment);
  });
});

When('I fill in the address form correctly', () => {
  cy.intercept('POST', '**/api/bff/api/leads/*/address').as('post');
  cy.intercept('**/api/address/v1alpha1/provinces/*/districts').as('districts');
  cy.intercept('GET', '**/subdistricts').as('subdistrict');

  cy.get('form').within(() => {
    cy.get('div').contains('span', 'Policy').click();
    cy.get('div').contains('span', 'Shipment').click();
    cy.get('div').contains('span', 'Billing').click();

    cy.get('input[name="firstName"]').type('test');
    cy.get('input[name="lastName"]').type('name');
    cy.get('input[name="address"]').type('test address');

    cy.get('#mui-component-select-province').focus().click({ force: true });
    cy.focused().type('{downarrow} {enter}');

    cy.wait('@districts');

    cy.get('#mui-component-select-district').focus().click({ force: true });
    cy.focused().type('{downarrow} {enter}');

    cy.wait('@subdistrict');

    cy.get('#mui-component-select-subDistrict').focus().click({ force: true });
    cy.focused().type('{downarrow} {enter}');
  });
});

When('I click the button {string} within the form', (text: any) => {
  cy.get('form').within(() => {
    cy.get('button').contains(text).click();
  });
});

Then(
  'expect the address form is successfully submitted with the correct values',
  () => {
    cy.wait(TIMEOUT.WAIT_ELEMENT);
    cy.wait('@post').should((xhr) => {
      expect(xhr.request.body).deep.include({
        address: 'test address',
        addressType: 'personal',
        addressUsage: ['policy', 'shipping', 'billing'],
        firstName: 'test',
        lastName: 'name',
      });
      expect(xhr?.response?.statusCode).to.equal(201);
    });
  }
);

When('I select a preferred type', () => {
  cy.get('span')
    .contains('Preferred v. type')
    .next()
    .within(() => {
      cy.intercept('PATCH', '**/api/lead/v1alpha2/leads/*').as('patch');
      cy.get('button').eq(1).focus().click({ force: true });
      cy.focused().type('{downarrow}{enter}');
    });
});

Then('expect the preferred type should be submitted succesfully', () => {
  cy.wait('@patch').should((xhr) => {
    expect(xhr?.response?.body.data.voluntaryInsuranceType).to.deep.equal([
      'type_1',
      'type_2',
    ]);
    expect(xhr?.response?.statusCode).to.deep.equal(200);
  });
});

When('I select preferred insurer {string}', (insurer: string) => {
  cy.intercept('PATCH', '**/api/lead/v1alpha2/leads/*').as('patch');
  cy.get('div[id="mui-component-select-preferredInsurer"]').focus().click();
  cy.get('ul').contains(insurer).click();
  cy.wait('@patch');
});

Then('expect the preferred insurer should be {string}', (insurer: string) => {
  cy.get('div[id="mui-component-select-preferredInsurer"]').should(
    'have.text',
    insurer
  );
});

When('I type {string} and submit the email form', (email: string) => {
  cy.get('input[name="email"]').clear().type(email).blur();
  cy.get('div[class="email-modal"]').within(() => {
    cy.get('button').contains('Add').click({ force: true });
  });
});

Then('expect the email {string} as a select option', (email: string) => {
  cy.get('div[id="mui-component-select-to"]').focus().click();
  cy.focused().type('{downarrow}{enter}', { force: true });

  // Assert
  cy.get('div[id="mui-component-select-to"]').should('have.text', email);

  // Close modal
  cy.get('.close-btn').click();
});

When('I sent an email', () => {
  cy.get('div[id="mui-component-select-emailTemplate"]').focus().click();
  cy.focused().type('{downarrow}{enter}', { force: true });

  cy.get('div[id="mui-component-select-to"]').focus().click();
  cy.focused().type('{downarrow}{enter}', { force: true });

  cy.intercept('POST', '**/api/mailer/**').as('post');
  cy.get('button[type="submit"]').contains('Send').click();
});

Then('expect the email to be sent', () => {
  // Assert post method is succeeded
  cy.wait('@post')
    .its('response')
    .then((res) => {
      expect(res?.statusCode, 'statusCode').to.deep.equal(200);
    });
  cy.get('.close-btn').click();
});

When('I type {string} and submit the phone form', (phoneNumber: string) => {
  cy.intercept('POST', '**/api/bff/api/leads/*/phone').as('post');
  cy.get('input[name="phone"]').clear().type(phoneNumber).blur();
  cy.get('.phone-modal').within(() => {
    cy.get('button').contains('Add').click({ force: true });
  });
  cy.wait('@post');
});

Then(
  'expect the phone number is added and have value {string}',
  (formattedPhoneNumber: string) => {
    cy.get('div').contains('button', 'Call').next().click();

    cy.waitForReact(TIMEOUT.WAIT_ELEMENT, '#root');
    cy.react('li')
      .eq(0)
      .then((el) => {
        expect(el.text()).to.have.string(formattedPhoneNumber);
      });
  }
);

When('I select the {string} option', (option: string) => {
  cy.get('div[role="tablist"]').within(() => {
    cy.get('button').contains(option).click();
  });
});

Then(
  'expect the phonenumber {string} as a select option',
  (formattedPhoneNumber: string) => {
    cy.get('div[id="mui-component-select-phone"]').focus().click();
    cy.waitForReact();
    cy.react('ul li').last().should('have.text', formattedPhoneNumber);
    cy.react('ul li').last().click();

    // Close modal
    cy.get('div[class=message-modal-override]').within(() => {
      cy.get('.close-btn').click();
    });
  }
);

When('I select a phonenumber and type {string}', (content: string) => {
  cy.get('div[id="mui-component-select-phone"]').focus().click();
  cy.focused().type('{downarrow}{enter}', { force: true });

  cy.get('textarea[name="smsMessage"]').clear().type(content).blur();
  cy.intercept('POST', '**/api/sms/**').as('post');
});

Then('expect the SMS to be sent with text {string}', (content: string) => {
  cy.wait('@post')
    .its('response')
    .then((res) => {
      expect(res?.statusCode, 'statusCode').to.deep.equal(200);
      expect(res?.body.message, 'test message').to.deep.equal(content);
    });
  cy.get('.close-btn').click();
});

When('I fill in the custom quote form correctly', () => {
  const tomorrow = getDateWithOffset('dd/MM/yyyy', 1);
  cy.get('form').within(() => {
    const keys = Object.keys(customQuote);
    const values = Object.values(customQuote);

    for (let index = 0; index < keys.length; index += 1) {
      cy.get(`input[name="${keys[index]}"]`).clear().type(values[index]);
    }

    cy.get('input[name="expiration_date"]').type(tomorrow);
    cy.get('#mui-component-select-insurance_company_id').focus().click();
    cy.focused().type('{downarrow}{enter}');
    cy.get('#mui-component-select-car_insurance_type').focus().click();
    cy.focused().type('{downarrow}{enter}');
    cy.get('#mui-component-select-car_age').focus().click();
    cy.focused().type('{downarrow}{enter}');
    cy.get('#mui-component-select-personal_accident_coverage_no')
      .focus()
      .click();
    cy.focused().type('{downarrow}{enter}');
    cy.get('#mui-component-select-medical_expenses_coverage_no')
      .focus()
      .click();
    cy.focused().type('{downarrow}{enter}');
  });
});

Then(
  'expect the custom quote form is successfully submitted with the correct values',
  () => {
    cy.get('form').within(() => {
      cy.get('button').contains('span > b', 'Back').click();
    });
    cy.wait('@post').should((xhr) => {
      expect(xhr.request.body).deep.include({
        name: customQuote.name,
        source: 'manual',
        sum_coverage_max: parseInt(customQuote.sum_coverage_max, 10),
        liability_per_accident_coverage: parseInt(
          customQuote.liability_per_accident_coverage,
          10
        ),
        liability_per_person_coverage: parseInt(
          customQuote.liability_per_person_coverage,
          10
        ),
        liability_property_coverage: parseInt(
          customQuote.liability_property_coverage,
          10
        ),
        medical_expenses_coverage: parseInt(
          customQuote.medical_expenses_coverage,
          10
        ),
        personal_accident_coverage: parseInt(
          customQuote.personal_accident_coverage,
          10
        ),
        price: parseInt(customQuote.price, 10),
        bail_bond_coverage: parseInt(customQuote.bail_bond_coverage, 10),
      });
      expect(xhr?.response?.statusCode).to.equal(201);
    });
  }
);

Then('expect the status color should be {string}', (color: string) => {
  let value: string;
  if (color === 'green') {
    value = 'rgb(26, 168, 134)';
  }
  if (color === 'orange') {
    value = 'rgb(255, 157, 0)';
  }
  cy.get('div[class="header-content"]').within(() => {
    cy.get('button').should('have.css', 'background-color', value);
  });
});

When('I select the reason {string} and submit the form', (reason: string) => {
  cy.get('div[id="mui-component-select-reason"]').click();
  cy.get('li').contains(reason).click();
  cy.get('form[class="summary-call-form"]').submit();
});

When('I reload the page', () => {
  cy.intercept('GET', '**/api/bff/api/users/lookup').as('userload');
  cy.intercept('GET', '**/api/lead/v1alpha2/leads/*').as('leadload');
  cy.reload();
  cy.wait('@userload', { timeout: TIMEOUT.WAIT_API });
  cy.wait('@leadload', { timeout: TIMEOUT.WAIT_API });
});

Then('expect button should update to {string}', (expectedText) => {
  cy.get('.MuiButton-label').contains(expectedText).should('exist');
});

When('I select {string} as appointment type', (appointmentType: string) => {
  cy.get('#mui-component-select-type').click();
  cy.get('li')
    .contains(appointmentType)
    .should('be.visible', { timeout: 6500 })
    .click();
});

When('I select next week as desired calling day', (day: string) => {
  const nextWeek = getDateWithOffset('dd/MM/yyyy', 7);
  cy.get('#dateSearch').type(nextWeek);
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.get('button').contains('span', 'Search').click();
});

When(
  'I fill the input field {string} with {string}',
  (selector: string, text: string) => {
    cy.get(`input[name="${selector}"]`).type(`${text}`);
  }
);

When(
  'I select first available time slot for a call of {string}',
  (duration: string) => {
    cy.get('.timeslot-item').not('.default').first().click();
    cy.get('li[class="timeslot-select__item"]')
      .contains(duration)
      .scrollIntoView()
      .click({ force: true });
  }
);

When('I click the button {string} in the modal', (text: string) => {
  cy.get('.schedule-modal__save').within(() => {
    cy.get('button').contains(text).scrollIntoView().click({ force: true });
  });
});

When('I delete the added coupon', () => {
  cy.get('span[aria-label="upload picture"]').click();
});

When('I add installment of {string}', (installmentType: string) => {
  cy.get('#mui-component-select-paymentSchedule').click({ force: true });
  cy.waitForReact(5000, '#root');
  cy.react('li', { props: { name: 'paymentSchedule' } }).within(() => {
    cy.get('li').contains(installmentType).click();
  });
});

When('drag the {string} inside the designated area', (fileName: string) => {
  cy.get('div[class="payment-confirmation-dropzone"]').within(() => {
    cy.get('input').attachFile(fileName, {
      subjectType: 'drag-n-drop',
    });
  });
});

When(
  'I fill the field {string} with value {string}',
  (selector: string, value: string) => {
    if (value === 'today') {
      const today = getDateWithOffset('dd/MM/yyyy');
      cy.get(`input[name="${selector}"]`).type(today);
    } else {
      cy.get(`input[name="${selector}"]`).type(value);
    }
  }
);
