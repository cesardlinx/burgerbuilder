import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = ({ isAuthenticated, closeSideDrawer }) => (
  <ul
    className={classes.NavigationItems}
    onClick={closeSideDrawer}>
    <NavigationItem route="/" exact>Burger Builder</NavigationItem>
    {isAuthenticated && <NavigationItem route="/orders">Orders</NavigationItem>}
    {isAuthenticated
      ? <NavigationItem route="/logout">Logout</NavigationItem>
      : <NavigationItem route="/auth">Sign Up/Sign In</NavigationItem>}
  </ul>
);

export default NavigationItems;
