/// <reference types="cypress"/>

import { Before, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  setupLogin,
  NAVIGATE_PAGE_VALUE,
  NAVIGATE_LEAD_SUB,
  TIMEOUT,
  API_URL,
  stubNewRelic,
} from '../../../../cypress-variable';

import { buttons } from '../../../../fixtures/assignment-page-vars.json';

// This before is from chai.hooks and is only once excecuted
// before all the test of the feature file.
before('Login before the test', () => {
  setupLogin();
});

// These Before hooks are coming from cypress-cucumber-preprocessor.
// Normally this hook is executed before each scenario but,
// in combination with tags it is only executed before scenario with corresponding tags.
Before({ tags: '@new-data' }, () => {
  cy.addData(`${API_URL}/lead/v1alpha2/leads`, 'post-lead').then((res: any) => {
    cy.wrap(res?.humanId).as('lead_id');
  });
});

Before({ tags: '@navigate-to-lead-assignment' }, () => {
  const leads = `[data-cy=list-item_${NAVIGATE_PAGE_VALUE.LEADS}]`;
  cy.get(leads).should('have.length', 1).click();
  cy.get('span').contains(NAVIGATE_LEAD_SUB.ASSIGNMENT).click({ force: true });
  cy.wait(TIMEOUT.WAIT_ELEMENT);

  cy.get('div[id=mui-component-select-selectValue]').click().focus();
  cy.get('li[data-value="id"]').click({ waitForAnimations: false });
  cy.get('@lead_id').then((id: any) => {
    cy.get('input[name="inputValue"]').type(id);
  });
  cy.get('button').contains(buttons.search_button.english).click();
  cy.wait(TIMEOUT.WAIT_ELEMENT);
});

beforeEach(() => {
  stubNewRelic();
});

When('I select the lead', () => {
  const selector = '[data-cy=checkbox-lead] [type="checkbox"]';
  cy.get(selector).first().check({ force: true });
});

When('I assign the lead to the specific employee', () => {
  // Assign to first employee in list
  cy.get('[data-cy=search-lead-button] div.MuiInputBase-root')
    .should('have.length', 1)
    .as('selectLead');
  cy.get('@selectLead').click();
  cy.focused().type('{downarrow}{enter}', { force: true });

  // Get the name of the assignee
  cy.focused().then(($elem: any) => {
    cy.wrap($elem.val().toString()).as('Assignee');
  });

  cy.get('[data-cy=button-assign]')
    .should('have.text', buttons.assign_button.english)
    .click();
  cy.get('[data-cy=button-assign-handle]').click();
});

When('I search for the lead again', () => {
  cy.get('@lead_id').then((text: any) => {
    cy.log(text);
  });
  cy.intercept(
    'GET',
    '**/api/lead-search/v1alpha1/search?product=car-insurance&page_size=15'
  ).as('search');
  // Filter the lead based on lead ID
  cy.get('div[id=mui-component-select-selectValue]')
    .click({ force: true })
    .focus();
  cy.get('li[data-value="id"]').click({
    force: true,
    waitForAnimations: false,
  });
  cy.get('@lead_id').then((id: any) => {
    cy.get('input[name="inputValue"]').clear().type(id);
  });
  cy.get('button').contains(buttons.search_button.english).click();
  cy.wait('@search');
});

Then('expect the lead to be assigned to the specific employee', () => {
  // Assert the lead
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.get('table tbody tr').should('have.length', 1);
  cy.get('@Assignee').then((assignee) => {
    cy.get('td').eq(2).should('have.text', assignee);
  });
  cy.get('@lead_id').then((id) => {
    cy.get('td').eq(10).should('have.text', id);
  });
});

Then('expect the lead to be unassigned', () => {
  cy.get('table tbody tr').should('have.length', 1);
  cy.get('td').eq(2).should('have.text', ' ');
});

When('I get the lead ID', () => {
  const selector = '[data-cy=checkbox-lead] [type="checkbox"]';
  cy.get(selector)
    .first()
    .closest('tr')
    .within(() => {
      cy.get('td')
        .eq(10)
        .invoke('text')
        .then((leadId) => {
          cy.wrap(leadId.trim().toString()).as('lead_id');
        });
    });
});

When('I unassign the lead', () => {
  cy.get('button').contains(buttons.unassign_button.english).click();
  cy.get('[data-cy=button-assign-handle]').click();
});
