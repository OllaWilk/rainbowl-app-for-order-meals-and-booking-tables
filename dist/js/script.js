/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    handlebasTemplate: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
    },
    menuProduct: {
      clickable: '.product__customize',
      form: '.product__order',
      cartButton: '[href="#add-to-cart"]',
      priceElem: '.product__base-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amout',
    },
    all: {
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultMin: 0,
      defaultMax: 10,
      defaultValue: 1,
    },
  };

  const templates = {
    menuProduct: Handlebars.compile(
      document.querySelector(select.handlebasTemplate.menuProduct).innerHTML
    ),
  };

  class Product {
    constructor(product, data) {
      this.product = product;
      this.data = data;
      this.renderInMenu();
      this.getElements();
      this.toggleAcordion();
      this.initOrderForm();
      this.initAmountWidget();
      this.processOrder();
    }

    renderInMenu() {
      /* generate HTML with handlebars */
      const generatedHTML = templates.menuProduct(this.data);
      /* conwert HTML text into HTML element */

      const createDOMfromHTML = function (stringHTML) {
        let div = document.createElement('div');
        div.innerHTML = stringHTML.trim();
        return div.firstChild;
      };

      this.element = createDOMfromHTML(generatedHTML);
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
      });
    }

    processOrder() {
      const thisProduct = this;

      /* read all data from the form */
      const formData = utils.serializeFormToObject(thisProduct.form);

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

          /* IF: if option is selected and option is not default
          ELSE IF: if option is not selected and option is default*/

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
            img.classList.add(classNames.menuProduct.imageVisible);
          } else if (img) {
            img.classList.remove(classNames.menuProduct.imageVisible);
          }
        }
      }
      /* multiply price by amount */
      price *= thisProduct.amountWidget.value;

      /* set the contents of thisProduct.priceElem to be the value of variable price */
      thisProduct.priceElem.innerHTML = price;
    }

    initAmountWidget() {
      const thisProduct = this;

      thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);

      /* add listener (updated) on amountWidgetElement  and call processOrder */
      thisProduct.amountWidgetElem.addEventListener('updated', () => {
        thisProduct.processOrder();
      });
    }
  }

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

      const event = new Event('updated');

      thisWidget.element.dispatchEvent(event);
    }
  }

  const app = {
    initMenu: function () {
      /* init new Product */
      for (let product in this.data.products) {
        new Product(product, this.data.products[product]);
      }
    },
    getData: function () {
      // eslint-disable-next-line no-undef
      this.data = dataSource;
    },
    init: function () {
      console.log('***START APP***');
      this.getData();
      this.initMenu();
    },
  };

  app.init();
}
