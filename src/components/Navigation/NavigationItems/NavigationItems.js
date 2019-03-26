import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem route="/" exact>Burger Builder</NavigationItem>
    <NavigationItem route="/orders">Orders</NavigationItem>
  </ul>
);

export default NavigationItems;
