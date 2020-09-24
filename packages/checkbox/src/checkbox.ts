/**
 * @packageDocumentation
 * @module Card
 */

import { html, customElement, property } from 'lit-element';
import styles from './checkbox-css';
import { TranslationClass } from '@orxe-culture/lit';
import '@orxe-components/button';

/**
 * @noInheritDoc
 */
@customElement('orxe-checkbox')
export default class OrxeCheckbox extends TranslationClass {
  @property({ type: String, reflect: true })
  checkboxType = 'checkbox';

  @property({ type: Object, reflect: true })
  checkBoxItem = {
    label: 'Checkbox Name',
    isChecked: true,
    isDisabled: false,
    state: 'active',
    isRequired: false,
    key: 'key_2',
    metaData: {

    }
  };

  @property({ type: Object, reflect: true })
  checkBoxGroup = {
    isRequired: true,
    checkBoxItems: [
      {
        label: 'Checkbox Name',
        isChecked: false,
        isDisabled: false,
        state: 'error',
        key: 'key_3',
        metaData: {
          value: 550
        },
      },
      {
        label: 'Checkbox Name',
        isChecked: false,
        isDisabled: false,
        state: 'error',
        key: 'key_4',
        metaData: {
          value: 550
        },
      }
    ]
  }

  @property({ type: String })
  errorMessage = '';

  constructor() {
    super();
  }

  render() {
    return html`
    <div class="checkbox-parent-container">
          ${this.getCheckbox()}
          <div class="error-message">${this.errorMessage}</div>
    </div>
    `;
  }

  public checkErrorMessage() {
    if (this.checkboxType == 'checkboxGroup' && this.checkBoxGroup.isRequired) {
      let checkedCheckBox = this.checkBoxGroup.checkBoxItems.find(check => {
        return check.isChecked;
      });
      if (checkedCheckBox) {
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Please check one of the checkbox';
      }
    }
  }

  public getCheckbox() {
    let template;
    if (this.checkboxType === 'checkbox') {
      template = this.getTemplateForCheckBox(this.checkBoxItem)
    } else if (this.checkboxType === 'checkboxGroup') {
      return this.checkBoxGroup.checkBoxItems.map(checkbox => {
        return this.getTemplateForCheckBox(checkbox);
      });
    }
    return template;
  }

  public getTemplateForCheckBox(checkbox) {
    return html`
            <div class="checkbox-container">
            <div>
            <label class="main">
                <input type="checkbox" id="${checkbox.key}" @change="${() => { this.checkUncheckBox(checkbox) }}" ?disabled=${checkbox.isDisabled} ?checked=${checkbox.isChecked}>
                <span for="${checkbox.key}" class="checkbox ${this.getClassByState(checkbox)} ${this.getClass()}"></span>
                <span class="checkbox-label-name">${checkbox.label}</span>
            </label>
            </div>
            ${this.getMetaData(checkbox)}
            </div>`
  }

  public getClass() {
    return this.errorMessage ? 'error-message-border' : ''
  }

  public checkUncheckBox(checkbox) {
    if (this.checkboxType == 'checkboxGroup') {
      this.checkBoxGroup.checkBoxItems.map(check => {
        if (checkbox.key === check.key) {
          check.isChecked = !check.isChecked;
          return check;
        }
      });
      this.checkErrorMessage();
    } else {
      this.checkBoxItem.isChecked = !this.checkBoxItem.isChecked;
      if (!this.checkBoxItem.isChecked && this.checkBoxItem.isRequired) { 
        this.errorMessage = 'You will have to select the checkbox';
      }else{
        this.errorMessage ='';
      }
    }
  }


  /**
   * getStateOfCheckBox: Get checkbox according to state of checkbox
   */
  public getClassByState(checkbox) {
    return checkbox && checkbox.state == 'active' ? 'active' : 'disabled';
  }

  public getMetaData(checkbox) {
    if (checkbox && checkbox.metaData && checkbox.metaData.value) {
      return html`<div for="checkbox-id" class="metadata-value">${checkbox.metaData.value}</div>`
    } else {
      return html`<div for="checkbox-id"></div>`
    }
  };

  static styles = styles;
}
