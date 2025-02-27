import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const Toolbar = ({ toggleMenu, isAuthenticated }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={toggleMenu}/>
      <Logo height="80%"/>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuthenticated}/>
      </nav>
    </header>
  );
};

export default Toolbar;
