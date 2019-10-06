import React , {Component} from 'react';
import Aux from '../../hoc/Wraper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
const INGREDIENTS_PRICE = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchaseable:false,
        purchasing:false
    };
    updatePurchaseState  (ingredients){
       const sum = Object.keys(ingredients).map((ing)=>ingredients[ing]).reduce((total,item)=>total+=item,0);// Calculate total purchase money
       this.setState({purchaseable:sum>=0});
    };
    addIngredientHander = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount+1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients:updateIngredients,totalPrice:newPrice});
        this.updatePurchaseState(this.state.ingredients);
    };
    removeIngredientHander = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updateCount = oldCount-1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients:updateIngredients,totalPrice:newPrice});
       this.updatePurchaseState(updateIngredients);
    };
    purchaseHander = ()=>{
       this.setState({purchasing:true});
    };
    purchaseCancelHander = ()=>{
        this.setState({purchasing:false});
    };
    purchaseContinueHander = ()=>{
        alert('You continue checkout!');
    };
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                  <Modal show={this.state.purchasing} clicked={this.purchaseCancelHander}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancel={this.purchaseCancelHander}
                    purchaseContinue={this.purchaseContinueHander}
                    totalPrice={this.state.totalPrice}
                    ></OrderSummary>
                </Modal>   
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHander} removeIngredientHander={this.removeIngredientHander} 
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHander}
                ></BuildControls>
            </Aux>
        )
    };
}
export default BurgerBuilder;