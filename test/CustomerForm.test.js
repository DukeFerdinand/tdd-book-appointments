import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  // Queries
  const form = (id) => container.querySelector(`form[id="${id}"]`);

  const field = (name) => form('customer').elements[name];

  const labelFor = (formElement) =>
    container.querySelector(`label[for="${formElement}"]`);

  // Expect groups
  const expectToBeInputOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });

  // Tests

  it('renders a form', () => {
    render(<CustomerForm />);

    expect(form('customer')).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');

    it('renders a lable', () => {
      render(<CustomerForm />);
      expect(labelFor('firstName')).not.toBeNull();
      expect(labelFor('firstName').textContent).toEqual(
        'First name'
      );
    });

    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field('firstName').id).toEqual('firstName');
    });

    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          firstName={'Ashley'}
          onSubmit={({ firstName }) => {
            expect(firstName).toEqual('Ashley');
          }}
        />
      );

      await ReactTestUtils.Simulate.submit(form('customer'));
    });

    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          firstName={'Ashley'}
          onSubmit={({ firstName }) => {
            expect(firstName).toEqual('Jamie');
          }}
        />
      );

      await ReactTestUtils.Simulate.change(field('firstName'), {
        target: { value: 'Jamie' },
      });

      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  });
});
