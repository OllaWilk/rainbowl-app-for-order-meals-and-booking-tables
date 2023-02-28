/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    handlebasTemplate: {
      menuProduct: '#template-menu-product',
      cartProduct: '#template-cart-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    menuProduct: {
      clickable: '.product__customize',
      form: '.product__order',
      cartButton: '[href="#add-to-cart"]',
      priceElem: '.product__base-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
    },
    all: {
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
      errorinfo: '.alert-info',
    },
    widgets: {
      amount: {
        input: 'input.amount-inpun',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
    cart: {
      toggleTrigger: '.cart__summary',
      productList: '.cart__order-summary',
      totalNumber: '.cart__total-number',
      totalPrice:
        '.cart__total-price strong, .cart__order-total .cart__order-price-sum',
      subtotalPrice: '.cart__order-subtotal .cart__order-price-sum',
      deliveryFee: '.cart__order-delivery .cart__order-price-sum ',
      form: '.cart__order',
      formSubmit: '.cart__order [type="submit"]',
      phone: '[name="phone"]',
      address: '[name="address"]',
    },
    cartProduct: {
      amountWidget: '.widget-amount',
      price: '.cart__product-price',
      edit: '[href="#edit"]',
      remove: '[href="#remove"]',
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
    cart: {
      wrapperActive: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultMin: 1,
      defaultMax: 10,
      defaultValue: 1,
    },
    cart: {
      deliveryFee: 15,
    },
    db: {
      url: '//localhost:3131',
      product: 'product',
      order: 'order',
    },
  };

  const templates = {
    menuProduct: Handlebars.compile(
      document.querySelector(select.handlebasTemplate.menuProduct).innerHTML
    ),
    cartProduct: Handlebars.compile(
      document.querySelector(select.handlebasTemplate.cartProduct).innerHTML
    ),
  };

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

      app.cart.add(thisProduct);
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

      const event = new CustomEvent('updated', {
        bubbles: true,
      });

      thisWidget.element.dispatchEvent(event);
    }
  }

  class Cart {
    constructor(element) {
      const thisCart = this;

      thisCart.products = [];
      thisCart.deliveryFee = settings.cart.deliveryFee;

      thisCart.getElements(element);
      thisCart.initActions();
    }

    getElements(element) {
      const thisCart = this;

      thisCart.dom = {};
      thisCart.dom.wrapper = element;

      thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(
        select.cart.toggleTrigger
      );
      thisCart.dom.productList = thisCart.dom.wrapper.querySelector(
        select.cart.productList
      );
      thisCart.renderTotalsKeys = [
        'totalNumber',
        'totalPrice',
        'subtotalPrice',
        'deliveryFee',
      ];

      for (let key of thisCart.renderTotalsKeys) {
        thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(
          select.cart[key]
        );
      }

      thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
      thisCart.dom.phone = thisCart.dom.wrapper.querySelector(
        select.cart.phone
      );
      thisCart.dom.address = thisCart.dom.wrapper.querySelector(
        select.cart.address
      );
      thisCart.dom.error = thisCart.dom.wrapper.querySelector(
        select.all.errorinfo
      );
    }

    initActions() {
      const thisCart = this;

      thisCart.dom.toggleTrigger.addEventListener('click', function () {
        thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
      });

      thisCart.dom.productList.addEventListener('updated', function () {
        thisCart.update();
      });
      thisCart.dom.productList.addEventListener('remove', function (event) {
        thisCart.remove(event.detail.cartProduct);
      });
      thisCart.dom.form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!thisCart.products.length) {
          thisCart.dom.error.innerHTML = 'Add product to cart ';
        } else if (!thisCart.dom.address.value || !thisCart.dom.phone.value) {
          thisCart.dom.error.innerHTML = 'Fill empty imputs ';
        } else {
          thisCart.dom.error.innerHTML = '';

          thisCart.sendOrder();

          thisCart.products.length = 0;
          thisCart.dom.productList.innerHTML = 'Thank You. Order send';
          thisCart.dom.address.value = '';
          thisCart.dom.phone.value = '';

          for (let key of thisCart.renderTotalsKeys) {
            for (let elem of thisCart.dom[key]) {
              elem.innerHTML = 0;
            }
          }
        }
      });
    }

    sendOrder() {
      const thisCart = this;

      const url = settings.db.url + '/' + settings.db.order;

      const payload = {
        phone: thisCart.dom.phone.value,
        address: thisCart.dom.address.value,
        totalPrice: thisCart.totalPrice,
        totalNumber: thisCart.totalNumber,
        subtotalPrice: thisCart.subtotalPrice,
        deliveryfee: thisCart.deliveryFee,
        products: [],
      };

      for (let product of thisCart.products) {
        payload.products.push(product.getData());
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };

      fetch(url, options)
        .then(function (response) {
          return response.json();
        })
        .then(function (parsedResponse) {
          console.log('parsedResponse', parsedResponse);
        });
    }

    add(menuProduct) {
      const thisCart = this;

      /* generate html code */
      const generatedHTML = templates.cartProduct(menuProduct);

      /* convert generatedHTML to DOM elements */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      /* add element to cart */
      thisCart.dom.productList.appendChild(generatedDOM);

      thisCart.products.push(new CartProduct(menuProduct, generatedDOM));

      thisCart.update();

      console.log(
        '#$% CHECK! SEPARATE PRODUCTS ARE SAVED IN THE ARRAY',
        thisCart.products
      );

      thisCart.dom.error.innerHTML = '';
    }

    update() {
      const thisCart = this;

      thisCart.totalNumber = 0;
      thisCart.subtotalPrice = 0;

      for (let product of thisCart.products) {
        thisCart.subtotalPrice = thisCart.subtotalPrice + product.price;
        thisCart.totalNumber = thisCart.totalNumber + product.amount;
      }

      if (!thisCart.totalNumber) {
        thisCart.totalPrice = 0;
      } else {
        thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;
      }

      for (let key of thisCart.renderTotalsKeys) {
        for (let elem of thisCart.dom[key]) {
          if (key === 'totalNumber') {
            elem.innerHTML = `${thisCart[key]} `;
          } else {
            elem.innerHTML = `$${thisCart[key]} `;
          }
        }
      }
    }

    remove(cartProduct) {
      const thisCart = this;

      const index = thisCart.products.indexOf(cartProduct);

      thisCart.products.splice(index, 1);

      cartProduct.dom.wrapper.remove();

      thisCart.update();
    }
  }

  class CartProduct {
    constructor(menuProduct, element) {
      const thisCartProduct = this;

      thisCartProduct.id = menuProduct.id;
      thisCartProduct.name = menuProduct.name;
      thisCartProduct.price = menuProduct.price;
      thisCartProduct.priceSingle = menuProduct.priceSingle;
      thisCartProduct.amount = menuProduct.amount;
      thisCartProduct.params = JSON.parse(JSON.stringify(menuProduct.params));

      thisCartProduct.getElements(element);
      thisCartProduct.initAmountWidget();
      thisCartProduct.initActions();
    }

    getElements(element) {
      const thisCartProduct = this;

      thisCartProduct.dom = {};

      thisCartProduct.dom.wrapper = element;

      thisCartProduct.dom.amountWidget =
        thisCartProduct.dom.wrapper.querySelector(
          select.cartProduct.amountWidget
        );
      thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(
        select.cartProduct.price
      );
      thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(
        select.cartProduct.edit
      );
      thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(
        select.cartProduct.remove
      );
    }

    initAmountWidget() {
      const thisCartProduct = this;

      /* Init amount widget in each product in cart */

      thisCartProduct.amountWidget = new AmountWidget(
        thisCartProduct.dom.amountWidget
      );

      thisCartProduct.dom.amountWidget.addEventListener('updated', () => {
        thisCartProduct.amount = thisCartProduct.amountWidget.value;

        thisCartProduct.price =
          thisCartProduct.priceSingle * thisCartProduct.amount;

        thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
      });
    }

    remove() {
      const thisCartProduct = this;

      const event = new CustomEvent('remove', {
        bubbles: true,
        detail: {
          cartProduct: thisCartProduct,
        },
      });

      thisCartProduct.dom.wrapper.dispatchEvent(event);
    }

    initActions() {
      const thisCartProduct = this;

      thisCartProduct.dom.edit.addEventListener('click', function (e) {
        e.preventDefault();
      });

      thisCartProduct.dom.remove.addEventListener('click', function (e) {
        e.preventDefault();
        thisCartProduct.remove();
      });
    }

    getData() {
      const thisCartProduct = this;

      const productAddedData = {
        productInfo: {
          id: thisCartProduct.id,
          amount: thisCartProduct.amount,
          price: thisCartProduct.price,
          priceSingle: thisCartProduct.priceSingle,
          params: thisCartProduct.params,
        },
      };

      return productAddedData;
    }
  }

  const app = {
    initMenu: function () {
      const thisApp = this;

      /* init new Product */
      for (let product in thisApp.data.products) {
        new Product(
          thisApp.data.products[product].id,
          thisApp.data.products[product]
        );
      }
    },
    getData: function () {
      const thisApp = this;

      thisApp.data = {};
      const url = settings.db.url + '/' + settings.db.product;

      fetch(url)
        .then(function (rawResponse) {
          return rawResponse.json();
        })
        .then(function (parsedResponse) {
          /* save parsedResponse as thisApp.data.products */

          thisApp.data.products = parsedResponse;
          /* execute initMenu method */

          thisApp.initMenu();
        });
    },
    initCart: function () {
      const thisApp = this;

      const cartElem = document.querySelector(select.containerOf.cart);
      thisApp.cart = new Cart(cartElem);
    },
    init: function () {
      const thisApp = this;

      thisApp.getData();
      thisApp.initCart();
    },
  };

  app.init();
}
