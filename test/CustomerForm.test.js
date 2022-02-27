import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  // Queries
  const form = (id) => container.querySelector(`form[id="${id}"]`);

  const firstNameField = () => form('customer').elements.firstName;

  const labelFor = (formElement) =>
    container.querySelector(`label[for="${formElement}"]`);

  // Expect groups
  const expectToBeInputOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  it('renders a form', () => {
    render(<CustomerForm />);

    expect(form('customer')).not.toBeNull();
  });

  it('renders the first name field as a text box', () => {
    render(<CustomerForm />);
    expectToBeInputOfTypeText(firstNameField());
  });

  it('renders the existing value for first name', () => {
    render(<CustomerForm firstName={'Ashley'} />);
    expect(firstNameField().value).toEqual('Ashley');
  });

  it('renders a lable for the first name field', () => {
    render(<CustomerForm />);
    expect(labelFor('firstName')).not.toBeNull();
    expect(labelFor('firstName').textContent).toEqual(
      'First name'
    );
  });

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm />);
    expect(firstNameField().id).toEqual('firstName');
  });
});
