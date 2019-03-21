import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {this.setState({showSideDrawer: false})}

  toggleMenuHandler = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  }

  render() {
    return (
      <Aux>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <Toolbar toggleMenu={this.toggleMenuHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;