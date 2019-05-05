import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from './BuildControls';
import BuildControl from './BuildControl/BuildControl';

configure({ adapter: new Adapter() });

describe('<BuildControls />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BuildControls price={16.504} disabled={false}/>);
  });

  it('should render 4 build controls', () => {
    expect(wrapper.find(BuildControl)).toHaveLength(4);
  });

  it('should have the prop ingredientAdded', () => {
      const ingredientAdded = jest.fn();

      const props = {
        price: 16.504,
        disabled: false,
        ingredientAdded,
      };

      wrapper = shallow(<BuildControls {...props}/>);
      wrapper.find(BuildControl).first().getElement().props.added();
      expect(ingredientAdded).toBeCalled();
  });

  it('should have the prop ingredientRemoved', () => {
      const ingredientRemoved = jest.fn();

      const props = {
        price: 16.504,
        disabled: false,
        ingredientRemoved
      };

      wrapper = shallow(<BuildControls {...props}/>);
      wrapper.find(BuildControl).first().getElement().props.removed();
      expect(ingredientRemoved).toBeCalled();
  });

  it('should change button label when authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find('button').text()).toEqual('ORDER NOW');
  });
});