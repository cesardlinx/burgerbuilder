import React from 'react';
import classes from './Order.module.css';

const Order = ({ price, ingredients }) => {

  let ingredientsArray = [];

  for (const key in ingredients) {
    /* istanbul ignore else  */
    if (ingredients.hasOwnProperty(key)) {
      const ingredient = {
        name: key,
        ammount: ingredients[key]
      };
      ingredientsArray.push(ingredient);
    }
  }

  const ingredientsOutput = ingredientsArray.map(ig => (
    <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}>{ig.name} {ig.ammount}</span>
  ));


  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>${price.toFixed(2)}</strong></p>
    </div>
  );

};

export default Order;
