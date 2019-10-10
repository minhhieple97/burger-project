import {combineReducers} from 'redux';
import updateIngredient from './updateIngredient';
export default combineReducers({
   ingredient:updateIngredient
});

