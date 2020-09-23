import { OrxeCheckbox } from '../index';
import '@testing-library/jest-dom';

describe('orxe-checkbox', () => {
  let card;

  beforeEach(async function() {
    OrxeCheckbox;
    card = (await document.body.appendChild(document.createElement('orxe-checkbox'))) as OrxeCheckbox;
  });

  afterEach(async function() {
    await card.remove();
  });

  /**
   * Function that sets properties on the Custom Element.
   */
  async function setProperties(properties: object): Promise<void> {
    for (const property in properties) {
      if (card.hasOwnProperty(property)) {
        card[property] = properties[property];
      }
    }
    await card.requestUpdate();
  }

  /**
   * Function that returns an element containing the testId data attribute.
   */
  function getByTestId(id: string): HTMLElement {
    return card.shadowRoot.querySelector(`[data-testid=${id}]`);
  }

  it('should check default value for properties for card', () => {
    expect(card.cardType).toEqual('default-card');
    expect(card.closeIcon).toBeFalsy;
    expect(card.a11yCloseLabel).toEqual('');
  });

  it('Should check card is default card if no cardType is given', async () => {
    const cardConatiner = getByTestId('card-container');
    expect(cardConatiner).toHaveAttribute('card-type', 'default-card');
  });

  it('Should set floating card Type', async () => {
    await setProperties({ cardType: 'floating-card' });
    const cardConatiner = getByTestId('card-container');
    expect(cardConatiner).toHaveAttribute('card-type', 'floating-card');
  });

  it('Should show close icon', async () => {
    await setProperties({ cardType: 'floating-card', closeIcon: true });
    const closeIconContainer = getByTestId('close-icon');
    expect(closeIconContainer).toHaveClass('button__icon--close');
    expect(closeIconContainer).toHaveAttribute('a11y-label', 'Close The Card');

    await setProperties({ a11yCloseLabel: 'close' });
    // validate the value of a11y-close-label as given
    expect(closeIconContainer).toHaveAttribute('a11y-label', card.a11yCloseLabel);
  });

  it('Should show close the floating card when clicked on cross icon', async () => {
    await setProperties({ cardType: 'floating-card', closeIcon: true });
    const closeIconContainer = getByTestId('close-icon');
    await closeIconContainer.click();
    expect(document.querySelector(`orxe-checkbox`)).toBeFalsy();
  });
});
