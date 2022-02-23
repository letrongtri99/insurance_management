import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  CYPRESS_BASE_URL,
  setupLogin,
  stubNewRelic,
  TIMEOUT,
} from '../../../../cypress-variable';

before('Login before the test', () => {
  setupLogin();
});

beforeEach(() => {
  stubNewRelic();
});

Given('I am on the lead rejection page', () => {
  cy.intercept('GET', '**/api/lead-search/v1alpha1/*').as('pageload');
  cy.intercept('POST', '**/api/bff/api/leads/bulk/rejection').as('post');
  cy.visit(`${CYPRESS_BASE_URL}/leads/rejection`);
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.wait('@pageload', { timeout: TIMEOUT.WAIT_API });
});

When('I select the first rejected lead', () => {
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.get('span[data-cy="checkbox-lead"]')
    .eq(5)
    .within(() => {
      cy.get('input').click({ force: true });
    });
  cy.get('tr:nth-child(6) td')
    .eq(13)
    .invoke('text')
    .then((id: any) => {
      cy.wrap(id).as('id');
    });
});

Then('expect the lead to be rejected', () => {
  cy.wait('@post').should((xhr) => {
    expect(xhr.response?.body).deep.include({
      statusCode: 200,
      message: 'Bulk update successfully !',
    });
  });
});

Then('expect the status to be {string}', (color) => {
  cy.get('table tbody tr').should('have.length', 1);
  if (color === 'green') {
    cy.get('td').eq(6).should('have.css', 'color', 'rgb(26, 168, 134)');
  } else {
    cy.get('td').eq(6).should('have.css', 'color', 'rgb(169, 169, 169)');
  }
});
