import { templates } from './../settings.js';

class Booking {
  constructor(bookingReservation) {
    const thisBooking = this;

    thisBooking.render(bookingReservation);
  }

  render(bookingElem) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = bookingElem;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
  }
}

export default Booking;
