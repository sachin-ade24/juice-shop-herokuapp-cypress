import '../support/command';
import { allProds } from './allProducts';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export const verifyWalletBalance = () => {
  cy.wait(1000);
  cy.get('b')
    .find(allProds.selectors.CONFIRMATION)
    .invoke('text')
    .then((text) => {
      const pattern = /\d+\.\d{2}/;
      const match = text.match(pattern);
      if (match) {
        expect(match).to.not.be.null;
        expect(match[0]).to.equal('0.00');
      } else {
        console.log('No match found');
      }
    });
};

export const handleCreditCardFields = () => {
  let first = 0;
  let last = 1;
  cy.getText(
    allProds.selectors.PANEL_DESCRIPTION,
    allProds.strings.ADD_CREDIT_OR_DEBIT
  ).click({
    force: true,
  });
  allProds.getCreditCardFieldsAndType('Name', `${Cypress.env('name')}`);
  allProds.getCreditCardFieldsAndType(
    'Card Number',
    `${Cypress.env('cardNumber')}`
  );
  allProds.selectValuesFromDropdown('Expiry Month', first, '10', '10');
  allProds.selectValuesFromDropdown('Expiry Year', last, '2085', '2085');
  cy.get(allProds.selectors.SUBMIT).click({ force: true });
  cy.getText('span', allProds.strings.CARD_SAVED_MSG);
  cy.wait(500);
  cy.get(allProds.selectors.RADIO_CONTAINER)
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
  cy.getText(
    allProds.selectors.PROCEED_TO_REVIEW,
    allProds.strings.CONTINUE
  ).click({
    force: true,
  });
};
