import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Logo from './Logo';
import burgerLogo from '../../assets/images/burger-logo.png';

configure({ adapter: new Adapter() });

describe('<Logo />', () => {
  it('should render image logo', () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.find('img').prop('src')).toEqual(burgerLogo);
  });
});

