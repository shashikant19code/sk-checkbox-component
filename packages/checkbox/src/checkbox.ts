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
         key: 'key_2',
         metaData: {

         }
    };

    @property({ type: Object, reflect: true })
    checkBoxItems = [        
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
      ];

  /**
   *
   * @memberof OrxeCheckbox
   * This property will set the aria-label for close icon
   */
  @property({ type: String, reflect: true, attribute: 'a11y-close-label' })
  a11yCloseLabel = '';

  constructor() {
    super();
  }

  render() {
    return html`
    <div class="checkbox-parent-container">
          ${this.getCheckbox()}
    </div>
    `;
  }

  public getCheckbox() {
    let template;
    if (this.checkboxType === 'checkbox') {
        console.log('this.checkBoxItem: ', this.checkBoxItem);
      template = this.getTemplateForCheckBox(this.checkBoxItem)
    } else if (this.checkboxType === 'checkboxGroup') {
      return this.checkBoxItems.map(checkbox => {
         return this.getTemplateForCheckBox(checkbox);
      });
    }
    return template;
  }

  public getTemplateForCheckBox(checkbox) {
    return html`
            <div class="checkbox-container">
            <div>
            <label class="main"><input type="checkbox" id="${checkbox.key}" ?disabled=${checkbox.isDisabled} ?checked=${checkbox.isChecked}><span for="${checkbox.key}" class="checkbox"></span><span class=
            "checkbox-label-name">${checkbox.label}</span></label>
            </div>
            ${this.getMetaData(checkbox)}
            </div>`
  }


  /**
   * getStateOfCheckBox: Get checkbox according to state of checkbox
   */
  public getStateOfCheckBox(checkbox) {
    return checkbox && checkbox.state == 'active' ? '1.2px solid #0A57A1' : '1.2px solid red';
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
