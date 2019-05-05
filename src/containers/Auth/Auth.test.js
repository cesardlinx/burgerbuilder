import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Auth } from './Auth';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<Auth />', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      error: '',
      isLoading: false,
      isAuthenticated: false,
      errors: {
        email: '',
        password: ''
      },
      values: {
        email: '',
        password: ''
      },
      touched: {
        email: false,
        password: false
      }
    }
    wrapper = shallow(<Auth {...props} />);
  });

  it('should switch to signin form when clicked on button switch to signin', () => {
    expect(wrapper.instance().state.isSignup).toBeTruthy();
    expect(wrapper.find({ btnType: 'Danger' }).prop('children')).toEqual(["SWITCH TO ", "SIGNIN"]);
    wrapper.find({ btnType: 'Danger' }).prop('clicked')(); // execute click
    expect(wrapper.instance().state.isSignup).toBeFalsy();
    expect(wrapper.find({ btnType: 'Danger' }).prop('children')).toEqual(["SWITCH TO ", "SIGNUP"]);
  });

  it('should render an error if has error and has been touched', () => {
    wrapper.setProps({
      errors: {
        email: 'Required',
        password: ''
      },
      touched: {
        email: true,
        password: false
      }
    });
    expect(wrapper.find('span').first().text()).toEqual('Required');
    expect(wrapper.find('span').first().prop('style')).toEqual({
      textAlign: 'left',
      color: 'rgb(209, 40, 40)',
      marginLeft: '.9em'
    });
  });

  it('should render a <Spinner /> if loading', () => {
    expect(wrapper.find(Spinner)).toHaveLength(0);
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('should redirect if it is authenticated and have a redirection route', () => {
    wrapper.setProps({ isAuthenticated: true, location: { search: '?next="/checkout"' } });
    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).prop('to')).toEqual('"/checkout"');
  });

  it('should redirect if it is authenticated and have a redirection route', () => {
    wrapper.setProps({ isAuthenticated: true, location: { search: '' } });
    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).prop('to')).toEqual('/');
  });

  it('should render 2 <Input /> s', () => {
    expect(wrapper.find(Input)).toHaveLength(2);
  });

  it('should validate the inputs an execute onAuth method if valid',  () => {
    const onAuth = jest.fn()
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.setProps({
      onAuth,
      values: {
        email: 'tester@tester.com',
        password: 'Admin123'
      },
    });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should execute onAuth in case values are valid', () => {
    const onAuth = jest.fn()
    wrapper.setProps({
      onAuth,
      values: {
        email: 'tester@tester.com',
        password: 'Admin123'
      },
    });

    wrapper.instance().handleSubmit({ preventDefault: () => {} }).then(() => {
      expect(onAuth).toHaveBeenCalled();
    });
  });

  it('should not execute onAuth in case values are not valid', () => {
    const onAuth = jest.fn()
    const onAuthFail = jest.fn()
    wrapper.setProps({
      onAuth,
      onAuthFail,
      values: {
        email: 'tester',
        password: ''
      },
    });

    wrapper.instance().handleSubmit({ preventDefault: () => {} }).then(() => {
      expect(onAuth).not.toHaveBeenCalled();
      expect(onAuthFail).toHaveBeenCalled();
    });
  });


});