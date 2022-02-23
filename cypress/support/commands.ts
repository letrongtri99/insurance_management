// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-react-selector';
import 'cypress-file-upload';
import { importData } from '../cypress-variable';

Cypress.Commands.add(
  'selectElementWithText',
  (element: string, text: string) => {
    return cy.get(element).contains(element, text);
  }
);

Cypress.Commands.add('addData', (apiEndpoint: string, dataLocation: string) => {
  return importData(apiEndpoint, dataLocation);
});
