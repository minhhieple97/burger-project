import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { withRouter , Redirect } from 'react-router';
import * as actionTypes from '../src/store/actions';
import { connect } from 'react-redux';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}  ></Route>
        <Route path="/" exact component={BurgerBuilder} ></Route>
        <Redirect to="/" ></Redirect>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/auth" component={Auth}  ></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders} ></Route>
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
