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

  const appointmentTable = () =>
    container.querySelector('#appointmentView > table');

  it('renders appointment header with given time', () => {
    const today = new Date();
    render(
      <Appointment
        startsAt={today.setHours(12, 0)}
        customer={customer}
        details={details}
      />
    );

    expect(container.querySelector('h3').textContent).toMatch(
      `Today's appointment at 12:00`
    );
  });

  it('renders a table', () => {
    render(<Appointment customer={customer} details={details} />);

    expect(appointmentTable()).not.toBeNull();
  });

  it('renders h3 element for displaying appointment time', () => {
    const today = new Date();
    render(
      <Appointment
        startsAt={today.setHours(12, 0)}
        customer={customer}
        details={details}
      />
    );

    expect(container.querySelector('h3')).not.toBeNull();
  });

  it('renders appointment header with another given time', () => {
    const today = new Date();
    render(
      <Appointment
        startsAt={today.setHours(13, 0)}
        customer={customer}
        details={details}
      />
    );

    expect(container.querySelector('h3').textContent).toMatch(
      `Today's appointment at 13:00`
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
