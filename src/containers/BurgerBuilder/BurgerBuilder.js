import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount () {  // CARGA DE INGREDIENTES
    this.props.onFetchIngredients()
  }

  updatePurchaseState = () => {
    const totalIngredients = Object.values({...this.props.ingredients})
      .reduce((sum, el) => sum + el);

    if (totalIngredients < 1) {
      return false;
    }

    return true;
  }

  purchaseHandler = () => {this.setState({purchasing: true})}
  purchaseCancelHandler = () => {this.setState({purchasing: false})}

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }


  render() {
    const disabledInfo = { ...this.props.ingredients };

    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    } // { salad: true, meat: false, ....}

    let orderSummary = null;

    // Burger Section

    let burgerSection = (
      this.props.error
      ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded</p>
      : <Spinner />
    );

    if (this.props.ingredients) {
      burgerSection = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>,
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={!this.updatePurchaseState()}/>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ingredients}/>
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingType) => dispatch(actions.addIngredient(ingType)),
    onRemoveIngredient: (ingType) => dispatch(actions.removeIngredient(ingType)),
    onFetchIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
