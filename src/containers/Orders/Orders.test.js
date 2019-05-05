import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Order from '../../components//Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Orders } from './Orders';

configure({ adapter: new Adapter() });

describe('<Orders />', () => {
  let wrapper, onFetchOrders, token, userId, orders;
  beforeEach(() => {
    token = 'mytoken';
    userId = 'userId';
    orders = [
      {
        id: '123456',
        price: 16.05,
        ingredients: { salad: 1 }
      },
      {
        id: '123457',
        price: 17.05,
        ingredients: { meat: 3 }
      }
    ];

    onFetchOrders = jest.fn();

    const props = {
      onFetchOrders,
      token,
      userId,
      orders
    }
    wrapper = shallow(<Orders {...props} />);
  });

  it('should call onFetchOrders when mounting component', () => {
    expect(onFetchOrders).toHaveBeenCalledWith(token, userId);
  });

  it('should render orders', () => {
    expect(wrapper.find(Order)).toHaveLength(2);
  });

  it('should render a spinner if loading', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});