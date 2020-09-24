import { OrxeCheckbox } from '../index';
import '@testing-library/jest-dom';

describe('orxe-checkbox', () => {
  let checkbox;

  beforeEach(async function() {
    OrxeCheckbox;
    checkbox = (await document.body.appendChild(document.createElement('orxe-checkbox'))) as OrxeCheckbox;
  });

  afterEach(async function() {
    await checkbox.remove();
  });

  /**
   * Function that sets properties on the Custom Element.
   */
  async function setProperties(properties: object): Promise<void> {
    for (const property in properties) {
      if (checkbox.hasOwnProperty(property)) {
        checkbox[property] = properties[property];
      }
    }
    await checkbox.requestUpdate();
  }

  /**
   * Function that returns an element containing the testId data attribute.
   */
  function getByTestId(id: string): HTMLElement {    
    return checkbox.shadowRoot.querySelector(`[data-testid=${id}]`);
  }

  it('should check default value for properties for checkbox', () => {
    expect(checkbox.checkboxType).toEqual('checkbox');
    expect(checkbox.checkBoxItem.state).toEqual('active');
    expect(checkbox.checkBoxGroup.isRequired).toBeTruthy;
    expect(checkbox.errorMessage).toEqual('');
  });

  it('Should check checkbox is default single checkbox if no checkboxType is given', async () => {
    const checkboxConatiner = getByTestId('container');
    expect(checkboxConatiner).toHaveAttribute('checkboxType', 'checkbox');
  });

  it('Should set checkbox group card Type', async () => {
    await setProperties({ checkboxType: 'checkboxGroup' });
    const checkboxConatiner = getByTestId('container');
    expect(checkboxConatiner).toHaveAttribute('checkboxType', 'checkboxGroup');
  });
});
