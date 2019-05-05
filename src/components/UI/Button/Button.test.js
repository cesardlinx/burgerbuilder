import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

configure({adapter: new Adapter()});

describe('<Button />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Button></Button>);
    expect(wrapper).toMatchSnapshot();
  });
  it('should attach an onclick handler in', () => {
    const wrapper = shallow(<Button clicked={() => {}}></Button>);
    expect(wrapper).toMatchSnapshot();
  });
});