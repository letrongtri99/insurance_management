// In this file you can define global steps.
// If a specific step is used in more than one feature file.
// Please add them in the common step definitions.

/* eslint-disable import/no-extraneous-dependencies */
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from 'cucumber';
import _ from 'lodash';
import {
  CYPRESS_BASE_URL,
  TIMEOUT,
  verifyClearButton,
  listPageValues,
  getLastMonth,
} from '../../cypress-variable';

When('I click the button {string}', (text: string) => {
  cy.get('button')
    .contains('span', text)
    .should('be.visible', { timeout: TIMEOUT.WAIT_ELEMENT })
    .click({ force: true });
});

When(
  'I fill the field {string} with {string}',
  (selector: string, text: string) => {
    cy.get(`textarea[name="${selector}"]`).type(`${text}`);
  }
);

When('I check the {string} checkbox', (name: string) => {
  cy.get(`input[name="${name}"][type="checkbox"]`).check();
});

Then('expect the form to be visible', () => {
  cy.get('form').should('be.visible');
});

When('I navigate to the all leads page', () => {
  cy.intercept('GET', '**/api/user/v1alpha1/users/*').as('userload');
  cy.visit(`${CYPRESS_BASE_URL}/leads/all`);
  cy.wait('@userload');
});

When('I search for the lead', () => {
  cy.get('div[id=mui-component-select-selectValue]').click().focus();
  cy.get('li[data-value="id"]').click({ waitForAnimations: false });
  cy.get('@id').then((id: any) => {
    cy.get('input[name="inputValue"]').type(id);
  });
  cy.get('button').contains('span', 'Search').click();
});

When('I reload the page', () => {
  cy.reload();
});

Then(
  'expect the post response {string} have the following values',
  (postName: string, values: DataTable) => {
    const data = values.rowsHash();
    cy.wait(`@${postName}`)
      .its('response')
      .then((actualVal: any) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const propertyName in data) {
          if (data.hasOwnProperty.call(data, propertyName)) {
            const propertyValue = data[propertyName];
            expect(_.get(actualVal, propertyName).toString()).to.equal(
              propertyValue,
              `propertyName: ${propertyName} has value of ${propertyValue}`
            );
          }
        }
      });
  }
);
When('I click the icon {string} from the user created', () => {
  cy.get('td div svg')
    .eq(0)
    .should('be.visible', { timeout: TIMEOUT.WAIT_ELEMENT })
    .click({ force: true });
});

When('I click on {string} dropdown', (name: string) => {
  cy.get(`input[name="${name}"]`).click();
});

When(
  'I click on {string} item in the position: {string}',
  (name: string, pos: number) => {
    cy.get('[data-testid="option-select-item"]')
      .eq(pos)
      .should('have.text', name)
      .click();
  }
);

Then('{string} button will be enabled', (text: string) => {
  cy.get('button')
    .contains('span', text)
    .should('not.be.disabled', { timeout: TIMEOUT.WAIT_ELEMENT });
});

Then('expect {string} to be displayed on List page', (value: string) => {
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  // Check the length from the List page searched AND if its more than 5 rows, set it as 5
  cy.get('tr').then((row) => {
    // eslint-disable-next-line prefer-destructuring
    let length = row.length;
    if (length > 5) {
      length = 5;
    }
    // Start from 1 since the index = 0 is the table header
    for (let index = 1; index < length; index += 1) {
      if (listPageValues.username === value) {
        cy.get('tr').eq(index).find('td').eq(1).should('have.text', value);
      }
      if (listPageValues.fullname === value) {
        cy.get('tr').eq(index).find('td').eq(2).should('have.text', value);
      }
      if (listPageValues.product === value) {
        cy.get('tr').eq(index).find('td').eq(3).should('have.text', value);
      }
      if (listPageValues.role === value) {
        cy.get('tr').eq(index).find('td').eq(5).should('have.text', value);
      }
      if (listPageValues.agentScore === value) {
        cy.get('tr').eq(index).find('td').eq(6).should('have.text', value);
      }
      if (listPageValues.status === value) {
        cy.get('tr').eq(index).find('td').eq(7).should('have.text', value);
      }
      if (listPageValues.createdBy === value) {
        cy.get('tr').eq(index).find('td').eq(9).should('have.text', value);
      }
      if (listPageValues.createdOn === value) {
        const lastmonth = getLastMonth();
        cy.get('tr')
          .eq(index)
          .find('td')
          .eq(10)
          .should('contain.text', lastmonth);
      }
    }
    verifyClearButton();
  });
});

When('Input {string} on {string} field', (text: string, name: string) => {
  cy.get(`input[name="${name}"][type="text"]`)
    .should('be.visible', { timeout: TIMEOUT.WAIT_ELEMENT })
    .type(text);
});
