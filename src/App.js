import React, { Component, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onAuthCheckState();
  }

  render() {

    const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
    const Auth = React.lazy(() => import('./containers/Auth/Auth'));
    const Orders = React.lazy(() => import('./containers/Orders/Orders'));

    let routes = (
      <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <Auth />
              </Suspense>
            )} />
          <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <Auth />
              </Suspense>
            )} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <Orders />
              </Suspense>
            )} />
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <Checkout />
              </Suspense>
            )} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
