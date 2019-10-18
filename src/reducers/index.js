import {combineReducers} from 'redux';
import Ingredients from './Ingredients';
import Price from './Price';
import Orders from './Orders';
export default combineReducers({
   ingredients:Ingredients,
   price:Price,
   orders:Orders
});

