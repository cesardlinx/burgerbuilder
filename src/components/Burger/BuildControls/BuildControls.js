import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({
    price,
    ingredientAdded,
    ingredientRemoved,
    disabled,
    ordered,
    purchasable,
    isAuthenticated
  }) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>${price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl added={() => ingredientAdded(ctrl.type)}
                      removed={() => ingredientRemoved(ctrl.type)}
                      key={ctrl.type}
                      label={ctrl.label}
                      disabled={disabled[ctrl.type]}/>
      ))}
      <button
        onClick={ordered}
        className={classes.OrderButton}
        disabled={purchasable}>{isAuthenticated ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
    </div>
  )
}

export default BuildControls;
