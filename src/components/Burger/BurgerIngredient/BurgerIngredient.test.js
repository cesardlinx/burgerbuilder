import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BurgerIngredient from './BurgerIngredient';
import classes from './BurgerIngredient.module.css';

configure({ adapter: new Adapter() });

describe('<BurgerIngredient />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerIngredient />);
  });

  it('should render a bread bottom', () => {
    wrapper.setProps({ type: 'bread-bottom' })
    expect(wrapper.find('div').prop('className')).toEqual(classes.BreadBottom);
  });

  it('should render a bread top', () => {
    wrapper.setProps({ type: 'bread-top' })
    expect(wrapper.find('div').first().prop('className')).toEqual(classes.BreadTop);
  });

  it('should render meat', () => {
    wrapper.setProps({ type: 'meat' })
    expect(wrapper.find('div').prop('className')).toEqual(classes.Meat);
  });

  it('should render bacon', () => {
    wrapper.setProps({ type: 'bacon' })
    expect(wrapper.find('div').prop('className')).toEqual(classes.Bacon);
  });

  it('should render cheese', () => {
    wrapper.setProps({ type: 'cheese' })
    expect(wrapper.find('div').prop('className')).toEqual(classes.Cheese);
  });

  it('should render salad', () => {
    wrapper.setProps({ type: 'salad' })
    expect(wrapper.find('div').prop('className')).toEqual(classes.Salad);
  });

});