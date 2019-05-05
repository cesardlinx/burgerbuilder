import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Aux from './Aux';

configure({ adapter: new Adapter() });

describe('<Aux />', () => {
  it('should render children', () => {
    const wrapper = shallow(<Aux><p>Some text</p></Aux>);
    expect(wrapper.props().children).toEqual('Some text');
  });
});
