import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';


const NavigationItem = ({ route, children }) => (
  <li className={classes.NavigationItem}>
    <NavLink to={route} exact>{children}</NavLink>
  </li>
);

export default NavigationItem;
