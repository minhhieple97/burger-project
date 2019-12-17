import orderReducer from './order';
import burgerReducer from './burgerBuilder';
import authReducer from './auth';
import {combineReducers} from 'redux';
export default combineReducers({
    order: orderReducer,
    burgerBuilder: burgerReducer,
    auth: authReducer
  })