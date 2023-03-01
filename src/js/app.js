import { settings, select } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';

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
    const url = `${settings.db.url}/${settings.db.product}`;

    const errorPage = document.querySelector(select.page.noConnection);

    fetch(url)
      .then((rawResponse) => {
        if (!rawResponse.ok) {
          errorPage.classList.add('show-page');
          throw new Error('Network response was not ok');
        }
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        /* save parsedResponse as thisApp.data.products */

        thisApp.data.products = parsedResponse;
        /* execute initMenu method */

        thisApp.initMenu();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function (e) {
      app.cart.add(e.detail.product);
    });
  },
  init: function () {
    const thisApp = this;

    thisApp.getData();
    thisApp.initCart();
  },
};

app.init();
