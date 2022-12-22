const dataSource = {}; // eslint-disable-line no-unused-vars

dataSource.products = {
  smoothie: {
    name: 'Fruit smoothie',
    price: 20,
    description:
      'This fruit-sweetened smoothie not only satisfies a sweet tooth, but it is full of healthy antioxidant-rich foods.',
    images: [
      '<img class="active" src="images/banana.png">',
      '<img class="active" src="images/chia.png">',
      '<img class="active" src="images/spinach.png">',
      '<img class="active" src="images/strawberry.png">',
      '<img class="active" src="images/orange.png">',
      '<img class="active" src="images/watermelon.png">',
      '<img class="active" src="images/blueberry.png">',
      '<img class="active" src="images/berry.png">',
      '<img class="active" src="images/mint.png">',
      '<img class="active" src="images/pineapple.png">',
      '<img class="active" src="images/honey.png">',
      '<img class="active" src="images/apple.png">',
    ],
    params: {
      dairy: {
        label: 'Dairy',
        type: 'radios',
        options: {
          milk: { label: 'Milk', price: 0, default: true },
          oat: { label: 'Oat milk', price: 2 },
          almound: { label: 'Almound milk', price: 2 },
        },
      },
      ingredients: {
        label: 'Ingredients',
        type: 'checkboxes',
        options: {
          bananas: { label: 'Banan', price: 4, default: true },
          chia: { label: 'Chia seeds', price: 3 },
          spinach: { label: 'Spinach', price: 2.5 },
          strawberry: { label: 'Strawberry', price: 5 },
          orange: { label: 'Orange', price: 4 },
          watermelon: { label: 'Watermelon', price: 3 },
          blueberry: { label: 'Blueberry', price: 4 },
          berry: { label: 'Berry', price: 3 },
          mint: { label: 'Mint', price: 3 },
          pineapple: { label: 'Pineapple', price: 4 },
          honey: { label: 'Honey', price: 3, default: true },
          apple: { label: 'Apple', price: 3 },
        },
      },
      size: {
        label: 'size',
        type: 'select',
        options: {
          standard: { label: 'standard', price: 0, default: true },
          medium: { label: 'large', price: 1 },
          large: { label: 'large', price: 2 },
        },
      },
    },
  },
  milkshake: {
    name: 'Milk shakes',
    price: 20,
    description:
      'When it comes to having your cake and eating it too, why not drink it as well? Milkshakes on a hot day (or, heck, we love them even in the dead of winter, like this sugar cookie milkshake) are some of our favorite desserts. They are creamy, dreamy, and only get better mixed with all our favorite crumbled cookies, pies, and brownies.',
    images: [
      '<img class="active" src="images/chocolate.png">',
      '<img class="active" src="images/vanila.png">',
      '<img class="active" src="images/carmel.png">',
      '<img class="active" src="images/cappuccino.png">',
      '<img class="active" src="images/oreo.png">',
      '<img class="active" src="images/marshmallow.png">',
      '<img class="active" src="images/WhippedMilk.png">',
      '<img class="active" src="images/cinnamon.png">',
      '<img class="active" src="images/almoundButter.png">',
      '<img class="active" src="images/matcha.png">',
      '<img class="active" src="images/tahini.png">',
      '<img class="active" src="images/ginger.png">',
      '<img class="active" src="images/hezelnut.png">',
    ],
    params: {
      dairy: {
        label: 'Dairy',
        type: 'radios',
        options: {
          milk: { label: 'Milk', price: 0, default: true },
          oat: { label: 'Oat milk', price: 2 },
          almound: { label: 'Almound milk', price: 2 },
        },
      },
      ingredients: {
        label: 'Ingredients',
        type: 'checkboxes',
        options: {
          chocolate: { label: 'Chocolate', price: 4 },
          vanila: { label: 'Vanila', price: 3, default: true },
          carmel: { label: 'Carmel', price: 2.5 },
          cappuccino: { label: 'Cappuccino', price: 5 },
          oreo: { label: 'Oreo', price: 4 },
          marshmallow: { label: 'Marshmallow', price: 3 },
          WhippedMilk: { label: 'Whipped milk', price: 4, default: true },
          cinnamon: { label: 'Cinnamon', price: 3 },
          almoundButter: { label: 'Almound Butter', price: 3 },
          matcha: { label: 'Matcha', price: 4 },
          tahini: { label: 'Tahini', price: 3 },
          ginger: { label: 'Ginger', price: 3 },
          hezelnut: { label: 'Hezelnut', price: 3 },
        },
      },
      size: {
        label: 'size',
        type: 'select',
        options: {
          standard: { label: 'standard', price: 0, default: true },
          medium: { label: 'large', price: 1 },
          large: { label: 'large', price: 2 },
        },
      },
    },
  },
};
