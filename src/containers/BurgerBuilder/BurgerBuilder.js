import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false
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

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    } // { salad: true, meat.false, ....}

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={!this.state.purchasable}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
