import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import axios from '../../../axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        rules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig:{
          type: 'email',
          placeholder: 'Your e-Mail'
        },
        value: '',
        rules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        rules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        rules: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        rules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig:{
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'cheapest', //  Default value
        valid: true,
        touched: false,
      },
    },
    isFormValid: false,
  }

  checkValidation (value, rules) {

    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {...this.state.orderForm}; // not deeply clone, just clones the attributes
    const updatedFormElement = {...updatedOrderForm[inputId]}; // Cloned deeply

    updatedFormElement.value = event.target.value;

    const validationResult = this.checkValidation(updatedFormElement.value, updatedFormElement.rules);
    updatedFormElement.valid = validationResult.isValid;

    updatedFormElement.touched = true;

    updatedOrderForm[inputId] = updatedFormElement;


    let isFormValid = true;
    for (const inputId in updatedOrderForm) {
      /* istanbul ignore else */
      if (updatedOrderForm.hasOwnProperty(inputId)) {
        const element = updatedOrderForm[inputId];
        isFormValid = element.valid && isFormValid;
      }
    }

    this.setState({orderForm: updatedOrderForm, isFormValid });
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (const elementId in this.state.orderForm) {
      /* istanbul ignore else */
      if (this.state.orderForm.hasOwnProperty(elementId)) {
        formData[elementId] = this.state.orderForm[elementId].value;
      }
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  }


  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      /* istanbul ignore else */
      if (this.state.orderForm.hasOwnProperty(key)) {
        const element = this.state.orderForm[key];
        formElementsArray.push({
          id: key,
          config: element
        })
      }
    }

    let form = (

      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            changed={e => this.inputChangedHandler(e, id)}
            invalid={!config.valid}
            shouldValidate={config.rules}
            touched={config.touched}/>
        ))}
        <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
      </form>
    );

    if (this.props.isLoading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoadingOrders,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
