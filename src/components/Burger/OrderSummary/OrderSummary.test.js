import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderSummary from './OrderSummary';

configure({ adapter: new Adapter() });

describe('<OrderSummary />', () => {
  it('should show ingredients summary', () => {
    const props = {
      price: 16.503,
      ingredients: {
        salad: 1,
        bacon: 3,
        meat: 1,
        cheese: 2
      }
    }

    const wrapper = shallow(<OrderSummary {...props}/>);
    expect(wrapper.find('ul li').at(0).text()).toEqual('salad: 1');
    expect(wrapper.find('ul li').at(1).text()).toEqual('bacon: 3');
    expect(wrapper.find('ul li').at(2).text()).toEqual('meat: 1');
    expect(wrapper.find('ul li').at(3).text()).toEqual('cheese: 2');
  });
});