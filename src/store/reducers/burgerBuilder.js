import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helper/utilly';
const initialState = {
  ingredients: null,
  totalPrice: 4,
  price: null,
  error: false,
  building: false
};
const addIngredient = (state, action) => {
  const { ingredients, price, totalPrice } = state;
  const updateIngredient = {
    [action.payload]: ingredients[action.payload] + 1
  };
  const updateIngredients = updateObject(ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: totalPrice + price[action.payload],
    building: true
  };
  return updateObject(state, updateState);
};
const removeIngredient = (state, action) => {
  const { ingredients, price, totalPrice } = state;
  const updateIng = {
    [action.payload]: ingredients[action.payload] - 1
  };
  const updateIngs = updateObject(ingredients, updateIng);
  const updateSt = {
    ingredients: updateIngs,
    totalPrice: totalPrice - price[action.payload],
    building: true
  };
  return updateObject(state, updateSt);
};
const fecthIngredient = (state, action) => ({
  ...state,
  ingredients: action.payload.ingredients,
  price: action.payload.price,
  totalPrice: 4,
  error: false,
  building: false
});
const fecthIngredientFailed = (state) => updateObject(state, { error: true });
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.FETCH_INGREDIENT:
      return fecthIngredient(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fecthIngredientFailed(state);
    default: return state
  };
};
export default reducer;