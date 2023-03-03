class BaseWidget {
  constructor(wrapperElement, initialValue) {
    const thisWidget = this;
    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue;
  }

  get value() {
    const thisWidget = this;

    return thisWidget.correctValue;
  }

  set value(value) {
    const thisWidget = this;

    /* conwert string into number */
    const newValue = thisWidget.parseValue(value);

    /* Add validation */
    if (
      thisWidget !== thisWidget.correctValue &&
      thisWidget.isValid(newValue)
    ) {
      /* assign the parsed value to newValue */
      thisWidget.correctValue = newValue;
      // /* call method announce */
      thisWidget.announce();
    }
    /* set new value of input */
    thisWidget.renderValue();
    // /* call method announce */
    // thisWidget.announce();
  }

  setValue(value) {
    const thisWidget = this;

    thisWidget.value = value;
  }

  parseValue(value) {
    return parseInt(value);
  }

  isValid(value) {
    return !isNaN(value);
  }

  renderValue() {
    const thisWidget = this;

    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true,
    });

    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default BaseWidget;
