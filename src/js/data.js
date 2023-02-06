const dataSource = {}; // eslint-disable-line no-unused-vars

dataSource.products = {
  chiaPudding: {
    name: 'RainBowl Chia Pudding',
    price: 25,
    description:
    'This Rainbowl Chia Pudding not only satisfies a sweet tooth, but it is full of healthy antioxidant-rich foods. Chia is an increasingly popular food ingredient among consumers and manufacturers. The nutrient-rich seeds are good sources of α-linolenic acid (an omega-3 fatty acid), fiber, protein, vitamins, minerals, and antioxidants, prompting claims that chia is “superfood.',
    images: [
      '<img class="active" src="images/banana.png">',
      '<img class="active" src="images/vanila.png">',
      '<img class="active" src="images/strawberry.png">',
      '<img class="active" src="images/orange.png">',
      '<img class="active" src="images/blueberry.png">',
      '<img class="active" src="images/almounds.png">',
      '<img class="active" src="images/mint.png">',
      '<img class="active" src="images/apple.png">',
      '<img class="active" src="images/chocolate.png">',
      '<img class="active" src="images/cherry.png">',
    ],
    params: {
      dairy: {
        label: 'Dairy',
        type: 'radios',
        options: {
          milk: { label: 'Milk', price: 0, default: true },
          oat: { label: 'Coconut milk', price: 3 },
          almound: { label: 'Almound milk', price: 3 },
        },
      },
      sugar: {
        label: 'Sugar',
        type: 'radios',
        options: {
          maple: { label: 'Maple syroup', price: 0, default: true },
          honey: { label: 'Honey', price: 0 },
          sugar: { label: 'Sugar', price: 4 },
        }
      },
      ingredients: {
        label: 'Ingredients',
        type: 'checkboxes',
        options: {
          banana: { label: 'Banana', price: 4, default: true },
          vanila: { label: 'Vanila', price: 3, default: true },
          strawberry: { label: 'Strawberry', price: 5 },
          orange: { label: 'Orange', price: 4 },
          blueberry: { label: 'Blueberry', price: 4 },
          almound: { label: 'Almounds', price: 3 },
          mint: { label: 'Mint', price: 3 },
          apple: { label: 'Apple', price: 3 },
          chocolate: { label: 'Chocolate', price: 3 },
          cherry: { label: 'Cherry', price: 3 },
        },
      },
      size: {
        label: 'size',
        type: 'select',
        options: {
          standard: { label: 'standard 200 ml', price: 0, default: true },
          medium: { label: 'medium 400 ml', price: 1 },
          large: { label: 'large 600 ml', price: 2 },
        },
      },
    },
  },
  oatmeal: {
    name: 'Feel Good Foodie Overnight Oatmeal ',
    price: 25,
    description:
    'Overnight oats are simply oats that are left to soak overnight instead of cooked in the morning, which makes them perfect for a quick, filling and nutritious breakfast. It\'s a bit like making cold-brew coffee instead of the regular cup of hot coffee in the morning. Our overnight oatmeals are also some of our favorite desserts. They are creamy, dreamy, and delicious.',
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
      sugar: {
        label: 'Sugar',
        type: 'radios',
        options: {
          maple: { label: 'Maple syroup', price: 0, default: true },
          honey: { label: 'Honey', price: 0 },
          sugar: { label: 'Sugar', price: 4 },
          sugarfree: { label: 'Sugar free', price: 0 },
        }
      },
      ingredients: {
        label: 'Ingredients',
        type: 'checkboxes',
        options: {
          yogurt: { label: 'Yogurt', price: 1, default: true },
          vanila: { label: 'Vanila', price: 3, default: true },
          chocolate: { label: 'Chocolate', price: 2.5 },
          peanutButter: { label: 'Peanut Butter', price: 5 },
          pumpkin: { label: 'Pumpkin & spice', price: 4 },
          cinamon: { label: 'Cinammon', price: 3 },
          apple: { label: 'Apple', price: 4 },
          blueberry: { label: 'Blueberry', price: 3 },
          matcha: { label: 'Matcha', price: 4 },
          banana: { label: 'Banana', price: 3 },
          cherry: { label: 'Cherry', price: 3 },
          strawberry: { label: 'Strawberry', price: 3 },
        },
      },
      size: {
        label: 'size',
        type: 'select',
        options: {
          standard: { label: 'standard 200ml', price: 0, default: true },
          medium: { label: 'medium 400ml', price: 1 },
          large: { label: 'large 600ml', price: 2 },
        },
      },
    },
  },
};
