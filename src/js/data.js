const dataSource = {}; // eslint-disable-line no-unused-vars

dataSource.products = {
  chiaPudding: {
    name: 'RainBowl Chia Pudding',
    price: 25,
    description:
      'This Rainbowl Chia Pudding not only satisfies a sweet tooth, but it is full of healthy antioxidant-rich foods. Chia is an increasingly popular food ingredient among consumers and manufacturers. The nutrient-rich seeds are good sources of α-linolenic acid (an omega-3 fatty acid), fiber, protein, vitamins, minerals, and antioxidants, prompting claims that chia is “superfood.',
    images: [
      '<img class="active" src="images/flavour/bowl.svg" alt="bowl">',
      '<img class="flavour-oat" src="images/flavour/oat.svg" alt="oat">',
      '<img class="flavour-acai active" src="images/flavour/acai.svg" alt="acai">',
      '<img class="flavour-cacao " src="images/flavour/cacao.svg" alt="cacao">',
      '<img class="flavour-mint " src="images/flavour/mint.svg" alt="mint">',
      '<img class="ingredients-vanilla " src="images/ingredients/vanilla.svg" alt="vanilla">',
      '<img class="ingredients-oranges active" src="images/ingredients/orange.svg" alt="orange">',
      '<img class="ingredients-bananas active" src="images/ingredients/banana.svg" alt="banana">',
      '<img class="ingredients-kivi active" src="images/ingredients/kivi.svg" alt="kivi">',
      '<img class="ingredients-blueberries " src="images/ingredients/blueberry.svg" alt="blueberry">',
      '<img class="ingredients-strawberries " src="images/ingredients/strawberry.svg" alt="strawberry">',
      '<img class="ingredients-almounds " src="images/ingredients/almound.svg" alt="almound">',
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
      flavour: {
        label: 'Flavour',
        type: 'radios',
        options: {
          oat: { label: 'Oat', price: 3 },
          mint: { label: 'Mint', price: 5 },
          chocolate: { label: 'Chocolate', price: 4 },
          acai: { label: 'Acai Powder', price: 5, default: true },
        },
      },
      sugar: {
        label: 'Sugar',
        type: 'radios',
        options: {
          maple: { label: 'Maple syroup', price: 3, default: true },
          honey: { label: 'Honey', price: 5 },
          sugar: { label: 'Sugar', price: 4 },
          sugarfree: { label: 'Sugarr free', price: 0 },
        },
      },
      ingredients: {
        label: 'Ingredients',
        type: 'checkboxes',
        options: {
          vanilla: { label: 'Vanilla', price: 3 },
          orange: { label: 'Orange', price: 4, default: true },
          banana: { label: 'Banana', price: 5, default: true },
          kivi: { label: 'kivi', price: 3, default: true },
          blueberry: { label: 'Cacao', price: 4 },
          stravberry: { label: 'Strawberry', price: 3 },
          almound: { label: 'Almound', price: 3 },
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
      // eslint-disable-next-line quotes
      "Overnight oats are simply oats that are left to soak overnight instead of cooked in the morning, which makes them perfect for a quick, filling and nutritious breakfast. It's a bit like making cold-brew coffee instead of the regular cup of hot coffee in the morning. Our overnight oatmeals are also some of our favorite desserts. They are creamy, dreamy, and delicious.",
    images: [
      '<img class="active" src="images/flavour/bowl.svg" alt="bowl">',
      '<img class="ingredients-oat active" src="images/ingredients/oat.svg" alt="oat">',
      '<img class="ingredients-chocolate active" src="images/ingredients/chocolate.svg" alt="chocolate">',
      '<img class="ingredients-vanilla " src="images/ingredients/vanilla.svg" alt="vanilla">',
      '<img class="ingredients-hezelnut active" src="images/ingredients/hezelnut.svg" alt="hezelnut">',
      '<img class="ingredients-orange " src="images/ingredients/orange.svg" alt="orange">',
      '<img class="ingredients-banana active" src="images/ingredients/banana.svg" alt="banana">',
      '<img class="ingredients-kivi " src="images/ingredients/kivi.svg" alt="kivi">',
      '<img class="ingredients-apple active" src="images/ingredients/apple.svg" alt="apple">',
      '<img class="ingredients-blueberry " src="images/ingredients/blueberry.svg" alt="blueberry">',
      '<img class="ingredients-strawberry" src="images/ingredients/strawberry.svg" alt="strawberry">',
      '<img class="ingredients-cinnamon active" src="images/ingredients/cinnamon.svg" alt="cinnamon">',
      '<img class="ingredients-almound " src="images/ingredients/almound.svg" alt="almound">',
    ],
    params: {
      dairy: {
        label: 'Dairy',
        type: 'radios',
        options: {
          milk: { label: 'Milk', price: 0, default: true },
          oat: { label: 'Oat milk', price: 2 },
          almound: { label: 'Almound milk', price: 2 },
          yogurt: { label: 'Greek Yougurt', price: 4 },
        },
      },
      sugar: {
        label: 'Sugar',
        type: 'radios',
        options: {
          maple: { label: 'Maple syroup', price: 3 },
          honey: { label: 'Honey', price: 5 },
          sugar: { label: 'Sugar', price: 4 },
          sugarfree: { label: 'Sugar free', price: 0, default: true },
        },
      },
      ingredients: {
        label: 'Ingredients',
        type: 'checkboxes',
        options: {
          apple: { label: 'Apple', price: 1, default: true },
          chocolate: { label: 'Chocolate', price: 3, default: true },
          vanilla: { label: 'Vanilla', price: 3 },
          hezelnut: { label: 'Hezelnut', price: 5 },
          orange: { label: 'Orange', price: 3 },
          banana: { label: 'Banana', price: 4 },
          kivi: { label: 'Kivi', price: 3 },
          blueberry: { label: 'Blueberry', price: 3 },
          strawberry: { label: 'Strawberry', price: 3 },
          cinnamon: { label: 'Cinnamon & Spice', price: 2.5 },
          almound: { label: 'Almound', price: 3 },
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
  soup: {
    class: 'small',
    name: 'Soup season is back',
    price: 30,
    description:
      // eslint-disable-next-line quotes
      "When there's just too much on your mind, that's when the warm, uncomplicated goodness of soup hits the spot.",
    images: [
      '<img class="soup-broccoli active" src="images/soups/broccoli.svg">',
      '<img class="soup-chili " src="images/soups/chilisoup.svg">',
      '<img class="soup-pumpkin " src="images/soups/pumpkin.svg">',
    ],
    params: {
      soups: {
        label: 'Choose your soup',
        type: 'radios',
        options: {
          brocoliSoup: {
            label: 'Broccoli Cheese Soup',
            price: 0,
            default: true,
          },
          chiliSoup: {
            label:
              'Chili Soup with ground meat and chili powder, plus beans and tomato.',
            price: 0,
          },
          pumpkinSoup: {
            label:
              'Creamy pumpkin soup, savouriness from the broth, garlic and onion. ',
            price: 0,
          },
        },
      },
    },
  },
};
