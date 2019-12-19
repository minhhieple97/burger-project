import Aux from '../../hoc/Wraper';
import ButtonOrder from '../UI/Button/Button';
import React from 'react';
const OrderSummary = (props)=> {
   const {ingredients,totalPrice,purchaseCancel,purchaseContinue} = props;
    const listIngredients = Object.keys(ingredients).map((igKey) => <li key={igKey}>
      <span style={{textTransform:'capitalize'}}>{igKey}</span>:{ingredients[igKey]}
    </li>)
    return <Aux>
      <h3>Your Order</h3>
      <h4>Total price:<strong>{totalPrice.toFixed(2)}$</strong></h4>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {listIngredients}
      </ul>
      <p>Continue to checkout?</p>
      <ButtonOrder btnType="Danger" clicked={purchaseCancel} >Cancel</ButtonOrder>
      <ButtonOrder btnType="Success" clicked={purchaseContinue} >Continue</ButtonOrder>
    </Aux>  
}
export default OrderSummary;
