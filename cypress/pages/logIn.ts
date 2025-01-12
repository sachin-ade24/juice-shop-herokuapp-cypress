import '../support/command';
import { allProds } from './allProducts';
import { userReg } from './userRegistration';

/*Note: The relevant selectors and strings for this page, have been stored 
    in 'allProducts.ts', since they are few in number.*/

export class userLogIn {
  getTextboxById(idValue: string) {
    return cy.get(`#${idValue}`).scrollIntoView().should('be.visible');
  }
}

export const logIn = new userLogIn();

export enum loginEnum {
  LOGIN_BUTTON = 'loginButton',
}

export const completeTheLogInProcess = () => {
  logIn.getTextboxById(userReg.EMAIL).type(`${Cypress.env('email')}`);
  logIn.getTextboxById(userReg.PASSWORD).type(`${Cypress.env('password')}`);
  cy.getText(`#${loginEnum.LOGIN_BUTTON}`, allProds.strings.LOG_IN).click({
    force: true,
  });
};
