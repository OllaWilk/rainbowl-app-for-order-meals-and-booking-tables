class Slider {
  constructor(arrows, content) {
    this.arrows = arrows;
    this.content = content;
    this.slide(arrows);
  }

  slide(arrows) {
    arrows.forEach((arrow) => {
      /* after clicking arrow, move to the right/left list of checkboxes  */
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        this.content.classList.toggle('move');
      });
    });
  }
}

export default Slider;
