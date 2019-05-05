import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom'

export class Logout extends Component {

  componentDidMount () {
    this.props.onLogout();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);
