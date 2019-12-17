import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: name
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: name
    }
}
export const setIngredients = (ingredients,price) => {
    return {
        type: actionTypes.FETCH_INGREDIENT,
        payload: {ingredients,price}
    }
}
export const initIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}
export const initIngredient = () => {
    return async (dispatch) => {
        try {
            const { data: ingredients } = await axios.get('https://burger-project-b6bde.firebaseio.com/ingredients.json');
            const { data: price } = await axios.get('https://burger-project-b6bde.firebaseio.com/price.json');
            dispatch(setIngredients(ingredients,price));
        } catch (error) {
            dispatch(initIngredientFailed())
        }

    }
}

