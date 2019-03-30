import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
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
        errorMessages: []
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
        errorMessages: []
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
        errorMessages: []
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
        errorMessages: []
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
        errorMessages: []
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
        errorMessages: []
      },
    },
    isFormValid: false,
    isLoading: false
  }

  checkValidation (value, rules) {

    let isValid = true;
    let errorMessages = [];

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;

      if (!(value.trim() !== '')) {

        errorMessages.push('This field is required.');
      }
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;

      if (!(value.length >= rules.minLength)) {

        errorMessages.push(`This field has a minimum length of ${rules.minLength}`);
      }
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;

      if (!(value.length <= rules.maxLength)) {

        errorMessages.push(`This field has a maximum length of ${rules.minLength}`);
      }
    }

    const result = { isValid, errorMessages };
    return result;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {...this.state.orderForm}; // not deeply clone, just clones the attributes
    const updatedFormElement = {...updatedOrderForm[inputId]}; // Cloned deeply
    updatedFormElement.value = event.target.value;

    const validationResult = this.checkValidation(updatedFormElement.value, updatedFormElement.rules);
    updatedFormElement.valid = validationResult.isValid;
    updatedFormElement.errorMessages = validationResult.errorMessages;

    updatedFormElement.touched = true;

    updatedOrderForm[inputId] = updatedFormElement;


    let isFormValid = true;
    for (const inputId in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(inputId)) {
        const element = updatedOrderForm[inputId];
        isFormValid = element.valid && isFormValid;
      }
    }

    this.setState({orderForm: updatedOrderForm, isFormValid });
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({isLoading: true});

    const formData = {};

    for (const elementId in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(elementId)) {
        formData[elementId] = this.state.orderForm[elementId].value;
      }
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    axios.post('/orders.json', order).then(
      response => {
        this.setState({isLoading: false});
        this.props.history.replace('/');
      }
    ).catch(
      error => {
        this.setState({isLoading: false});
      }
    );
  }


  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
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
            touched={config.touched}
            errorMessages={config.errorMessages}/>
        ))}
        <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
      </form>
    );

    if (this.state.isLoading) {
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

export default withRouter(ContactData);
