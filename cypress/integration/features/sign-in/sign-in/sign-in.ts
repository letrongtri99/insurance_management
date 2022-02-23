import { Given, When, Then, Before } from 'cypress-cucumber-preprocessor/steps';
import { CYPRESS_BASE_URL } from '../../../../cypress-variable';

Before(() => {
  // Clear cookies
  cy.clearCookie('ory_kratos_session');
  cy.clearCookies();
  cy.getCookies().should('be.empty');

  // Block newrelic js outright due to issues with Cypress networking code.
  cy.log('Blocking NewRelic scripts');
  // Will block
  //  https://js-agent.newrelic.com/nr-spa-1208.js
  cy.intercept(/\.*newrelic.*$/, (req) => {
    console.log('NEW RELIC INTERCEPTED');
    req.reply("console.log('Fake New Relic script loaded');");
  });
});

Given("I visit the website's url", () => {
  cy.visit(CYPRESS_BASE_URL);
});

When(
  `I log in to the site with username {string} and password {string}`,
  (username, password) => {
    if (username === 'valid') {
      // If you want to allow assignment to function parameters, then you can safely disable this rule (ESlint documentation).
      // eslint-disable-next-line no-param-reassign
      username = Cypress.env('username');
    }
    if (password === 'valid') {
      // If you want to allow assignment to function parameters, then you can safely disable this rule (ESlint documentation).
      // eslint-disable-next-line no-param-reassign
      password = Cypress.env('password');
    }

    if (typeof username !== 'string') {
      throw new Error(
        'Missing username value, set using local file cypress.env.json'
      );
    }
    // but the password value should not be shown
    if (typeof password !== 'string' || !password) {
      throw new Error(
        'Missing password value, set using local file cypress.env.json'
      );
    }

    cy.get('#identifier').as('username');
    cy.get('@username').type(username);
    cy.get('#password').as('password');
    cy.get('@password').type(password);
    cy.get('.cypress-btn-login span').as('loginButton');
    cy.get('@loginButton').click();
  }
);

Then(`expect an alert with text {string} is shown`, (message) => {
  cy.get('form > span').should('have.text', message);
});

Then(`expect the url of the site will be {string}`, (url) => {
  cy.url().should('eq', url);
});
