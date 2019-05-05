import React, { Component } from 'react';
import Order from '../../components//Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class Orders extends Component {

  componentDidMount () {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = this.props.orders.map(order => (
      <Order
        key={order.id}
        price={order.price}
        ingredients={order.ingredients}/>
    ));

    if (this.props.isLoading) {
      orders = <Spinner />
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoadingOrders,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
