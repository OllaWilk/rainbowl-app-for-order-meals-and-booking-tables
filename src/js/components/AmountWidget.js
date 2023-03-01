import { settings, select } from '../settings.js';

class AmountWidget {
  constructor(element) {
    const thisWidget = this;

    thisWidget.element = element;

    thisWidget.getElements(element);
    thisWidget.value = settings.amountWidget.defaultValue;
    thisWidget.setValue(thisWidget.input.value);
    thisWidget.initActions();
  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(
      select.widgets.amount.input
    );
    thisWidget.linkDecrease = thisWidget.element.querySelector(
      select.widgets.amount.linkDecrease
    );
    thisWidget.linkIncrease = thisWidget.element.querySelector(
      select.widgets.amount.linkIncrease
    );
  }

  setValue(value) {
    const thisWigdet = this;

    /* conwert string into number */
    const newValue = parseInt(value);

    /* Add validation */
    if (
      thisWigdet.value !== newValue &&
      newValue >= settings.amountWidget.defaultMin &&
      newValue <= settings.amountWidget.defaultMax
    ) {
      /* assign the parsed value to newValue */
      thisWigdet.value = newValue;
    }
    /* set new value of input */
    thisWigdet.input.value = thisWigdet.value;

    /* call method announce */
    thisWigdet.announce();
  }

  initActions() {
    const thisWidget = this;

    /* add event listener on change on input and get value of input */
    thisWidget.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.input.value);
    });

    /* add event listener on buttons and odd/add 1 after click */
    thisWidget.linkDecrease.addEventListener('click', function (e) {
      e.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.linkIncrease.addEventListener('click', function (e) {
      e.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true,
    });

    thisWidget.element.dispatchEvent(event);
  }
}

export default AmountWidget;
