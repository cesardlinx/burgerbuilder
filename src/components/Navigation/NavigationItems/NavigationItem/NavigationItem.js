import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';


const NavigationItem = ({ route, children, exact }) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={route}
      activeClassName={classes.active}
      exact={exact}>{children}</NavLink>
  </li>
);

export default NavigationItem;
