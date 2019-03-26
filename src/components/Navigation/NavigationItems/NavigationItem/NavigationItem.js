import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';


const NavigationItem = ({ route, children }) => (
  <li className="NavigationItem">
    <NavLink to={route} exact>{children}</NavLink>
  </li>
);

export default NavigationItem;
