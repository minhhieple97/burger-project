import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import reducers from './store/reducer';
import reducers from './store/reducers/burgerBuilder';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import orderReducer from './store/reducers/order';
import burgerReducer from './store/reducers/burgerBuilder';
const rootReducer = combineReducers({
  order: orderReducer,
  burgerBuilder: burgerReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const app = (
  <Router>
    <App></App>
  </Router>
)
// const logger = store => {
//   return next =>{
//     return action =>{
//       console.log('[Middleware] Dispatching',action);
//       const result = next(action);
//       console.log('[Middleware next state]',store.getState());
//       return result;
//     }
//   }
// }
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App></App>
    </Router>
  </Provider>,
  document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
