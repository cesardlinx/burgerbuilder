import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Layout } from './Layout';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

configure({ adapter: new Adapter() });

describe('<Layout />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Layout><p>Some text</p></Layout>);
  });

  it('should render the children', () => {
    expect(wrapper.instance().props.children).toEqual(<p>Some text</p>);
  });

  it('should contain a <Toolbar /> y a <SideDrawer />', () => {
    expect(wrapper.find(Toolbar)).toHaveLength(1);
    expect(wrapper.find(SideDrawer)).toHaveLength(1);
  });

  it('should open SideDrawer when calling toggleMenuHandler', () => {
    wrapper.find(Toolbar).prop('toggleMenu')();
    expect(wrapper.instance().state.showSideDrawer).toBeTruthy();
  });

  it('should close SideDrawer when calling sideDrawerClosedHandler', () => {
    wrapper.setState({
      showSideDrawer: true
    })
    wrapper.find(SideDrawer).prop('closed')();
    expect(wrapper.instance().state.showSideDrawer).toBeFalsy();
  });
});