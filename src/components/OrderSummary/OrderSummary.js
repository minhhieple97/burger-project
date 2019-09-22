import React from 'react';
import Aux from '../../hoc/Wraper';
import ButtonOrder from '../UI/Button/Button';
const orderSummary = (props)=>{
    const listIngredients = Object.keys(props.ingredients).map((igKey)=><li key={igKey}>
      <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
    </li>)
    return <Aux>
    <h3>Your Order</h3>
    <h4>Total price:<strong>{props.totalPrice.toFixed(2)}$</strong></h4>
    <p>A delicious burger with the following ingredients</p>
    <ul>
        {listIngredients}
    </ul>
    <p>Continue to checkout?</p>
    <ButtonOrder btnType="Danger" clicked={props.purchaseCancel} >Cancel</ButtonOrder>
    <ButtonOrder btnType="Success" clicked={props.purchaseContinue} >Continue</ButtonOrder>
</Aux>
}

export default orderSummary;