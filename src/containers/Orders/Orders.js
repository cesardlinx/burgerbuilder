import React, { Component } from 'react';
import Order from '../../components//Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  state = {
    orders: [],
    isLoading: false
  }

  componentDidMount () {
    this.setState({isLoading: true});

    axios.get('/orders.json').then(
      response => {

        const fetchedOrders = []
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const order = response.data[key];
            fetchedOrders.push({
              ...order,
              id: key
            });
          }
        }

        this.setState({
          orders: fetchedOrders,
          isLoading: false
        })
      }
    ).catch(
      err => {
        this.setState({isLoading: false});
      }
    );
  }

  render() {
    let orders = this.state.orders.map(order => (
      <Order
        key={order.id}
        price={order.price}
        ingredients={order.ingredients}/>
    ));

    if (this.state.isLoading) {
      orders = <Spinner />
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
