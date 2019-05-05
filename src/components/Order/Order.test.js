import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Order from './Order';

configure({ adapter: new Adapter() });

describe('<Order />', () => {

  it('should render the price', () => {
    const wrapper = shallow(<Order price={16.503}/>);
    expect(wrapper.find('p').last().text()).toEqual('Price: $16.50');
  });

  it('should render the price', () => {
    const props = {
      price: 16.503,
      ingredients: {
        salad: 1,
        bacon: 3,
        meat: 1,
        cheese: 2
      }
    }

    const wrapper = shallow(<Order {...props}/>);
    expect(wrapper.find('p').first().text()).toEqual('Ingredients: salad 1bacon 3meat 1cheese 2');
  });


});