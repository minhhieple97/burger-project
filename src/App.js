import React, { Component,Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
import { withRouter , Redirect } from 'react-router';
import * as actionTypes from '../src/store/actions';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from '../src/components/UI/Spinner/Spinner';
import asyncComponent from './hoc/asyncComponent';
const asyncCheckout = asyncComponent(()=>import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(()=>import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(()=>import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}  ></Route>
        <Route path="/" exact component={BurgerBuilder} ></Route>
        <Redirect to="/" ></Redirect>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/auth" component={asyncAuth}  ></Route>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/orders" component={asyncOrders} ></Route>
          <Route path="/logout" component={Logout} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Switch>
           {routes}
          </Switch>
        </Layout>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionTypes.authCheckState())
  }
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
