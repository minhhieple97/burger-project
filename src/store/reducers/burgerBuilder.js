import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilly';
const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updateIngredient = {
        [action.payload]: state.ingredients[action.payload] + 1
      };
      const updateIngredients = updateObject(state.ingredients, updateIngredient);
      const updateState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload]
      };
      return updateObject(state, updateState);
    case actionTypes.REMOVE_INGREDIENT:
      const updateIng = {
        [action.payload]: state.ingredients[action.payload] - 1
      };
      const updateIngs = updateObject(state.ingredients, updateIng);
      const updateSt = {
        ingredients: updateIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload]
      };
      return updateObject(state, updateSt);
    case actionTypes.FETCH_INGREDIENT:
      return {
        ...state,
        ingredients: action.payload,
        totalPrice: 4,
        error: false
      }
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return updateObject(state, { error: true })

    default: return state
  }
}
export default reducer;