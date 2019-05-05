import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Logout } from './Logout';
import { Redirect } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<Logout />', () => {
  it('should execute redux method onLogout ', () => {
    const onLogout = jest.fn();
    const props = { onLogout };
    shallow(<Logout {...props} />);
    expect(onLogout).toHaveBeenCalled()
  });

  it('should should redirect to main page', () => {
    const onLogout = jest.fn();
    const props = { onLogout };
    const wrapper = shallow(<Logout {...props} />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});