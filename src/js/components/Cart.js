import { settings, select, templates, classNames } from '../settings.js';
import { utils } from '../utils.js';
import CartProduct from './CartProduct.js';

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
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
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

      /* If cart is empty show message */
      /* If phone input or adress input is empty add class error */
      /* else POST products to data */

      if (!thisCart.products.length) {
        thisCart.dom.error.innerHTML = 'Add product to cart ';
      } else if (
        !thisCart.dom.phone.value ||
        isNaN(thisCart.dom.phone.value || thisCart.dom.phone.value.lenght > 15)
      ) {
        thisCart.dom.phone.classList.add('error');
        thisCart.dom.error.innerHTML = 'enter phone number';
      } else if (!thisCart.dom.address.value) {
        thisCart.dom.address.classList.add('error');
        thisCart.dom.error.innerHTML = 'enter delivery adress';
      } else {
        thisCart.dom.error.innerHTML = '';
        thisCart.dom.address.classList.remove('error');
        thisCart.dom.phone.classList.remove('error');

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

    console.log(url);

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

    thisCart.updateEffect();
  }

  remove(cartProduct) {
    const thisCart = this;

    const index = thisCart.products.indexOf(cartProduct);

    thisCart.products.splice(index, 1);

    cartProduct.dom.wrapper.remove();

    thisCart.update();
  }

  updateEffect() {
    const thisCart = this;

    /* if price is change or amount of product is change add visual effect */
    thisCart.dom.toggleTrigger.classList.add('update');

    setTimeout(() => {
      thisCart.dom.toggleTrigger.classList.remove('update');
    }, 300);
  }
}

export default Cart;
