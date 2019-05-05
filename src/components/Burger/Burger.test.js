import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Burger } from './Burger';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

configure({ adapter: new Adapter() });

describe('<Burger />', () => {
  it('should render ingredients', () => {
    const ingredients = {
      salad: 1,
      bacon: 3,
      meat: 1,
      cheese: 2
    };
    const wrapper = shallow(<Burger ingredients={ingredients}/>);

    expect(wrapper.find(BurgerIngredient)).toHaveLength(9);

    expect(wrapper.find({ type: 'salad' })).toHaveLength(1);
    expect(wrapper.find({ type: 'bacon' })).toHaveLength(3);
    expect(wrapper.find({ type: 'meat' })).toHaveLength(1);
    expect(wrapper.find({ type: 'cheese' })).toHaveLength(2);
  });

  it('should render message when no ingredients', () => {
    const ingredients = {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
    };
    const wrapper = shallow(<Burger ingredients={ingredients}/>);
    expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
    expect(wrapper.find('p').text()).toEqual('Please start adding ingredients.')
  });
});