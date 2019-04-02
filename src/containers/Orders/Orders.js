import React, { Component } from 'react';
import Order from '../../components//Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

  componentDidMount () {
    this.props.onFetchOrders();
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

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoadingOrders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
