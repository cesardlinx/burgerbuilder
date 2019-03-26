import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    }
  }

  componentDidMount () {
     const queryParams = new URLSearchParams(this.props.location.search);
     const salad = parseInt(queryParams.get('salad'));
     const meat = parseInt(queryParams.get('meat'));
     const bacon = parseInt(queryParams.get('bacon'));
     const cheese = parseInt(queryParams.get('cheese'));

     this.setState({ ingredients: { salad, meat, bacon, cheese } });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}/>
      </div>
    );
  }
}

export default Checkout;
