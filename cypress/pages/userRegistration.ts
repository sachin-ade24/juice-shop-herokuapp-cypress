import '../support/command';

export class userRegistrion {
  get selectors() {
    return {
      SECURITY_QUE_LABEL:
        '[aria-label="Selection list for the security question"]',
      SLIDE_TOGGLE: '.mat-slide-toggle-bar',
    };
  }
  get strings() {
    return {
      EMAIL_ERROR: 'Please provide an email address.',
      USER_REG: 'User Registration',
      PASSWORD_ERROR: 'Please provide a password. ',
      REPEAT_PASSWORD_ERROR: ' Please repeat your password. ',
      SECURITY_QUE: ' Please select a security question. ',
      ANSWER_ERROR: ' Please provide an answer to your security question. ',
      REGISTRATION_SUCCESSFUL:
        'Registration completed successfully. You can now log in.',
    };
  }

  getElement(elementId: String) {
    return cy.get(`#${elementId}Control`).scrollIntoView().should('be.visible');
  }

  getPasswordAdvice(adviceText: string) {
    cy.getText('span', adviceText);
  }

  getToggleButton() {
    return cy.get(userRegstrn.selectors.SLIDE_TOGGLE).scrollIntoView();
  }

  getDropdown() {
    return cy.get(userRegstrn.selectors.SECURITY_QUE_LABEL);
  }
}

export const userRegstrn = new userRegistrion();

export enum userReg {
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword',
  ANSWER_CONTROL = 'securityAnswer',
  REGISTER_BUTTON = '#registerButton',
}

export const errorMsgVerification = (
  fieldName: string,
  errorMessage: string
) => {
  cy.contains('mat-error', errorMessage).should('not.exist');
  cy.wait(500);
  userRegstrn.getElement(fieldName).click({ force: true });
  cy.wait(500);
  cy.getText('h1', userRegstrn.strings.USER_REG).click({ force: true });
  cy.wait(500);
  cy.getText('mat-error', errorMessage);
};

export const errorMsgVerificationForAllFields = () => {
  userRegstrn.getDropdown().click({ force: true });
  errorMsgVerification(userReg.EMAIL, userRegstrn.strings.EMAIL_ERROR);
  errorMsgVerification(userReg.PASSWORD, userRegstrn.strings.PASSWORD_ERROR);
  errorMsgVerification(
    userReg.REPEAT_PASSWORD,
    userRegstrn.strings.REPEAT_PASSWORD_ERROR
  );
  for (let i = 0; i <= 1; i++) {
    userRegstrn.getToggleButton().click({ force: true });
    cy.wait(500);
  }
  errorMsgVerification(
    userReg.ANSWER_CONTROL,
    userRegstrn.strings.ANSWER_ERROR
  );
  cy.getText('mat-error', userRegstrn.strings.SECURITY_QUE).should(
    'be.visible'
  );
};

export const verifyPasswordAdvice = (text: string) => {
  userRegstrn.getPasswordAdvice(`contains at least ${text}`);
};

export const completeThePasswordAdviceVerification = () => {
  verifyPasswordAdvice('one lower character');
  verifyPasswordAdvice('one upper character');
  verifyPasswordAdvice('one digit');
  verifyPasswordAdvice('one special character');
  verifyPasswordAdvice('8 characters');
};

export const addDataToTextboxField = (selector: string, text: string) => {
  userRegstrn
    .getElement(selector)
    .type(`${Cypress.env(text)}`, { force: true });
};

export const completesTheRegistrarionProcess = () => {
  addDataToTextboxField(userReg.EMAIL, 'email');
  addDataToTextboxField(userReg.PASSWORD, 'password');
  addDataToTextboxField(userReg.REPEAT_PASSWORD, 'password');
  userRegstrn
    .getDropdown()
    .click({ force: true })
    .type('{enter}', { force: true });
  userRegstrn.getElement(userReg.ANSWER_CONTROL).type('Jema', { force: true });
  cy.getText(userReg.REGISTER_BUTTON, ' Register ').click({ force: true });
  cy.getText('span', userRegstrn.strings.REGISTRATION_SUCCESSFUL);
  cy.wait(500);
};
