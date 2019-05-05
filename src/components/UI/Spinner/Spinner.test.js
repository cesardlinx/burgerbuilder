import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import classes from './Spinner.module.css';
import Spinner from './Spinner';

configure({ adapter: new Adapter() });

describe('<Spinner />', () => {
  it('should render', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.contains( <div className={classes.Spinner}></div>)).toBeTruthy();
  });
});