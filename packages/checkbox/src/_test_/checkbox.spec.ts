import { OrxeCheckbox } from '../index';
import '@testing-library/jest-dom';

describe('orxe-checkbox', () => {
  let checkbox;
  let checkBoxComponent: OrxeCheckbox;
  beforeEach(async function () {
    OrxeCheckbox;
    checkbox = (await document.body.appendChild(document.createElement('orxe-checkbox'))) as OrxeCheckbox;
  });

  afterEach(async function () {
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
    return checkbox.shadowRoot.querySelector(`[class=${id}]`);
  }

  it('should check default value for properties for checkbox', () => {
    expect(checkbox.checkboxType).toEqual('checkbox');
    expect(checkbox.checkBoxItem.state).toEqual('active');
    expect(checkbox.checkBoxGroup.isRequired).toBeTruthy;
    expect(checkbox.errorMessage).toEqual('');
  });

  it('Should check class of the the checkbox item according to the state', async () => {
    checkbox.getClass();
    expect(checkbox.errorMessage).toEqual('');
  });

  it('Should check error message not to be pop up', async () => {
    const checkBoxItem = {
      label: 'Checkbox Name',
      isChecked: true,
      isDisabled: false,
      state: 'active',
      isRequired: false,
      key: 'key_2',
      metaData: {

      }
    };
    checkbox.checkUncheckBox(checkBoxItem);
    expect(checkbox.errorMessage).toEqual('');
  });

  it('Should check error message to be pop up', async () => {
    const checkBoxItem = {
      label: 'Checkbox Name',
      isChecked: true,
      isDisabled: false,
      state: 'active',
      isRequired: true,
      key: 'key_2',
      metaData: {

      }
    };
    checkbox.checkUncheckBox(checkBoxItem);
    expect(checkbox.errorMessage).toEqual('You will have to select the checkbox');
  });

  it('Should check error message not to be pop up', async () => {
    const properties = {
      checkboxType: 'checkboxGroup',
      checkBoxGroup: {
        isRequired: true,
        checkBoxItems: [
          {
            label: 'Checkbox Name',
            isChecked: false,
            isDisabled: false,
            state: 'error',
            key: 'key_1',
            metaData: {
              value: 550
            },
          },
          {
            label: 'Checkbox Name',
            isChecked: false,
            isDisabled: false,
            state: 'error',
            key: 'key_2',
            metaData: {
              value: 550
            },
          }
        ]
      }
    }
    setProperties(properties);
    const checkBoxItem = {
      label: 'Checkbox Name',
      isChecked: false,
      isDisabled: false,
      state: 'active',
      isRequired: true,
      key: 'key_1',
      metaData: {

      }
    };
    checkbox.checkUncheckBox(checkBoxItem);
    expect(checkbox.errorMessage).toEqual('');
  });

  it('Should check error message to be pop up', async () => {
    const properties = {
      checkboxType: 'checkboxGroup',
      checkBoxGroup: {
        isRequired: true,
        checkBoxItems: [
          {
            label: 'Checkbox Name',
            isChecked: true,
            isDisabled: false,
            state: 'error',
            key: 'key_1',
            metaData: {
              value: 550
            },
          },
          {
            label: 'Checkbox Name',
            isChecked: false,
            isDisabled: false,
            state: 'error',
            key: 'key_2',
            metaData: {
              value: 550
            },
          }
        ]
      }
    }
    setProperties(properties);
    const checkBoxItem = {
      label: 'Checkbox Name',
      isChecked: true,
      isDisabled: false,
      state: 'active',
      key: 'key_1',
      metaData: {

      }
    };
    checkbox.checkUncheckBox(checkBoxItem);
    expect(checkbox.errorMessage).toEqual('Please check one of the checkbox');
  });
});
