import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/utilly';
import { fetchOrdersFailed } from '../actions/order';
const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building:false
}
const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.payload]: state.ingredients[action.payload] + 1
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload],
    building:true
  };
  return updateObject(state, updateState);
};
const removeIngredient = (state,action)=>{
  const updateIng = {
    [action.payload]: state.ingredients[action.payload] - 1
  };
  const updateIngs = updateObject(state.ingredients, updateIng);
  const updateSt = {
    ingredients: updateIngs,
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload],
    building:true
  };
  return updateObject(state,updateSt);
};
const fecthIngredient = (state,action)=>{
  return {
    ...state,
    ingredients: action.payload,
    totalPrice: 4,
    error: false,
    building:false
  }
}
const fecthIngredientFailed = (state)=>{
  return updateObject(state, { error: true })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state,action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state,action);
    case actionTypes.FETCH_INGREDIENT:
      return fecthIngredient(state,action);
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fecthIngredientFailed(state);

    default: return state
  }
}
export default reducer;