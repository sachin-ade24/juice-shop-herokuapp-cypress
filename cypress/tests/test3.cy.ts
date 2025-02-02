import { completeTheLogInProcess } from '../pages/logIn';
import {
  completesTheRegistrarionProcess,
  completeThePasswordAdviceVerification,
  errorMsgVerificationForAllFields,
  userRegstrn,
} from '../pages/userRegistration';

describe('Task 3: Automation Script', () => {
  it(`navigates to the URL`, () => {
    cy.url().then((url) => {
      let registrationUrl = `${url}register`;
      cy.visit(registrationUrl);
    });
    cy.title().then((title) => {
      expect(title).to.be.equal('OWASP Juice Shop');
    });
  });

  it('verifies email error message', () => {
    errorMsgVerificationForAllFields();
  });

  it('completes the password advice verification', () => {
    userRegstrn.getToggleButton().click({ force: true });
    completeThePasswordAdviceVerification();
  });

  it('completes the user registration', () => {
    completesTheRegistrarionProcess();
  });

  it('completes login process', () => {
    cy.visit(`${Cypress.env('baseUrl')}/#/login`);
    completeTheLogInProcess();
  });
});
