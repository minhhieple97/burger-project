import Aux from '../../hoc/Wraper';
import ButtonOrder from '../UI/Button/Button';
import React, { Component } from 'react'
export default class OrderSummary extends Component {
  render() {
    const listIngredients = Object.keys(this.props.ingredients).map((igKey)=><li key={igKey}>
      <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
    </li>)
    return <Aux>
    <h3>Your Order</h3>
    <h4>Total price:<strong>{this.props.totalPrice.toFixed(2)}$</strong></h4>
    <p>A delicious burger with the following ingredients</p>
    <ul>
        {listIngredients}
    </ul>
    <p>Continue to checkout?</p>
    <ButtonOrder btnType="Danger" clicked={this.props.purchaseCancel} >Cancel</ButtonOrder>
    <ButtonOrder btnType="Success" clicked={this.props.purchaseContinue} >Continue</ButtonOrder>
</Aux>
  }
}
