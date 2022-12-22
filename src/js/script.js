{
  ('use strict');

  class Product {
    constructor(product, data) {
      console.log('new PRODUCT', this);
      this.product = product;
      this.data = data;
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
