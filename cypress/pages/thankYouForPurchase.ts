import '../support/command';
import { allProds } from './allProducts';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export const verifyTheThankYouMsg = () => {
  cy.getText('h1', allProds.strings.THANK_YOU);
};
