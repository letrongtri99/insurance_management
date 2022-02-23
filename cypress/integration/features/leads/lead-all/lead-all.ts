/// <reference types="cypress"/>

import { Before, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  setupLogin,
  NAVIGATE_PAGE_VALUE,
  NAVIGATE_LEAD_SUB,
  TIMEOUT,
  stubNewRelic,
} from '../../../../cypress-variable';

// This before is from chai.hooks and is only once executed
// before all the test of the feature file.
before('Login before the test', () => {
  setupLogin();
});

beforeEach(() => {
  stubNewRelic();
});

Before({ tags: '@navigate-to-lead-all' }, () => {
  const leads = `[data-cy=list-item_${NAVIGATE_PAGE_VALUE.LEADS}]`;
  cy.get(leads).should('be.visible');
  cy.get(leads).should('have.length', 1).click();
  cy.get('span').contains(NAVIGATE_LEAD_SUB.ALL).click();
  cy.wait(TIMEOUT.WAIT_ELEMENT);
});

When('I filter lead status {string}', (status) => {
  cy.get('input[name=leadStatus]').clear({ force: true });
  cy.get('label')
    .contains('Lead Status')
    .parent()
    .within(() => {
      cy.waitForReact();
      cy.react('li').contains(status).click();
      cy.get('button[title="Close"]').click({ force: true });
    });
});

Then(
  'expect the filtered column {string} would have result of {string}',
  (columnName: string, searchResult: string) => {
    cy.wait(TIMEOUT.WAIT_ELEMENT);
    if (columnName === 'team') {
      cy.get('tbody > tr > td')
        .eq(1)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else if (columnName === 'user') {
      cy.get('tbody > tr > td')
        .eq(2)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else if (columnName === 'name') {
      cy.get('tbody > tr > td')
        .eq(3)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else if (columnName === 'expire date') {
      cy.get('tbody > tr > td')
        .eq(4)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else if (columnName === 'lead type') {
      cy.get('tbody > tr > td')
        .eq(5)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else if (columnName === 'lead status') {
      cy.get('tbody > tr > td')
        .eq(6)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else if (columnName === 'lead id') {
      cy.get('tbody > tr > td')
        .eq(10)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else if (columnName === 'email') {
      cy.get('tbody > tr > td')
        .eq(21)
        .should('contain', searchResult, { timeout: TIMEOUT.WAIT_ELEMENT });
    } else {
      cy.log('Not found expected column');
    }
  }
);

When(
  'I filter search by {string} with value {string}',
  (searchWith: string, searchData: string) => {
    cy.wait(TIMEOUT.WAIT_ELEMENT);
    cy.get('div[id=mui-component-select-selectValue]').click().focus();
    if (searchWith === 'ID') {
      cy.get('li[data-value="id"]').click({
        waitForAnimations: false,
      });
    } else if (searchWith === 'Customer Name') {
      cy.get('li[data-value="customerName"]').click({
        waitForAnimations: false,
      });
    } else if (searchWith === 'Customer Phone') {
      cy.get('li[data-value="customerPhone"]').click({
        waitForAnimations: false,
      });
    } else if (searchWith === 'Customer Email') {
      cy.get('li[data-value="customerEmail"]').click({
        waitForAnimations: false,
      });
    } else {
      cy.log('Your search filter is not in dropdown list');
    }
    cy.get('input[name="inputValue"]').type(searchData);
  }
);

When('I click see the details', () => {
  cy.get('.MuiTableBody-root a')
    .first()
    .invoke('removeAttr', 'target')
    .click({ force: true });
});

Then('expect all the details of lead correctly', () => {
  cy.intercept('GET', '**/api/lead/v1alpha2/leads/*').as('leadData');
  cy.wait('@leadData').its('response.statusCode').should('eq', 200);
  // I will add more validation if we have a new ui @wutthiphat 9/22/2021
});
