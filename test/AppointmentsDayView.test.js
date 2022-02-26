import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import {
  Appointment,
  AppointmentsDayView,
} from '../src/AppointmentsDayView';

describe('Appointment', () => {
  let container;
  let customer = {};
  let details = {};

  beforeEach(() => {
    container = document.createElement('div');
    customer = {};
    details = {};
  });

  const render = (component) =>
    ReactDOM.render(component, container);

  const getTableRow = (index) =>
    container.querySelectorAll('#customer-info > tbody > tr')[
      index
    ];

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };

    render(<Appointment customer={customer} details={details} />);

    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' };

    render(<Appointment customer={customer} details={details} />);

    expect(container.textContent).toMatch('Jordan');
  });

  it('renders customer information in a table', () => {
    render(<Appointment customer={customer} details={details} />);

    expect(
      container.querySelector('table#customer-info')
    ).not.toBeNull();
  });

  it('renders `tr` elements inside `tbody` matching expected customer information', () => {
    render(<Appointment customer={customer} details={details} />);

    expect(
      container.querySelector('table#customer-info > tbody')
    ).not.toBeNull();

    expect(
      container.querySelectorAll(
        'table#customer-info > tbody > tr'
      )
    ).toHaveLength(5);
  });

  it('renders `th` cells in each `tr` matching labels for appointment data', () => {
    render(<Appointment customer={customer} details={details} />);

    const headers = container.querySelectorAll(
      'table#customer-info > tbody > tr > th'
    );
    expect(headers).toHaveLength(5);

    expect(headers[0].textContent).toMatch('Customer');
    expect(headers[1].textContent).toMatch('Phone Number');
    expect(headers[2].textContent).toMatch('Stylist');
    expect(headers[3].textContent).toMatch('Service');
    expect(headers[4].textContent).toMatch('Notes');
  });

  it('renders `td` cells for each data point in appointment data', () => {
    render(<Appointment customer={customer} details={details} />);

    const cells = container.querySelectorAll(
      'table#customer-info > tbody > tr > td'
    );
    expect(cells).toHaveLength(5);
  });

  it('renders customer full name in first table row', () => {
    customer = {
      firstName: 'Jordan',
      lastName: 'Datfrit',
    };

    render(<Appointment customer={customer} details={details} />);

    const customerTableRow = getTableRow(0);
    expect(customerTableRow.querySelector('td').textContent).toBe(
      'Jordan Datfrit'
    );
  });

  it('renders customer phone number in second row', () => {
    customer = {
      phoneNumber: '999-000-1234',
    };

    render(<Appointment customer={customer} details={details} />);

    const phoneNumberTableRow = getTableRow(1);
    expect(
      phoneNumberTableRow.querySelector('td').textContent
    ).toBe('999-000-1234');
  });

  it('renders stylist in third row', () => {
    details = {
      stylist: 'Shannon',
    };

    render(<Appointment customer={customer} details={details} />);

    const stylistTableRow = getTableRow(2);
    expect(stylistTableRow.querySelector('td').textContent).toBe(
      'Shannon'
    );
  });

  it('renders salon service in fourth row', () => {
    details = {
      service: 'Beard Trim',
    };

    render(<Appointment customer={customer} details={details} />);

    const salonServiceTableRow = getTableRow(3);
    expect(
      salonServiceTableRow.querySelector('td').textContent
    ).toBe('Beard Trim');
  });

  it('renders notes in fifth row', () => {
    details = {
      notes:
        'Allergic to coconut products, used allergy-safe options',
    };

    render(<Appointment customer={customer} details={details} />);
    const notesTableRow = getTableRow(4);
    expect(notesTableRow.querySelector('td').textContent).toBe(
      'Allergic to coconut products, used allergy-safe options'
    );
  });
});

describe('AppointmentsDayView', () => {
  let container;

  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' },
      details: {
        stylist: 'Shannon',
      },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' },
      details: {
        stylist: 'Shannon',
      },
    },
  ];

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = (component) =>
    ReactDOM.render(component, container);

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(
      container.querySelector('div#appointmentsDayView')
    ).not.toBeNull();
  });

  it('renders multiple elements in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual('12:00');
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments for today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll('li > button')).toHaveLength(
      2
    );

    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);

    expect(container.textContent).toMatch('Jordan');
  });
});
