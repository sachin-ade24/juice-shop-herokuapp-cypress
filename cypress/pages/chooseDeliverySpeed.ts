import '../support/command';
import { allProds } from './allProducts';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export const chooseDeliverySpeed = () => {
  cy.contains(allProds.selectors.CELL, allProds.strings.ONE_DAY_DELIVERY).click(
    {
      force: true,
    }
  );
  cy.wait(1000);
  cy.getText('span', allProds.strings.CONTINUE).click({ force: true });
};
