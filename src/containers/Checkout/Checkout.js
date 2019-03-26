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
    },
    totalPrice: 0
  }

  componentDidMount () {
     const queryParams = new URLSearchParams(this.props.location.search);
     const salad = parseInt(queryParams.get('salad'));
     const meat = parseInt(queryParams.get('meat'));
     const bacon = parseInt(queryParams.get('bacon'));
     const cheese = parseInt(queryParams.get('cheese'));
     const totalPrice = parseFloat(queryParams.get('totalPrice'));

     this.setState({ ingredients: { salad, meat, bacon, cheese }, totalPrice });
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
          // component={ContactData}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice} />
          )} />
      </div>
    );
  }
}

export default Checkout;
