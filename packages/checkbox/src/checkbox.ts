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
    labelId: 'label_1',
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
        labelId: 'label_2',
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
        labelId: 'label_3',
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
    <div data-testid="container" class="checkbox-parent-container">
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
      const event = new CustomEvent('checkBoxGroupEvent', {
        detail: {
          checkBoxGroup: this.checkBoxGroup
        },
        // bubbles: false
      });
      this.dispatchEvent(event);
    }
  }

  public getCheckbox() {
    let template;
    if (this.checkboxType === 'checkbox') {
      template = this.getTemplateForCheckBox(this.checkBoxItem, 0)
    } else if (this.checkboxType === 'checkboxGroup') {
      return this.checkBoxGroup.checkBoxItems.map((checkbox, i) => {
        return this.getTemplateForCheckBox(checkbox, i);
      });
    }
    return template;
  }

  public getTemplateForCheckBox(checkbox, index) {
    return html`
            <div class="checkbox-container">
            <div>
            <div class="main" @click="${(event) => { this.checkUncheckBox(event, checkbox) }}">
            <label class="checkbox-label-name" aria-label="${checkbox.label}" for="${checkbox.key}" id="${checkbox.labelId}">${checkbox.label}</label>
            <span class="checkbox" id="${checkbox.key}" tabindex="${index}" role="checkbox"
            @keypress="${(event) => { this.onKeyPress(event, checkbox) }}" aria-checked="${checkbox.isChecked}" aria-disabled=${checkbox.isDisabled} 
             aria-labelledby="${checkbox.labelId}">
            <span class="checked-mark"></span>
            </span>
            </div>
            </div>
            ${this.getMetaData(checkbox)}
            </div>`

    // <input data-testid="container" type="checkbox" id="${checkbox.key}" @change="${() => { this.checkUncheckBox(checkbox) }}" ?disabled=${checkbox.isDisabled} ?checked=${checkbox.isChecked}>
    //     <span for="${checkbox.key}" class="checkbox ${this.getClassByState(checkbox)} ${this.getClass()}"></span>
    //     <span class="checkbox-label-name">${checkbox.label}</span>
  }

  public onKeyPress(event, checkbox) {
    let isEnterOrSpace = event.keyCode === 32 || event.keyCode === 13;
    if (isEnterOrSpace) {
      this.checkUncheckBox(event, checkbox);
    }
  }

  public getClass() {
    return this.errorMessage ? 'error-message-border' : ''
  }

  public checkUncheckBox(event, checkbox) {
    if (!checkbox.isDisabled) {
      console.log(event.srcElement.ariaChecked);
      event.srcElement.classList.toggle('is-checked', !checkbox.isChecked);
      event.srcElement.setAttribute('aria-checked', !checkbox.isChecked);
    }
    if (this.checkboxType == 'checkboxGroup' && !checkbox.isDisabled) {
      this.checkBoxGroup.checkBoxItems.map(check => {
        if (checkbox.key === check.key) {
          check.isChecked = !check.isChecked;
          return check;
        }
      });
      this.checkErrorMessage();
    } else if (!checkbox.isDisabled) {
      checkbox.isChecked = !checkbox.isChecked;
      if (!checkbox.isChecked && checkbox.isRequired) {
        this.errorMessage = 'You will have to select the checkbox';
      } else {
        this.errorMessage = '';
      }
      const event = new CustomEvent('checkBoxItemEvent', {
        detail: {
          checkBoxItem: this.checkBoxItem
        },
        // bubbles: false
      });
      this.dispatchEvent(event);
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
