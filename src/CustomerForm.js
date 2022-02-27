import React, { useState } from 'react';

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleInputChange =
    (fieldName) =>
    ({ target }) => {
      setCustomer((customer) => ({
        ...customer,
        [fieldName]: target.value,
      }));
    };

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor={'firstName'}>First name</label>
      <input
        type={'text'}
        name={'firstName'}
        id={'firstName'}
        value={firstName}
        onChange={handleInputChange('firstName')}
      />

      <label htmlFor={'lastName'}>Last name</label>
      <input
        type={'text'}
        name={'lastName'}
        id={'lastName'}
        value={lastName}
        onChange={handleInputChange('lastName')}
      />

      <label htmlFor={'phoneNumber'}>Phone number</label>
      <input
        type={'phoneNumber'}
        name={'phoneNumber'}
        id={'phoneNumber'}
        value={phoneNumber}
        onChange={handleInputChange('phoneNumber')}
      />
    </form>
  );
};
