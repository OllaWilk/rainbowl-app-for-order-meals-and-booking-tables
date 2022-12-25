{
  ('use strict');
  const select = {
    handlebasTemplate: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
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
      console.log('new PRODUCT', this);
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
