import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Checkout } from './Checkout';
import { Redirect, Route } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<Checkout />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Checkout />);
  });

  it('should contain <CheckoutSummary /> if ingredients and not purchased', () => {
    wrapper.setProps({
      ingredients: { salad: 0 },
      purchased: false,
      match: { path: '/test' }
    })
    expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
    expect(wrapper.find(Route).prop('path')).toEqual('/test/contact-data');
  });

  it('should redirect if no ingredients', () => {
    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).prop('to')).toEqual('/');
  });

  it('should redirect if purchased', () => {
    wrapper.setProps({
      ingredients: { salad: 0 },
      purchased: true,
      match: { path: '/test' }
    })
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should execute history.goBack on checkout cancel', () => {
    const goBack = jest.fn();
    wrapper.setProps({
      ingredients: { salad: 0 },
      purchased: false,
      match: { path: '/test' },
      history: { goBack }
    })
    wrapper.find(CheckoutSummary).prop('onCheckoutCancelled')();
    expect(goBack).toHaveBeenCalled();
  });

  it('should execute history.replace on checkout continue', () => {
    const replace = jest.fn();
    wrapper.setProps({
      ingredients: { salad: 0 },
      purchased: false,
      match: { path: '/test' },
      history: { replace }
    })
    wrapper.find(CheckoutSummary).prop('checkoutContinued')();
    expect(replace).toHaveBeenCalledWith('/checkout/contact-data');
  });

});