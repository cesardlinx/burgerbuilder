import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null
      };

      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({
          error: null
        });
        return request;
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({
          error
        });
      });
    }

    componentWillUnmount() {
      // Removing old interceptors
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {this.setState({error: null})}

    render () {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
};

export default withErrorHandler;
