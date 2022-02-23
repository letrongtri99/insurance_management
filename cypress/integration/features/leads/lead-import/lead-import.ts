/// <reference types="cypress"/>

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  CYPRESS_BASE_URL,
  getDateWithOffset,
  setupLogin,
  stubNewRelic,
  TIMEOUT,
} from '../../../../cypress-variable';
import { addLead } from '../../../../fixtures/import-page-vars.json';

before('Login before the test', () => {
  setupLogin();
});

beforeEach(() => {
  stubNewRelic();
});

Given('I am on the import page', () => {
  cy.intercept('GET', '/api/lead-import/v1alpha1/*').as('pageload');
  cy.visit(`${CYPRESS_BASE_URL}/leads/import`);
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.wait('@pageload', { timeout: TIMEOUT.WAIT_API });
});

When('I fill in the add manual lead form correctly', () => {
  // Setup interceptions
  cy.intercept(
    'GET',
    '**/api/lead-search/v1alpha1/search?product=car-insurance&page_size=15'
  ).as('search');
  cy.intercept('POST', '**/api/lead/v1alpha2/leads').as('post');

  cy.get('form').within(() => {
    const keys = Object.keys(addLead);
    const values = Object.values(addLead);

    for (let index = 0; index < keys.length; index += 1) {
      cy.get(`input[name="${keys[index]}"]`).clear().type(values[index]);
    }

    cy.get('input').last().focus().click();
    cy.focused().type('{downarrow}{enter}');
  });
});

When('the form is submitted', () => {
  cy.get('form').within(() => {
    cy.get('button').contains('span', 'Add Lead').click();
  });
});

When('I search for the imported lead', () => {
  cy.wait('@post').then((xhr: any) => {
    cy.wrap(xhr.response.body.humanId).as('id');
  });

  cy.intercept('GET', '**/api/user/v1alpha1/users/*').as('userload');

  cy.visit(`${CYPRESS_BASE_URL}/leads/all`);
  cy.wait('@userload');

  cy.get('div[id=mui-component-select-selectValue]').click().focus();
  cy.get('li[data-value="id"]').click({ waitForAnimations: false });
  cy.get('@id').then((id: any) => {
    cy.get('input[name="inputValue"]').type(id);
  });
  cy.get('button').contains('span', 'Search').click();
});

Then('expect the lead is added', () => {
  cy.get('table tbody tr').should('have.length', 1);
  cy.get('td')
    .eq(3)
    .should('have.text', `${addLead.firstName} ${addLead.lastName}`);
});

When('I drop the csv file and fill in the form', () => {
  // Setup interceptions
  cy.intercept('GET', '/api/lead-import/v1alpha1/*').as('pageload');
  cy.intercept('POST', '**/api/lead-import/v1alpha1/imports').as('post');
  cy.intercept('GET', '**/api/lead-search/v1alpha1/*').as('leadsearch');

  cy.get('.select-box').within(() => {
    cy.get('input').attachFile('lead-import.csv', {
      subjectType: 'drag-n-drop',
    });
  });
  cy.get('div')
    .contains('label', 'Lead Source')
    .next()
    .within(() => {
      cy.intercept('GET', '**/api/bff/api/sources/lookup*').as('sources');
      cy.get('button').eq(1).click();
      cy.wait('@sources');
      cy.waitForReact(TIMEOUT.WAIT_ELEMENT, '#root');
      cy.react('ul li').eq(1).click();
    });
});

Then('expect the leads are added', () => {
  const today = getDateWithOffset('dd/MM/yyyy');
  cy.intercept('GET', '/api/bff/api/users/lookup').as('lookup');
  cy.wait(TIMEOUT.WAIT_API);
  cy.wait('@post', { timeout: TIMEOUT.WAIT_API });
  cy.reload();
  cy.wait('@lookup', { timeout: TIMEOUT.WAIT_API });
  cy.wait('@pageload', { timeout: TIMEOUT.WAIT_API });

  // Due to loading time of the page
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  // Assert imported leads
  cy.get('tbody > tr > td')
    .eq(2)
    .should('have.text', today, { timeout: TIMEOUT.WAIT_ELEMENT });
  cy.get('tbody > tr > td').eq(4).should('have.text', '5');
  cy.get('tbody > tr > td').eq(6).should('have.text', 'COMPLETE');

  cy.visit(`${CYPRESS_BASE_URL}/leads/all`);
  cy.wait('@leadsearch', { timeout: TIMEOUT.WAIT_ELEMENT });

  // Due to loading time of the page
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  cy.get('tbody > tr > td').eq(3).should('have.text', 'Cypress_csv Test', {
    timeout: TIMEOUT.WAIT_ELEMENT,
  });
});
