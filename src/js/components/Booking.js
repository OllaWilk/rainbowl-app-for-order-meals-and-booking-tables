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
    thisBooking.pickStarters();
    console.log(thisBooking.booking);
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

    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelector(
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
      booking: `${settings.db.url}/${settings.db.booking}?${params.booking.join(
        '&'
      )}`,

      eventsCurrent: `${settings.db.url}/${
        settings.db.event
      }?${params.eventsCurrent.join('&')}`,

      eventsRepeat: `${settings.db.url}/${
        settings.db.event
      }?${params.eventsRepeat.join('&')}`,
    };

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

    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

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

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] === 'undefined' ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] ===
        'undefined'
    ) {
      allAvailable = true;
      utils.hourToNumber(thisBooking.hourPicker.value);
    }

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

    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for (
      let hourBlock = startHour;
      hourBlock < startHour + duration;
      hourBlock += 0.5
    ) {
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }

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

  pickStarters() {
    const thisBooking = this;

    thisBooking.dom.starters.addEventListener('click', function (event) {
      const clickedElement = event.target;
      if (
        clickedElement.tagName === 'INPUT' &&
        clickedElement.type === 'checkbox' &&
        clickedElement.name === 'starter'
      ) {
        if (clickedElement.checked === true) {
          thisBooking.starters.push(clickedElement.value);
        } else if (clickedElement.checked === false) {
          thisBooking.starters.splice(
            thisBooking.starters.indexOf(clickedElement.value),
            1
          );
        }
      }
    });
  }
  initActions() {
    const thisBooking = this;

    /* Add listener for table */
    [...thisBooking.dom.tables].forEach((table) => {
      table.addEventListener('click', () => {
        const pickedTable = table;

        thisBooking.pickTables(pickedTable);
      });

      /* Unselect tables if inputs change */
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

    const booking = {
      date: thisBooking.datePicker.value,
      hour: thisBooking.hourPicker.value,
      table: thisBooking.bookingTables,
      duration: thisBooking.hoursAmountWidget.value,
      ppl: thisBooking.peopleAmountWidget.value,
      starters: thisBooking.starters,
      phone: thisBooking.dom.phone.value,
      address: thisBooking.dom.address.value,
    };

    console.log('reserwation', booking);
  }
}

export default Booking;
