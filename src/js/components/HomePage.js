import Carousel from './Carousel.js';

class HomePage {
  constructor(element) {
    const thisHome = this;

    thisHome.getElements(element);
    thisHome.initCarousel();
  }

  getElements(element) {
    const thisHome = this;

    thisHome.dom = {};
    thisHome.dom.wrapper = element;

    thisHome.dom.tiles = thisHome.dom.wrapper.querySelector('.tiles');
    thisHome.dom.dots = thisHome.dom.wrapper.querySelector('.dots');
  }

  initCarousel() {
    const thisHome = this;

    thisHome.carousel = new Carousel(thisHome.dom.tiles, thisHome.dom.dots);
  }
}

export default HomePage;
