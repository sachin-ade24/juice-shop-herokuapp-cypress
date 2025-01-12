declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to type text into an input field
       * @example cy.typeInInput('#username', 'testUser')
       */
      getText(selector: string, text: string): Chainable<JQuery<HTMLElement>>;
    }
  }