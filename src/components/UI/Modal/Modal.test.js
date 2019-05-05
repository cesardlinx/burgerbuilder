import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Backdrop from '../Backdrop/Backdrop';
import Modal from './Modal';

configure({ adapter: new Adapter() });

describe('<Modal />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Modal><p>Test</p></Modal>);
  });
  it('should render children', () => {
    expect(wrapper.instance().props.children).toEqual(<p>Test</p>);
  });

  it('should pass show prop to <Backdrop />', () => {
    wrapper.setProps({ show: true });
    expect(wrapper.find(Backdrop).prop('show')).toBeTruthy();
  });

  it('should update component />', () => {
    const nextProps = {
      children: (<p>Updated Modal</p>)
    };
    expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBeTruthy();

  });


});