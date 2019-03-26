import React from 'react';
import Burger from '../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '..//UI/Button/Button';

const CheckoutSummary = ({ ingredients, onCheckoutCancelled, checkoutContinued }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={ingredients}/>
        <Button btnType="Danger"
                clicked={onCheckoutCancelled}>CANCEL</Button>
        <Button btnType="Success"
                clicked={checkoutContinued}>SUCCESS</Button>
      </div>

    </div>
  );
};


export default CheckoutSummary;
