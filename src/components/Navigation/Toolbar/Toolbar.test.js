import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Toolbar from './Toolbar';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

configure({ adapter: new Adapter() });

describe('<Toolbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Toolbar />);
  });

  it('should contain a <Logo />', () => {
    expect(wrapper.find(Logo)).toHaveLength(1);
  });

  it('should contain a <NavigationItems />', () => {
    expect(wrapper.find(NavigationItems)).toHaveLength(1);
  });

  it('should contain a <DrawerToggle />', () => {
    expect(wrapper.find(DrawerToggle)).toHaveLength(1);
  });

});