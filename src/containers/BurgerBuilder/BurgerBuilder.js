import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    isLoading: false,
    error: null
  }

  componentDidMount () {
    axios.get('ingredients.json').then(
      response => {
        this.setState({ingredients: response.data});
      }
    ).catch(error => {this.setState({error})});
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

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }

    queryParams.push(`price=${encodeURIComponent(this.state.totalPrice)}`);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }


  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    } // { salad: true, meat.false, ....}

    let orderSummary = null;

    // Burger Section

    let burgerSection = (
      this.state.error
      ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded</p>
      : <Spinner />
    );

    if (this.state.ingredients) {
      burgerSection = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>,
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={!this.state.purchasable}/>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}/>
      );

    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burgerSection}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
