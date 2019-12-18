import React, { Suspense , useEffect } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { withRouter, Redirect } from 'react-router';
import * as actionTypes from '../src/store/actions';
import { connect } from 'react-redux';
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const  app = (props)=> {
    useEffect(()=>{
      props.onTryAutoSignin();
    },[ props.onTryAutoSignin])
    let routes = (
      <Switch>
        <Route path="/auth" render={()=><Suspense fallback={<div>Loading...</div>} ><Auth/></Suspense>} ></Route>
        <Route path="/" exact component={BurgerBuilder} ></Route>
        <Redirect to="/" ></Redirect>
      </Switch>
    );
    if (props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/auth" render={()=><Suspense fallback={<div>Loading...</div>} ><Auth/></Suspense>}  ></Route>
          <Route path="/checkout" render={() => <Suspense fallback={<div>Loading...</div>} ><Checkout /></Suspense>}></Route>
          <Route path="/orders" render={() => <Suspense fallback={<div>Loading...</div>} ><Orders /></Suspense>} ></Route>
          <Route path="/logout" render={() => <Suspense fallback={<div>Loading...</div>} ><Logout /></Suspense>} />
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
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actionTypes.authCheckState())
  }
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
