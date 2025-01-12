import '../support/command';
import { allProds } from './allProducts';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export const selectAddressAndContinue = () => {
  cy.wait(500);
  cy.getText(allProds.selectors.CELL, `${Cypress.env('name')} `).click({
    force: true,
  });
  cy.wait(1000);
  cy.getText('span', allProds.strings.CONTINUE).click({ force: true });
  cy.wait(1000);
};
