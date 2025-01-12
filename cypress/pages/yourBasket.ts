import '../support/command';
import { allProds } from './allProducts';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export const addAndDeleteItem = (product: string) => {
  let price: string;
  cy.getText('span', ' Your Basket').click({ force: true });
  cy.wait(200);
  cy.get('#price')
    .scrollIntoView()
    .invoke('text')
    .then((initialPrice) => {
      for (let i = 1; i <= 3; i++) {
        cy.getText(allProds.selectors.CELL, product)
          .parent()
          .find(allProds.selectors.PLUS_SQUARE)
          .click({ force: true });
        cy.wait(250);
      }
      cy.getText(allProds.selectors.CELL, product)
        .parent()
        .find(allProds.selectors.TRASH)
        .click({ force: true });
      price = initialPrice;
    });
  cy.get('#price')
    .scrollIntoView()
    .invoke('text')
    .then((newPrice) => {
      expect(newPrice).not.to.equal(price);
      cy.log(
        `The initial price was '${price}'. Now the price is '${newPrice}'.`
      );
      cy.log(`Hence, the price has changed.`);
    });
};
