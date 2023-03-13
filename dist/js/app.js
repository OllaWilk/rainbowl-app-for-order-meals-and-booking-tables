import { settings, select, classNames } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import HomePage from './components/HomePage.js';

const app = {
  initPages() {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children; // find all children of pages container
    thisApp.navLinks = document.querySelectorAll(select.nav.links); // find all navigation links

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        /* get page id from href attrigute */
        const id = link.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change url hash */
        window.location.hash = `#/${id}`;
      });
    }
  },

  activatePage(pageId) {
    const thisApp = this;

    /* add class 'active' to maching pages, remove from non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class 'active' to maching links, remove from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') === `#${pageId}`
      );
    }
  },
  initMenu() {
    const thisApp = this;

    /* init new Product */
    for (let product in thisApp.data.products) {
      new Product(
        thisApp.data.products[product].id,
        thisApp.data.products[product]
      );
    }
  },
  getData() {
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
  initCart() {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function (e) {
      app.cart.add(e.detail.product);
    });
  },
  initBooking() {
    const thisApp = this;

    const bookingReservation = document.querySelector(
      select.containerOf.booking
    );

    thisApp.booking = new Booking(bookingReservation);
  },

  initHomePage() {
    const thisApp = this;

    const homePageWrap = document.querySelector(select.containerOf.home);

    thisApp.home = new HomePage(homePageWrap);
  },

  init() {
    const thisApp = this;
    thisApp.initPages();
    thisApp.getData();
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initHomePage();
  },
};

app.init();
