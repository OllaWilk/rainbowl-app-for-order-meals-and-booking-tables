import { utils } from '../utils.js';
import { templates, select, settings, classNames } from './../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(bookingReservation) {
    const thisBooking = this;

    thisBooking.bookingTables = [];
    thisBooking.starters = [];

    thisBooking.render(bookingReservation);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.initActions();
  }

  render(bookingElem) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = bookingElem;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = document.querySelector(
      select.booking.peopleAmount
    );
    thisBooking.dom.hoursAmount = document.querySelector(
      select.booking.hoursAmount
    );
    thisBooking.dom.datePicker = document.querySelector(
      select.widgets.datePicker.wrapper
    );
    thisBooking.dom.hourPicker = document.querySelector(
      select.widgets.hourPicker.wrapper
    );

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(
      select.booking.tables
    );
    thisBooking.dom.alert = thisBooking.dom.wrapper.querySelector(
      select.all.errorinfo
    );
    thisBooking.dom.orderInputs = thisBooking.dom.wrapper.querySelectorAll(
      select.booking.orderInputs
    );

    thisBooking.dom.form = thisBooking.dom.wrapper.querySelector(
      select.booking.form
    );

    thisBooking.dom.bookedInfo = thisBooking.dom.wrapper.querySelector(
      select.booking.bookedInfo
    );

    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(
      select.booking.starters
    );

    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(
      select.booking.phone
    );
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(
      select.booking.address
    );
  }

  getData() {
    const thisBooking = this;

    const startDateParam = `${settings.db.dataStartParamKey}=${utils.dateToStr(
      thisBooking.datePicker.minDate
    )}`;

    const endDateParam = `${settings.db.dataEndParamKey}=${utils.dateToStr(
      thisBooking.datePicker.maxDate
    )}`;

    const params = {
      booking: [startDateParam, endDateParam],
      eventsCurrent: [settings.db.notRepeatParam, startDateParam, endDateParam],
      eventsRepeat: [settings.db.repeatParam, endDateParam],
    };

    const urls = {
      /* endpoint for list of bookings */
      booking: `${settings.db.url}/${settings.db.booking}?${params.booking.join(
        '&'
      )}`,
      /* endpoint for list of one off events */
      eventsCurrent: `${settings.db.url}/${
        settings.db.event
      }?${params.eventsCurrent.join('&')}`,
      /* endpoint for list of repeating events */
      eventsRepeat: `${settings.db.url}/${
        settings.db.event
      }?${params.eventsRepeat.join('&')}`,
    };

    /* fetch events from fake API based on params criteria */
    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then((allResponses) => {
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(([bookings, eventsCurrent, eventsRepeat]) => {
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;
    /* create simplified object to check booked tables */
    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }
    /* iterate to book repeating events starting from its starting date */
    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for (let item of eventsRepeat) {
      if (item.repeat == 'daily') {
        for (
          let loopDate = minDate;
          loopDate <= maxDate;
          loopDate = utils.addDays(loopDate, 1)
        )
          thisBooking.makeBooked(
            utils.dateToStr(loopDate),
            item.hour,
            item.duration,
            item.table
          );
      }
    }

    thisBooking.updateDom();
  }

  updateDom() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;

    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);
    /* all tables free at given date */
    let allAvailable = false;

    if (
      /* check if object or array exists
      if not set allAvailable to true */
      typeof thisBooking.booked[thisBooking.date] === 'undefined' ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] ===
        'undefined'
    ) {
      allAvailable = true;
      utils.hourToNumber(thisBooking.hourPicker.value);
    }
    /* iterate through visible tables */
    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
        table.innerHTML = 'Reserved';
      } else {
        table.innerHTML = `TABLE-${tableId}`;
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;
    /* check if date of event already exists in object booked
    if not create object with key with date  */
    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }
    /* hour from format in API to format in booked object
    e.g. from 12:30 to 12.5 */
    const startHour = utils.hourToNumber(hour);

    /* block number of 0.5 hours depending on duration of booking */
    for (
      let hourBlock = startHour;
      hourBlock < startHour + duration;
      hourBlock += 0.5
    ) {
      /* check if hour of event already exists in object booked
      if not create array with start hour */
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }
      /* assign booked table to hour, date */
      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmountWidget = new AmountWidget(
      thisBooking.dom.peopleAmount
    );

    thisBooking.hoursAmountWidget = new AmountWidget(
      thisBooking.dom.hoursAmount
    );

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', () => {
      thisBooking.updateDom();
    });
  }

  pickTables(pickedTable) {
    const thisBooking = this;

    const isBooked = pickedTable.classList.contains(
      classNames.booking.tableBooked
    );
    /* If table is booked show a message else select table and send selected table to bookngTAbles*/
    if (isBooked) {
      thisBooking.dom.alert.innerHTML = `This table is occupied. Please choose another.`;
    } else {
      thisBooking.dom.alert.innerHTML = '';
      pickedTable.classList.toggle(classNames.booking.selectedTable);

      if (pickedTable.classList.contains(classNames.booking.selectedTable)) {
        thisBooking.tableId = pickedTable.getAttribute(
          settings.booking.tableIdAttribute
        );
        /* add selected table to bookingTables */
        thisBooking.bookingTables.push(thisBooking.tableId);
      }
    }
    /* after submit clear booked info */
    thisBooking.dom.bookedInfo.innerHTML = '';
  }

  initActions() {
    const thisBooking = this;

    /* Add listener for table */
    [...thisBooking.dom.tables].forEach((table) => {
      table.addEventListener('click', () => {
        const pickedTable = table;

        thisBooking.pickTables(pickedTable);
      });

      /* if user resets date, reset table selection */
      [...thisBooking.dom.orderInputs].forEach((input) => {
        input.addEventListener('change', () => {
          table.classList.remove(classNames.booking.selectedTable);
          thisBooking.bookingTables.splice(0);
        });
      });
    });

    /* Send Reserwation */
    thisBooking.dom.form.addEventListener('click', (e) => {
      e.preventDefault();

      /* check all booking values. if phone, table, address values are empty don't sent data*/
      if (thisBooking.bookingTables.length === 0) {
        thisBooking.dom.alert.innerHTML = 'Pleas select table';
      } else if (
        !thisBooking.dom.phone.value &&
        isNaN(thisBooking.dom.phone.value)
      ) {
        thisBooking.dom.alert.innerHTML = 'Pleas add phone';
      } else if (!thisBooking.dom.address.value) {
        thisBooking.dom.alert.innerHTML = 'Pleas add address';
      } else {
        thisBooking.dom.alert.innerHTML = '';

        thisBooking.sendReserwation();

        /* Unselect tabless */
        [...thisBooking.dom.tables].forEach((table) => {
          table.classList.remove(classNames.booking.selectedTable);
        });

        /* clear  */
        thisBooking.bookingTables = [];
        thisBooking.dom.address.value = '';
        thisBooking.dom.phone.value = '';

        /* send info about submition */
        thisBooking.dom.bookedInfo.innerHTML = `Reserwation sent. Thank You`;
      }
    });
  }

  sendReserwation() {
    const thisBooking = this;

    const url = settings.db.url + '/' + settings.db.booking;

    const date = thisBooking.datePicker.value;
    const hour = thisBooking.hourPicker.value;
    const table = thisBooking.bookingTables;
    const duration = thisBooking.hoursAmountWidget.value;
    const ppl = thisBooking.peopleAmountWidget.value;
    const starters = [];
    const phone = thisBooking.dom.phone.value;
    const address = thisBooking.dom.address.value;

    this.dom.starters.forEach((starter) =>
      starter.checked ? starters.push(starter.value) : null
    );

    const booking = {
      date: date,
      hour: hour,
      table: table,
      duration: duration,
      ppl: ppl,
      starters: starters,
      phone: phone,
      address: address,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    };

    /* send booking form to fake API */
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((parseResponse) => {
        console.log('parseResponse booking', parseResponse);
        thisBooking.makeBooked(
          booking.date,
          booking.hour,
          booking.table,
          booking.duration
        );
        // thisBooking.updateDOM();
      });
  }
}

export default Booking;
