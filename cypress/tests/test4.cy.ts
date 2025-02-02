import { checkoutAndAddAddress } from '../pages/addNewAddress';
import {
  addItemsToTheCart,
  allProds,
  countTheNoOfItemsInCart,
} from '../pages/allProducts';
import { chooseDeliverySpeed } from '../pages/chooseDeliverySpeed';
import { completeTheLogInProcess } from '../pages/logIn';
import {
  handleCreditCardFields,
  verifyWalletBalance,
} from '../pages/myPaymentOptions';
import { placeTheOrder } from '../pages/orderSummary';
import { selectAddressAndContinue } from '../pages/selectAddress';
import { verifyTheThankYouMsg } from '../pages/thankYouForPurchase';
import { addAndDeleteItem } from '../pages/yourBasket';

describe('Test 4: Automation Script', () => {
  it('does login', () => {
    cy.visit(`${Cypress.env('baseUrl')}/#/login`);
    completeTheLogInProcess();
  });

  it('adds items to cart', () => {
    addItemsToTheCart();
    countTheNoOfItemsInCart('5');
  });

  it('adds and deletes items', () => {
    addAndDeleteItem(allProds.strings.APPLE_JUICE);
  });

  it('checkouts and adds the address', () => {
    checkoutAndAddAddress();
    selectAddressAndContinue();
  });

  it('selects the delivery address and verifies wallet balance', () => {
    chooseDeliverySpeed();
    verifyWalletBalance();
  });

  it('adds the credit card', () => {
    handleCreditCardFields();
  });

  it('places the order', () => {
    placeTheOrder();
    verifyTheThankYouMsg();
  });
});
