import { allProds, handlesTheProductPopUp } from '../pages/allProducts';

describe('Test 2: Automation Script', () => {
  it(`handles the product: '${allProds.strings.APPLE_JUICE}' popup`, () => {
    handlesTheProductPopUp(allProds.strings.APPLE_JUICE);
  });
});
