import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem route="/">Burger Builder</NavigationItem>
    <NavigationItem route="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;
