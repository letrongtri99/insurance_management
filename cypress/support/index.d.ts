// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command
/// <reference types="cypress-react-selector" />
/// <reference types="cypress-file-upload" />

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      selectElementWithText(element: string, text: string): Chainable<Element>;
      addData(apiEndpoint: string, dataLocation: string): Chainable<Element>;
    }
  }
}
