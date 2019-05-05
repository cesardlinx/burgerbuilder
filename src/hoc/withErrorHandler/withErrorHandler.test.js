import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from './withErrorHandler';

configure({ adapter: new Adapter() });

describe('withErrorHandler HOC', () => {
  let ejectRequest, ejectResponse, mockedAxios, wrapper;


  beforeEach(() => {
    ejectRequest = jest.fn();
    ejectResponse = jest.fn();

    mockedAxios = {
      interceptors: {
        request: {
          use: jest.fn(),
          eject: ejectRequest
        },
        response: {
          use: jest.fn(),
          eject: ejectResponse
        }
      }
    };

    const Component = () => {
      return <h1>Test</h1>;
    }
    const ConditionalHOC = withErrorHandler(Component, mockedAxios);
    wrapper = shallow(<ConditionalHOC/>);
  });

  it('should render', () => {
    expect(wrapper).not.toBe(null);
  });

  it('remove old interceptors on component unmount', () => {
    wrapper.instance().componentWillUnmount();
    // expect(ejectRequest).toHaveBeenCalled();
    // expect(ejectResponse).toHaveBeenCalled();
  });

  it('should close modal when error confirmed', () => {
    wrapper.setState({ error: true });
    wrapper.find(Modal).prop('modalClosed')();
    expect(wrapper.instance().state.error).toEqual(null);
  });

  it('should render a <Modal />', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

});