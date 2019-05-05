import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder'; // we strip out the connection with redux
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onFetchIngredients={() => {}}/>);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({
      ingredients: { salad: 0 }
    });

    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

  it('should return false if we have 0 ingredients', () => {
    wrapper.setProps({
      ingredients: {
        salad: 0,
        bacon: 0
      }
    });

    expect(wrapper.instance().canPurchase()).toBeFalsy();
  });

  it('should return true if we have more than 0 ingredients', () => {
    wrapper.setProps({
      ingredients: {
        salad: 1,
        bacon: 0
      }
    });

    expect(wrapper.instance().canPurchase()).toBeTruthy();
  });

  it('should set purchasing state to true if authenticated and purchasing', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.instance().state.purchasing).toBeFalsy();
    wrapper.instance().purchaseHandler();
    expect(wrapper.instance().state.purchasing).toBeTruthy();
  });

  it('should redirect to login if is purchasing and is not authenticated', () => {
    wrapper.setProps({ history: [] });

    wrapper.instance().purchaseHandler();
    expect(wrapper.instance().state.purchasing).toBeFalsy();
    expect(wrapper.instance().props.history).toHaveLength(1);
    expect(wrapper.instance().props.history[0].pathname).toEqual('/auth');
    expect(wrapper.instance().props.history[0].search).toEqual('?next=/checkout');

  });

  it('should cancel purchasing', () => {
    wrapper.instance().setState({purchasing: true});
    wrapper.instance().purchaseCancelHandler();
    expect(wrapper.instance().state.purchasing).toBeFalsy();
  });

  it('should continue to checkout', () => {

    const onInitPurchase = jest.fn();
    const history = [];

    wrapper.setProps({ onInitPurchase, history });

    wrapper.instance().purchaseContinueHandler();

    expect(onInitPurchase).toBeCalled();
    expect(wrapper.instance().props.history[0]).toEqual('/checkout');
  });

  it('should display an error when ingredients can\'t be loaded', () => {
    wrapper.setProps({ error: true });
    expect(wrapper.contains(<p style={{textAlign: 'center'}}>Ingredients cant be loaded</p>))
      .toBeTruthy();
  });
});


