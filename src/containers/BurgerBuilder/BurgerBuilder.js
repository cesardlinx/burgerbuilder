import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    isLoading: false
  }

  updatePurchaseState = () => {
    const totalIngredients = Object.values({...this.state.ingredients})
      .reduce((sum, el) => sum + el);

    if (totalIngredients < 1) {
      return this.setState({purchasable: false});
    }

    return this.setState({purchasable: true});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    this.setState(prevState => ({
      ingredients: updatedIngredients,
      totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
    }), this.updatePurchaseState);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    let updatedCount;

    if (oldCount) {
      updatedCount = oldCount - 1;
    } else {
      updatedCount = oldCount;
    }

    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    this.setState(prevState => ({
      ingredients: updatedIngredients,
      totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
    }), this.updatePurchaseState);

  }

  purchaseHandler = () => {this.setState({purchasing: true})}
  purchaseCancelHandler = () => {this.setState({purchasing: false})}

  purchaseContinueHandler = () => {
    this.setState({isLoading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'David Padilla',
        address: {
          street: 'Test Street 1',
          zipCode: '123556',
          country: 'Ecuador'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order).then(
      response => {
        this.setState({isLoading: false, purchasing: false});
      }
    ).catch(
      error => {
        this.setState({isLoading: false, purchasing: false});
      }
    );
  }


  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    } // { salad: true, meat.false, ....}

    let orderSummary = (
      <OrderSummary
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}/>
    );

    if (this.state.isLoading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ordered={this.purchaseHandler}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={!this.state.purchasable}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
