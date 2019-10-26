import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { withRouter } from 'react-router';
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
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders} ></Route>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/logout" component={Logout} />
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
}
export default withRouter(connect(null, mapDispatchToProps)(App));
