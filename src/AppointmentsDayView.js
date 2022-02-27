import React, { useState } from 'react';

const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');

  return `${h}:${m}`;
};

const customerFullName = (customer) => {
  return `${customer.firstName} ${customer.lastName}`;
};

export const Appointment = ({ customer, details, startsAt }) => (
  <div id={'appointmentView'}>
    <h3>
      Today's appointment at {appointmentTimeOfDay(startsAt)}
    </h3>
    <table id="customer-info">
      <tbody>
        <tr>
          <th>Customer</th>
          <td>{customerFullName(customer)}</td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
          <th>Stylist</th>
          <td>{details.stylist}</td>
        </tr>
        <tr>
          <th>Service</th>
          <td>{details.service}</td>
        </tr>
        <tr>
          <th>Notes</th>
          <td>{details.notes}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, selectAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button
              type={'button'}
              onClick={() => selectAppointment(i)}
            />
            {appointmentTimeOfDay(appointment.startsAt)}
          </li>
        ))}
      </ol>

      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
