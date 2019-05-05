import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Backdrop from './Backdrop';

configure({ adapter: new Adapter() });

describe('<Backdrop />', () => {
  it('should show', () => {
    const wrapper = shallow(<Backdrop />);
    expect(wrapper.find('div')).toHaveLength(0);
    wrapper.setProps({show: true, clicked: () => {}})
    expect(wrapper.find('div')).toHaveLength(1);
  });
});