import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { ContactData } from './ContactData';

configure({ adapter: new Adapter() });

describe('<ContactData />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ContactData />);
  });

  test('checkValidation method should return true if no rules', () => {
    expect(wrapper.instance().checkValidation('test')).toBeTruthy();
  });

  test('checkValidation method should return false if no value and the field is required ', () => {
    expect(wrapper.instance().checkValidation('', { required: true }))
      .toBeFalsy();
  });

  test('checkValidation method should return false if value < minLength ', () => {
    expect(wrapper.instance().checkValidation('test', { minLength: 5 }))
      .toBeFalsy();
  });

  test('checkValidation method should return false if value > maxLength ', () => {
    expect(wrapper.instance().checkValidation('test', { maxLength: 3 }))
      .toBeFalsy();
  });

  test('checkValidation method should return false if value < minLength and required ', () => {
    expect(wrapper.instance().checkValidation('test', { required: true, minLength: 5 }))
      .toBeFalsy();
  });

  test('checkValidation method should return false if value > maxLength and required ', () => {
    expect(wrapper.instance().checkValidation('test', { required: true, maxLength: 3 }))
      .toBeFalsy();
  });

  it('should change the value in state when input change', () => {
    // wrapper.instance().inputChangedHandler({ target: { value: 'My new value' } }, 'name')
    wrapper.find(Input).first().prop('changed')({ target: { value: 'My new value' } }, 'name');
    expect(wrapper.instance().state.orderForm.name.value).toEqual('My new value');
  });

  it('should call onOrderBurger with the order and the auth token, when order submit', () => {
    const onOrderBurger = jest.fn();
    wrapper.setProps({
      onOrderBurger,
      token: 'mytoken',
      ingredients: {
        salad: 1
      },
      userId: 'myuserid',
      totalPrice: 15.60
    });

    const order = {
      ingredients: { salad: 1 },
      price: 15.60,
      orderData: {
        name: '',
        email: '',
        street: '',
        zipCode: '',
        country: '',
        deliveryMethod: 'cheapest'
      },
      userId: 'myuserid'
    };

    wrapper.find('form').simulate('submit', { preventDefault: () => {} } );
    expect(onOrderBurger).toBeCalledWith(order, 'mytoken');
  });

  it('should show a spinner when loading', () => {
    expect(wrapper.find(Spinner)).toHaveLength(0);

    wrapper.setProps({
      isLoading: true
    })
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});