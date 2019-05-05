import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideDrawer from './SideDrawer';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';


configure({ adapter: new Adapter() });

describe('<SideDrawer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SideDrawer />);
  });

  it('should render 1 <Logo />', () => {
    expect(wrapper.find(Logo)).toHaveLength(1);
  });

  it('should contain 1 <NavigationItems />', () => {
    expect(wrapper.find(NavigationItems)).toHaveLength(1);
  });

  it('should contain 1 <BackDrop />', () => {
    expect(wrapper.find(Backdrop)).toHaveLength(1);
  });

  it('should open', () => {
    expect(wrapper.find('div').first().prop('className'))
      .toEqual([classes.SideDrawer, classes.Close].join(' '));
    wrapper.setProps({open: true});
    expect(wrapper.find('div').first().prop('className'))
      .toEqual([classes.SideDrawer, classes.Open].join(' '));
  });
});