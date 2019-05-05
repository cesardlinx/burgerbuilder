import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import classes from './Input.module.css';
import Input from './Input';

configure({ adapter: new Adapter() });

describe('<Input />', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Input />);
  });

  it('should render a select', () => {
    wrapper.setProps({
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'first', displayValue: 'test'}
        ]
      }

    });
    expect(wrapper.find('select').find('option').prop('value')).toEqual('first');
  });

  it('should render a text input', () => {
    wrapper.setProps({
      elementType: 'input',
      value: 'test'
    });
    expect(wrapper.find('input').prop('value')).toEqual('test');
  });

  it('should render a text textarea', () => {
    wrapper.setProps({
      elementType: 'textarea',
      value: 'test'
    });
    expect(wrapper.find('textarea').prop('value')).toEqual('test');
  });

  it('should add class invalid when invalid and touched', () => {
    wrapper.setProps({
      elementType: 'input',
      invalid: true,
      shouldValidate: true,
      touched: true
    });
    expect(wrapper.find('input').prop('className')).toEqual([classes.InputElement, classes.Invalid].join(' '));
  });

});