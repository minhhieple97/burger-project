import axios from '../axios-orders';
import { async } from 'q';
export const fetchIngredients = () => async (dispatch) => {
    const response = await axios.get('/ingredients.json');
    dispatch({ type: 'FETCH_INGREDIENTS', payload: response.data });
}
export const updateIngredients = (ingredients) => {
    return {
        type: 'UPDATE_INGREDIENTS',
        payload: ingredients
    }
}
export const updatePrice = (price) => {
    return {
        type: 'UPDATE_PRICE',
        payload: price
    }
}
export const fetchOrders = () => async (dispatch) => {
    const response = await axios.get('/orders.json');
    const fetchOrders = [];
    for (const key in response.data) {
        fetchOrders.push({
            id: key,
            ...response.data[key]
        })
    }
    dispatch({ type: 'FETCH_ORDERS', payload: fetchOrders });
}
export const fetchPriceIngredients = () => async (dispatch) => {
    const response = await axios.get('/price.json');
    const ingPrice = {};
    for (const key in response.data) {
        ingPrice[key] = parseFloat(response.data[key])
    }
    dispatch({ type: 'FETCH_PRICE_INGREDIENTS', payload: ingPrice });
};