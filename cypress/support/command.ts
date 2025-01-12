/// <reference types="cypress" />

Cypress.Commands.add('getText', (selector: string, text: string) => {
  return cy
    .contains(selector, text, { timeout: 20000 })
    .scrollIntoView()
    .should('be.visible');
});
