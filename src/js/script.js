{
  ('use strict');

  class Product {
    constructor() {
      console.log('new PRODUCT', this);
    }
  }

  const app = {
    initMenu: function () {
      const testProduct = new Product();
      console.log('testProduct', testProduct);
    },
    init: function () {
      console.log('***START APP***');
      this.initMenu();
    },
  };

  app.init();
}
