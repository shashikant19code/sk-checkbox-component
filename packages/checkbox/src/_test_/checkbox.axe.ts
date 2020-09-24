import { OrxeCheckbox } from '../index';
import { axe, toHaveNoViolations } from '@orxe-devkit/axe';

expect.extend(toHaveNoViolations);

describe('orxe-checkbox-axe', () => {
  let checkbox;

  beforeEach(function() {
    OrxeCheckbox;
    document.body.appendChild(document.createElement('orxe-checkbox'));
    checkbox = document.querySelector('orxe-checkbox') as OrxeCheckbox;
  });

  afterEach(function() {
    checkbox.remove();
  });

  it('should support all WCAG Accessibility Rules. when component is rendered', async () => {
    // pass the HTML element into the axe function.
    const results = await axe(checkbox);
    expect(results).toHaveNoViolations();
  });
});
