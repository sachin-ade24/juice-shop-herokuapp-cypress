import '../support/command';

export class allProducts {
  /*Note: We can save a few of the selectors and strings in their relevant pages, 
    but since they are few in number, I saved them here.*/
  get selectors() {
    return {
      PAGINATOR: 'mat-paginator.mat-paginator',
      FIELD_FLEX: '.mat-form-field-flex',
      ITEMS_PER_PAGE: '[aria-label="Items per page:"]',
      DIALOG_CONTAINER: '.mat-dialog-container',
      PANEL_TITLE: 'mat-panel-title',
      DIALOG_ACTIONS: 'mat-dialog-actions',
      GRID_TITLE: 'mat-grid-tile',
      GRID_LIST: 'mat-grid-list',
      PAGINATOR_RANGE: '.mat-paginator-range-label',
      SLIDE_TOGGLE: 'mat-slide-toggle',
      SHOPPING_CART: '[aria-label="Show the shopping cart"]',
      COUNTER: '.fa-layers-counter',
      SUBMIT: '#submitButton',
      ITEM_NAME: '.item-name',
      PLUS_SQUARE: '.fa-plus-square',
      TRASH: '.fa-trash-alt',
      CONFIRMATION: 'span.confirmation',
      PANEL_DESCRIPTION: 'mat-panel-description',
      FORM_FIELD_INFIX: '.mat-form-field-infix',
      LABEL: 'mat-label',
      CELL: 'mat-cell',
      RADIO_CONTAINER: 'span.mat-radio-container',
      PROCEED_TO_REVIEW: '[aria-label="Proceed to review"]',
    };
  }
  get strings() {
    return {
      EXPECTED_URL: 'https://juice-shop.herokuapp.com',
      EXPECTED_TITLE: 'OWASP Juice Shop',
      APPLE_JUICE: ' Apple Juice (1000ml) ',
      APPLE_POMACE: ' Apple Pomace ',
      BANANA_JUICE: ' Banana Juice (1000ml) ',
      BEST_JUICE: ' Best Juice Shop Salesman Artwork ',
      CARROT_JUICE: ' Carrot Juice (1000ml) ',
      JUICE_SHOP_TICKET: ' DSOMM & Juice Shop User Day Ticket ',
      ADD_TO_BASKET: 'Add to Basket',
      ADD_NEW_ADDRESS: 'Add New Address',
      LOG_IN: ' Log in ',
      CARD_SAVED_MSG:
        'Your card ending with 4567 has been saved for your convenience',
      CONTINUE: 'Continue',
      ONE_DAY_DELIVERY: ' One Day Delivery',
      ADD_CREDIT_OR_DEBIT: ' Add a credit or debit card ',
      PLACE_ORDER_AND_PAY: 'Place your order and pay',
      THANK_YOU: 'Thank you for your purchase!',
    };
  }

  getInitialCountOfItemsInTheCart() {
    cy.get(this.selectors.SHOPPING_CART)
      .scrollIntoView()
      .getText(this.selectors.COUNTER, '0');
  }

  getTextboxAndType(parameter: string, text: string) {
    cy.get(`[placeholder="Please provide a${parameter}."]`)
      .scrollIntoView()
      .type(text, {
        force: true,
      });
  }

  getCreditCardFieldsAndType(fieldName: string, text: string) {
    cy.contains(this.selectors.LABEL, fieldName)
      .parents(this.selectors.FORM_FIELD_INFIX)
      .find('input')
      .type(text, {
        force: true,
      });
  }

  selectValuesFromDropdown(
    cardField: string,
    index: number,
    text: string,
    value: string
  ) {
    cy.getText(this.selectors.LABEL, cardField).click({ force: true });
    cy.get('select').eq(index).select(text).should('have.value', value);
  }
}

export const allProds = new allProducts();

export enum allPrds {
  MAX_NO_OF_ITEMS = ' 48 ',
  MOBILE_NUMBER = ' mobile number',
  COUNTRY = ' country',
  NAME = ' name',
  ZIP_CODE = ' ZIP code',
  ADDRESS = 'n address',
  CITY = ' city',
  STATE = ' state',
}

export const selectMaximumItems = () => {
  cy.get(allProds.selectors.PAGINATOR).within(() => {
    cy.get(allProds.selectors.FIELD_FLEX)
      .find('.mat-select')
      .click({ force: true });
    cy.wait(1000);
    cy.get(allProds.selectors.ITEMS_PER_PAGE)
      .focus()
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{enter}');
  });
};

export const assertionForDisplayingAllItems = () => {
  let length: number;
  cy.get('body').then((body) => {
    length = body.find(allProds.selectors.GRID_TITLE).length;
    cy.log(`The number of items on the page are equal to: ${length}`);
    cy.get(allProds.selectors.GRID_LIST)
      .find(allProds.selectors.GRID_TITLE)
      .should('have.length', length);
  });
  cy.get(allProds.selectors.PAGINATOR_RANGE)
    .scrollIntoView()
    .invoke('text')
    .then((text) => {
      expect(text).contains(`${length}`);
    });
};

export const handlesTheProductPopUp = (product: string) => {
  cy.getText(allProds.selectors.ITEM_NAME, product).click({ force: true });
  cy.get('body').then((body) => {
    if (body.find(allProds.selectors.DIALOG_CONTAINER).length > 0) {
      cy.get(allProds.selectors.DIALOG_CONTAINER).should('be.visible');
    } else {
      cy.get(allProds.selectors.DIALOG_CONTAINER).should('not.exist');
    }
  });
  cy.wait(2000);
  cy.get(allProds.selectors.PANEL_TITLE)
    .invoke('text')
    .then((text) => {
      /* Regex to capture the number inside parentheses */
      const regex = /\((\d+)\)/;
      const match = text.match(regex);
      if (match) {
        const numberInsideParentheses = parseInt(match[1], 10);
        /* Assert that the number is greater than 0 */
        expect(numberInsideParentheses).to.be.greaterThan(0);
        cy.getText(allProds.selectors.PANEL_TITLE, text).click({
          force: true,
        });
      } else {
        throw new Error('No number found inside parentheses.');
      }
    });
  cy.get(allProds.selectors.DIALOG_ACTIONS)
    .scrollIntoView()
    .getText('button', ' close ')
    .click({ force: true });
};

export const addToCart = (product: string) => {
  cy.getText(allProds.selectors.ITEM_NAME, product)
    .parents(allProds.selectors.GRID_TITLE)
    .within(() => {
      cy.getText('span', allProds.strings.ADD_TO_BASKET).click({ force: true });
    });
  cy.getText('span', `Placed${product}into basket.`);
};

export const addItemsToTheCart = () => {
  allProds.getInitialCountOfItemsInTheCart();
  cy.wait(500);
  addToCart(allProds.strings.APPLE_JUICE);
  cy.wait(500);
  addToCart(allProds.strings.APPLE_POMACE);
  cy.wait(500);
  addToCart(allProds.strings.BANANA_JUICE);
  cy.wait(500);
  addToCart(allProds.strings.JUICE_SHOP_TICKET);
  cy.wait(500);
  addToCart(allProds.strings.CARROT_JUICE);
  cy.wait(500);
};

export const countTheNoOfItemsInCart = (expectedNumberOfItems: string) => {
  cy.wait(500);
  cy.get(allProds.selectors.SHOPPING_CART)
    .scrollIntoView()
    .find(allProds.selectors.COUNTER)
    .invoke('text')
    .then((text) => {
      cy.wait(1000);
      expect(text).to.be.equal(expectedNumberOfItems);
    });
};
