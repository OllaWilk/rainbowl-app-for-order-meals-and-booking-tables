import { select, templates, classNames } from '../settings.js';
import { utils } from '../utils.js';
import AmountWidget from './AmountWidget.js';
import Slider from './Slider.js';

class Product {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.renderInMenu();
    this.getElements();
    this.toggleAcordion();
    this.initOrderForm();
    this.initAmountWidget();
    this.processOrder();
    this.useSlider();
  }

  renderInMenu() {
    const thisProduct = this;
    /* generate HTML with handlebars */
    const generatedHTML = templates.menuProduct(thisProduct.data);
    /* conwert HTML text into HTML element */
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);

    /* find menu container */
    const menuContainer = document.querySelector(select.containerOf.menu);
    /* add element to menu */
    menuContainer.appendChild(this.element);
  }

  getElements() {
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(
      select.menuProduct.clickable
    );

    thisProduct.form = thisProduct.element.querySelector(
      select.menuProduct.form
    );

    thisProduct.formInputs = thisProduct.element.querySelectorAll(
      select.all.formInputs
    );

    thisProduct.cartButton = thisProduct.element.querySelector(
      select.menuProduct.cartButton
    );

    thisProduct.priceElem = thisProduct.element.querySelector(
      select.menuProduct.priceElem
    );

    thisProduct.imageWrapper = thisProduct.element.querySelector(
      select.menuProduct.imageWrapper
    );

    thisProduct.amountWidgetElem = thisProduct.element.querySelector(
      select.menuProduct.amountWidget
    );

    thisProduct.arrowSlider = thisProduct.element.querySelectorAll(
      select.menuProduct.arrowsSlider
    );
    thisProduct.sliderContent =
      thisProduct.element.querySelector('.slider-content ');
  }

  toggleAcordion() {
    const thisProduct = this;
    /* get clickable element */
    const openMenuCart = thisProduct.accordionTrigger;
    /* add event listener to open Menu cart */
    openMenuCart.addEventListener('click', function (e) {
      e.preventDefault();
      /* add class active to clicked element */
      thisProduct.element.classList.toggle('active');
      /* find all active products */
      const allActiveProducts = document.querySelectorAll(
        select.all.menuProductsActive
      );
      /* check if the active product isn't the element of thisProduct  */
      allActiveProducts.forEach((activeProduct) => {
        if (activeProduct !== thisProduct.element) {
          activeProduct.classList.remove('active');
        }
      });
    });
  }

  useSlider() {
    const thisProduct = this;

    if (thisProduct.arrowSlider.length > 0) {
      thisProduct.slider -= new Slider(
        thisProduct.arrowSlider,
        thisProduct.sliderContent
      );
    }
  }

  initOrderForm() {
    const thisProduct = this;
    /* add eventListeners to form */
    thisProduct.form.addEventListener('submit', function (e) {
      e.preventDefault();
      thisProduct.processOrder();
    });

    /* add eventListeners to form inputs */
    thisProduct.formInputs.forEach((input) => {
      input.addEventListener('change', function () {
        thisProduct.processOrder();
      });
    });

    /* add eventListeners to form button*/
    thisProduct.cartButton.addEventListener('click', function (e) {
      e.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }

  processOrder() {
    const thisProduct = this;

    /* read all data from the form */
    const formData = utils.serializeFormToObject(thisProduct.form);

    thisProduct.params = {};

    /* set variable price to equal thisProduct.data.price */
    let price = thisProduct.data.price;

    /* LOOP: for each paramId in thisproduct.data.params*/
    for (let paramsId in thisProduct.data.params) {
      /* save the element in thisProduct.data.params with key paramId as const param*/
      const param = thisProduct.data.params[paramsId];

      /* LOOP: for each optionId in param.options*/
      for (let optionsId in param.options) {
        /* save the element in param.options with key optionId as const option */
        const option = param.options[optionsId];

        /* IF: if option is selected and option is not default show img and send product to cart
          ELSE IF: if option is not selected and option is default remove img */

        const optionSelected =
          formData.hasOwnProperty(paramsId) &&
          formData[paramsId].indexOf(optionsId) > -1;

        if (optionSelected && !option.default) {
          price += option.price;
          /* add price of option to variabe price */
        } else if (!optionSelected && option.default) {
          /* deduct price of option from price */
          price -= option.price;
        }

        const img = thisProduct.imageWrapper.querySelector(
          `.${paramsId}-${optionsId}`
        );

        if (optionSelected && img) {
          /* Send  product param to cart */
          if (!thisProduct.params[paramsId]) {
            thisProduct.params[paramsId] = {
              label: param.label,
              options: {},
            };
          }
          thisProduct.params[paramsId].options[optionsId] = option.label;
          img.classList.add(classNames.menuProduct.imageVisible);
        } else if (optionSelected) {
          if (!thisProduct.params[paramsId]) {
            thisProduct.params[paramsId] = {
              label: param.label,
              options: {},
            };
          }
          thisProduct.params[paramsId].options[optionsId] = option.label;
        } else if (img) {
          /* Remove img if option is unselected */
          img.classList.remove(classNames.menuProduct.imageVisible);
        }
      }
    }
    /* multiply price by amount */
    /* single price */
    thisProduct.priceSingle = price;
    /* total price */
    thisProduct.price =
      thisProduct.priceSingle * thisProduct.amountWidget.value;

    /* set the contents of thisProduct.priceElem to be the value of variable price */
    thisProduct.priceElem.innerHTML = thisProduct.price;
  }

  initAmountWidget() {
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);

    /* add listener (updated) on amountWidgetElement  and call processOrder */
    thisProduct.amountWidgetElem.addEventListener('updated', () => {
      thisProduct.processOrder();
    });
  }

  addToCart() {
    const thisProduct = this;

    /* Simplify data access */
    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;

    // app.cart.add(thisProduct);

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct,
      },
    });

    thisProduct.element.dispatchEvent(event);
  }
}

export default Product;
