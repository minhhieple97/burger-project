import axios from '../axios-orders';
export const fetchIngredients = () => async (dispatch) => {
    const response = await axios.get('/ingredients.json');
    dispatch({ type: 'FETCH_INGREDIENTS', payload: response.data });
}
export const updateIngredients = (ingredient) => {
    return {
        type: 'UPDATE_INGREDIENTS',
        payload: ingredient
    }
}