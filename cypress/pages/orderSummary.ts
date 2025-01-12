import '../support/command';
import { allProds } from './allProducts';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export const placeTheOrder = () => {
  cy.getText('span', allProds.strings.PLACE_ORDER_AND_PAY).click({
    force: true,
  });
};
