import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData,
    id
  }
};
export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload: error
  }
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};
export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    dispatch(purchaseBurgerStart());
    try {
      const response = await axios.post(`/orders.json?auth=${token}`, orderData);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFailed(error));
    }
  }
};
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
};
export const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
    error
  }
};
export const fetchOrders = (token) => {
  return async dispatch => {
    try {
      dispatch(fetchOrdersStart());
      const response = await axios.get(`/orders.json?auth=${token}`);
      const fetchOrders = [];
      for (const key in response.data) {
        fetchOrders.push({
          id: key,
          ...response.data[key]
        })
      }
      dispatch(fetchOrdersSuccess(fetchOrders))
    } catch (error) {
      dispatch(fetchOrdersFailed(error));
    }

  }
};
