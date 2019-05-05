import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckoutSummary from './CheckoutSummary';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';


configure({ adapter: new Adapter() });

describe('<CheckoutSummary />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CheckoutSummary />);
  });

  it('should render the burger', () => {
    expect(wrapper.find(Burger)).toHaveLength(1);
  });

  it('should render success button', () => {
    expect(wrapper.find(Button).last().prop('btnType')).toEqual('Success');
    expect(wrapper.find(Button).last().prop('children')).toEqual('SUCCESS');
  });

  it('should render danger button', () => {
    expect(wrapper.find(Button).first().prop('btnType')).toEqual('Danger');
    expect(wrapper.find(Button).first().prop('children')).toEqual('CANCEL');
  });

});