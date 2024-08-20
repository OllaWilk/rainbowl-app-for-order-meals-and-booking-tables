# 🍉  Reinbowl: app for odred meals and booking tables

This project is a fully custom-designed website for the "Rainbowl" restaurant, specializing in healthy and delicious meals like oatmeal, soups, and puddings. The website was entirely hand-coded, with all HTML and SCSS files created from scratch. The design, graphics, and overall aesthetics were carefully crafted to provide a modern, clean, and responsive user experience.

[![Click here to view the live site](src/images/image_2024-08-20_125829238.png)](https://rainbowl-ollawilk.vercel.app/#/home) 
**[Click here to view the live site](https://rainbowl-ollawilk.vercel.app/#/home)**


## 🍒  Technologies
![HTML5]( https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SCSS]( https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript (ES6+)](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Handlebars js](https://img.shields.io/badge/Handlebars%20js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)
![Flexbox](https://img.shields.io/badge/css-flexbox-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Media Queries](https://img.shields.io/badge/css-media%20queries-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![AJAX](https://img.shields.io/badge/AJAX-20B2AA?style=for-the-badge)
![API](https://img.shields.io/badge/API-grey?style=for-the-badge)
![JSON](https://img.shields.io/badge/JSON-grey?style=for-the-badge)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## 🥭   Implemented Solutions:

- **BEM Methodology:** The `style.scss` file is used solely to import other `.scss` files. This organizational approach helps maintain a clear structure, with each style file having a specific purpose.

- **Handlebars Templates:** This project extensively utilizes Handlebars templates to separate content, appearance, and functionality, resulting in a more modular and maintainable codebase.

- **Script Configuration:** All configuration data is centralized in the `settings.js` file, simplifying future development and modifications.

- **Object-Oriented Approach:** The entire application is built around classes and their instances, allowing for scalable and maintainable code architecture.
- 
## 🍏  Key Features:

**1. Custom Design and Graphics**

* All graphics, icons, and images were designed specifically for this project, ensuring a unique visual identity that aligns with the restaurant's brand.
* The entire website design, including layout, color schemes, and typography, was created from scratch, with attention to detail in every aspect.

**2. Modern Web Development Practices:**

* **SCSS for Styling:** The project uses SCSS to organize styles efficiently, employing variables, mixins, and nested rules for easier management and customization.
* **Semantic HTML5:** The use of semantic HTML5 elements improves accessibility and SEO, making the site more meaningful for search engines and assistive technologies.

**3. User-Friendly Interface:**

* **SCSS Styling:** Leverages SCSS for more organized and maintainable styling, utilizing variables and mixins for easy theme customization.
* **Semantic HTML5:** Uses semantic elements for improved accessibility and SEO, ensuring meaningful content structure.

**4. Interactive Elements:**

* **Interactive Navbar:** A responsive navigation bar with dropdowns that collapses into a mobile-friendly "hamburger" menu on smaller screens, ensuring easy navigation.
* **Carousel for Featured Dishes:** A dynamic carousel showcases the restaurant's featured dishes, allowing for an engaging visual presentation through sliding images and captions.
* **Custom Cards:** The menu items and other sections are displayed using custom-designed cards, providing a consistent and clean layout.

**5. 🍋 Shopping Cart Functionalities:**

  * **Shopping Cart Functionalities:**

   * **Cart Class Implementation:** The Cart class is responsible for the overall functionality of the shopping cart. This includes displaying and hiding the cart, adding and removing products, and calculating the total order price. This class handles the global cart operations, ensuring a smooth user experience.

   * **CartProduct Class Implementation:** The CartProduct class manages individual products within the cart. Each instance of this class represents a single product, encapsulating all the relevant data and methods for that product. This separation of concerns keeps the code organized and makes it easier to manage the cart's contents.

* **AJAX and API Integration:**

   * The project now incorporates AJAX and API technologies to handle dynamic data fetching and order processing. Initially, the website fetches the list of available products from the server using AJAX. Then, after the user completes their order, the order data is sent back to the server using a POST request. Although this API is for prototyping purposes and lacks security features, it provides a foundation for real-world applications.

* **Form Submission and Order Processing:**

   * The checkout form in the cart has been enhanced to prevent page reloads upon submission. The form data, including the cart contents and user details (address and phone number), are packaged into a payload and sent to the API. The API responds with a unique order ID, confirming that the order was successfully placed.

* **Dynamic Product Management:**

   * The cart now dynamically manages product quantities and options. When a product is added to the cart, it retains its selected options and quantity. The cart automatically recalculates totals as products are added, removed, or their quantities are adjusted.

* **Product Removal and Cart Update:**

   * Users can now remove individual items from the cart. The cart's totals are recalculated to reflect the updated contents, providing an accurate summary of the user's order.

**6. 🍇 New Functionalities for Table Reservations:**

   * **JS Component Division:** The JavaScript code has been organized into components, following best practices for larger projects. This approach improves maintainability and readability, laying the groundwork for further enhancements.

   * **Class Inheritance in OOP:** The project introduces class inheritance in the context of Object-Oriented Programming (OOP). This technique is used to streamline code and create more robust functionalities.

   * **Advanced Table Reservation Form:** A new page for table reservations has been added. This form allows users to select a date and time, view the layout of the restaurant, and choose available tables for reservation.

   * **Date and Time Pickers:** The reservation form includes a date picker and a time slider, both implemented using external plugins. These tools enhance the user experience by providing an intuitive way to select reservation details.

   * **Widget Integration:** The project integrates custom widgets, such as the `DatePicker` and `HourPicker`, which extend a base class and provide specialized functionalities for the reservation form.

   * **Dynamic Table Management:** The reservation system dynamically manages table availability based on selected date and time. This includes handling recurring events that might affect table availability.



**Limitations and Future Enhancements:**

The current implementation is a prototype and is not intended for production use. The API used lacks security features, such as data encryption and user authentication. Additionally, the system does not support advanced features like user account management, order history, or payment processing.

Potential improvements include adding validation for the checkout form, creating an admin panel for order management, and refining the cart's user interface to enhance usability and accessibility. The reservation system could also be expanded with features like table size management, real-time updates, and enhanced event handling.


## 🍓 Summary 
Creating the "Reinbowl" homepage was an enriching experience that significantly deepened my understanding of web design and development. Not only did I design the entire website from scratch, but I also tackled the challenge of learning to navigate and utilize documentation for the first time. This was particularly important when working with Bootstrap and SCSS, where understanding the tools and resources available was crucial for creating a unique and functional website.

This project reinforced the importance of thoroughly understanding the underlying principles of frameworks and how to modify and extend them to suit specific needs. It also highlighted the value of designing custom graphics and layouts, which greatly enhanced the website's visual appeal and user experience.

## 🍐  Installation and Launch

**Clone the project:**

 ```bash
git clone https://github.com/OllaWilk/rainbowl-app-for-order-meals-and-booking-tables.git
```

**Go to the project directory:**

 ```bash
cd rainbowl-app-for-order-meals-and-booking-tables
```

**Install dependencies:**

 ```bash
npm install
```

**Start the server:**

 ```bash
npm run watch
```
## 🍇 TO DO
```
Backend aplication in NestJS
finish this read.me
```

