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

  const itRendersALabel = (fieldName, value) =>
    it('renders a lable', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(value);
    });

  const itAssignsAnIdThatMatchesTheLabelID = (fieldName) =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSavesExistingValue = (fieldName) =>
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={(args) => {
            expect(args[fieldName]).toEqual('existingValue');
          }}
        />
      );

      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  const itSavesNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={(args) => {
            expect(args[fieldName]).toEqual(value);
          }}
        />
      );

      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value },
      });

      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  // Tests

  it('renders a form', () => {
    render(<CustomerForm />);

    expect(form('customer')).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelID('firstName');
    itSavesExistingValue('firstName');
    itSavesNewValue('firstName', 'Jamie');
  });
});
