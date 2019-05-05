import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControl from './BuildControl';

configure({ adapter: new Adapter() });

describe('<BuildControl />', () => {
  it('should render', () => {
    const wrapper = shallow(<BuildControl />);
    expect(wrapper).toMatchSnapshot();
  });
});