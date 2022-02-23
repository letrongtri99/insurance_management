import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  createUniqueID,
  CYPRESS_BASE_URL,
  getDateWithOffset,
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

Given('I am on the teams page', () => {
  cy.intercept('GET', '**/api/view/v1alpha1/views/teams/teams?pageSize=15').as(
    'pageload'
  );
  cy.visit(`${CYPRESS_BASE_URL}/admin/teams`);
  cy.wait(TIMEOUT.WAIT_ELEMENT);
  cy.wait('@pageload', { timeout: TIMEOUT.WAIT_API });
  cy.wrap(createUniqueID()).as('id');
});

When('I fill in the team form correctly', () => {
  cy.get('form').within(() => {
    cy.get('#mui-component-select-teamRole').focus().click();
    cy.focused().type('{downarrow}{enter}');

    cy.get('@id').then((id) => {
      cy.get('input[name="teamName"]').type(`Cypress Team ${id}`);
    });

    cy.get('#mui-component-select-product').focus().click();
    cy.focused().type('{downarrow}{enter}');

    cy.get('#mui-component-select-leadType').focus().click();
    cy.focused().type('{downarrow}{enter}');
    cy.get('input[name="manager"]').then((elem) => {
      elem.val('Manager Cypress');
    });

    cy.get('input[name="supervisor"]').then((elem) => {
      elem.val('Sp Cypress');
    });

    cy.intercept('POST', '**/api/team/v1alpha1/teams', (req) => {
      req.body.manager = 'users/cafed116-a64b-459e-b14b-8c24fa710f32';
      req.body.supervisor = 'users/11699d69-0668-4000-849b-b8d6ddf717cc';
    }).as('post');

    cy.get('button').contains('span', 'Create Team').click();
  });
});

Then('expect the team to be created', () => {
  const today = getDateWithOffset('dd/MM/yyyy');
  cy.wait('@post');
  cy.wait(TIMEOUT.WAIT_ELEMENT);

  cy.get('@id').then((id) => {
    cy.get('tr > td').eq(1).should('include.text', `Cypress Team ${id}`, {
      timeout: TIMEOUT.WAIT_ELEMENT,
    });
  });

  cy.get('tr > td').eq(2).should('include.text', 'Car Insurance', {
    timeout: TIMEOUT.WAIT_ELEMENT,
  });
  cy.get('tr > td').eq(4).should('include.text', 'Retainer', {
    timeout: TIMEOUT.WAIT_ELEMENT,
  });
  cy.get('tr > td').eq(8).should('include.text', today, {
    timeout: TIMEOUT.WAIT_ELEMENT,
  });
});
