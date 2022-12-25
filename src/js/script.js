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
      clickable: '.product__header',
    },
    all: {
      menuProductsActive: '#product-list > .product.active',
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
      this.toggleAcordion();
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

    toggleAcordion() {
      const thisProduct = this;
      /* get clickable element */
      const openMenuCart = thisProduct.element.querySelector(
        select.menuProduct.clickable
      );
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
