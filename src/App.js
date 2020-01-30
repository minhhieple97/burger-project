import React, { Suspense , useEffect } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { withRouter, Redirect } from 'react-router';
import * as actionTypes from '../src/store/actions';
import { connect } from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner';
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const App = props=> {
   const {onTryAutoSignin,isAuthenticated} = props;
    useEffect(()=>{
      onTryAutoSignin();
    },[onTryAutoSignin])
    let routes = (
      <Switch>
        <Route path="/auth" render={()=><Suspense fallback={<Spinner/>} ><Auth/></Suspense>} ></Route>
        <Route path="/" exact component={BurgerBuilder} ></Route>
        <Redirect to="/" ></Redirect>
      </Switch>
    );
    if (isAuthenticated) routes =  <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/auth" render={()=><Suspense fallback={<Spinner/>} ><Auth/></Suspense>}  ></Route>
          <Route path="/checkout" render={() => <Suspense fallback={<Spinner/>} ><Checkout /></Suspense>}></Route>
          <Route path="/orders" render={() => <Suspense fallback={<Spinner/>} ><Orders /></Suspense>} ></Route>
          <Route path="/logout" render={() => <Suspense fallback={<Spinner/>} ><Logout /></Suspense>} />
        </Switch>;
    return <div>
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actionTypes.authCheckLogin())
  }
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
