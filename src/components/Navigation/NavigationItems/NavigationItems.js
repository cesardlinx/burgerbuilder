import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import AuthContext from '../../../contexts/AuthContext';

const NavigationItems = (props) => (
  <AuthContext.Consumer>
    {({ isAuthenticated }) => (
      <ul className={classes.NavigationItems}>
        <NavigationItem route="/" exact>Burger Builder</NavigationItem>
        <NavigationItem route="/orders">Orders</NavigationItem>
        {isAuthenticated
          ? <NavigationItem route="/logout">Logout</NavigationItem>
          : <NavigationItem route="/auth">Sign Up/Sign In</NavigationItem>}
      </ul>
    )}
  </AuthContext.Consumer>
);

export default NavigationItems;
