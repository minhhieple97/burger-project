import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id,orderData)=>{
  return {
      type:actionTypes.PURCHASE_BURGER_SUCCESS,
      orderData,
      id
  }
};
export const purchaseBurgerFailed = (error)=>{
  return {
      type:actionTypes.PURCHASE_BURGER_FAILED,
      payload:error
  }
};
export const purchaseBurgerStart = ()=>{
 return {
   type:actionTypes.PURCHASE_BURGER_START
 }
}
export const purchaseBurger = (orderData)=>{
    return async dispatch=>{
      dispatch(purchaseBurgerStart());
      try {
       const response = await axios.post('/orders.json', orderData);
       dispatch(purchaseBurgerSuccess(response.data.name,orderData));
      } catch (error) {
        dispatch(purchaseBurgerFailed(error)); 
      }
    }
}
export const purchaseInit = ()=>{
  return {
    type:actionTypes.PURCHASE_INIT
  }
};