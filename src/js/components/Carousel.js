class Carousel {
  constructor(wrap, dotsWrap) {
    const thisCarousel = this;

    let currentSlide = 0;

    thisCarousel.getElements(wrap, dotsWrap);
    thisCarousel.changeSlide(0, currentSlide);
    thisCarousel.pickSlide();
    thisCarousel.slideInterval(currentSlide);
  }

  getElements(wrap, dotsWrap) {
    const thisCarousel = this;

    thisCarousel.wrap = wrap;
    thisCarousel.dotsWrap = dotsWrap;

    thisCarousel.wrap.slides =
      thisCarousel.wrap.querySelectorAll('.testimonial');

    thisCarousel.dotsWrap.dots = thisCarousel.dotsWrap.querySelectorAll('.dot');
  }

  showSlide(index) {
    const thisCarousel = this;

    thisCarousel.wrap.slides.forEach((slide) => (slide.style.display = 'none'));
    thisCarousel.wrap.slides[index].style.display = 'flex';
  }

  activeDot(index) {
    const thisCarousel = this;

    thisCarousel.dotsWrap.dots.forEach((dot) => {
      dot.classList.remove('active');
    });

    thisCarousel.dotsWrap.dots[index].classList.add('active');
  }

  changeSlide(index, currentSlide) {
    const thisCarousel = this;

    currentSlide =
      (index + thisCarousel.wrap.slides.length) %
      thisCarousel.wrap.slides.length;

    thisCarousel.showSlide(currentSlide);
    thisCarousel.activeDot(currentSlide);
  }

  pickSlide() {
    const thisCarousel = this;

    thisCarousel.dotsWrap.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        thisCarousel.changeSlide(index);
      });
    });
  }

  slideInterval(currentSlide) {
    const thisCarousel = this;

    thisCarousel.dotsWrap.dots[currentSlide];

    function slider() {
      thisCarousel.changeSlide(currentSlide++);

      if (currentSlide > thisCarousel.dotsWrap.dots.length - 1) {
        currentSlide = 0;
      }
    }

    setInterval(() => {
      slider();
    }, 3000);
  }
}

export default Carousel;
