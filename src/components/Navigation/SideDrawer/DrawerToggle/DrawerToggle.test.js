import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DrawerToggle from './DrawerToggle';

configure({ adapter: new Adapter() });

describe('<DrawerToggle />', () => {
  it('should render', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<DrawerToggle clicked={onClick}/>);
    wrapper.simulate('click');
    expect(onClick).toBeCalled()
  });
});