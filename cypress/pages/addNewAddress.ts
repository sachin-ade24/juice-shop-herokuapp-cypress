import '../support/command';
import { allPrds, allProds } from './allProducts';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export const checkoutAndAddAddress = () => {
  cy.getText('span', ' Checkout ').click({ force: true });
  cy.wait(500);
  cy.getText('span', allProds.strings.ADD_NEW_ADDRESS).click({ force: true });
  cy.wait(500);
  allProds.getTextboxAndType(allPrds.COUNTRY, `${Cypress.env('country')}`);
  allProds.getTextboxAndType(allPrds.NAME, `${Cypress.env('name')}`);
  allProds.getTextboxAndType(
    allPrds.MOBILE_NUMBER,
    `${Cypress.env('mobileNumber')}`
  );
  allProds.getTextboxAndType(allPrds.ZIP_CODE, `${Cypress.env('ZIP_code')}`);
  allProds.getTextboxAndType(allPrds.ADDRESS, `${Cypress.env('address')}`);
  allProds.getTextboxAndType(allPrds.CITY, `${Cypress.env('city')}`);
  allProds.getTextboxAndType(allPrds.STATE, `${Cypress.env('state')}`);
  cy.get(allProds.selectors.SUBMIT)
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
};
