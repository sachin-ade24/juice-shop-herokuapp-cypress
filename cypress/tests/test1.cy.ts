import {
  allProds,
  assertionForDisplayingAllItems,
  selectMaximumItems,
} from '../pages/allProducts';
import '../support/command';

describe('Task 1: Automation Script', () => {
  it('navigates to the URL and verifies the URL as well as title', () => {
    cy.url().then((url) => {
      expect(url).to.be.equal(`${allProds.strings.EXPECTED_URL}/#/`);
    });
    cy.title().then((title) => {
      expect(title).to.be.equal(allProds.strings.EXPECTED_TITLE);
    });
  });

  it('scrolls down to the end of the page', () => {
    cy.wait(2000);
    cy.get('body').then((body) => {
      if (body.find(allProds.selectors.DIALOG_CONTAINER).length > 0) {
        cy.contains('span', 'Dismiss').should('exist').click({ force: true });
      } else {
        cy.log('Element not found.');
        cy.contains('span', 'Dismiss').should('not.exist');
      }
    });
    cy.get(allProds.selectors.PAGINATOR).scrollIntoView();
  });

  it('changes items per page to the maximum number', () => {
    selectMaximumItems();
  });

  it('asserts that  home page displays all of items', () => {
    assertionForDisplayingAllItems();
  });
});
