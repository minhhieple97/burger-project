import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id,orderData)=>{
  return {
      type:actionTypes.PURCHASE_BURGER_SUCCESS,
      payload:{
          id,
          orderData
      }
  }
};
export const purchaseBurgerFailed = (error)=>{
  return {
      type:actionTypes.PURCHASE_BURGER_FAILED,
      payload:error
  }
};
export const purchaseBurgerStart = (orderData)=>{
    return async dispatch=>{
      try {
       const response = await axios.post('/orders.json', order);
       dispatch(purchaseBurgerSuccess(response.data,orderData));
      } catch (error) {
        dispatch(purchaseBurgerFailed(error)); 
      }
    }
}