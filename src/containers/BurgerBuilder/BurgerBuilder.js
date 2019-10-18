import React, { Component } from 'react';
import Aux from '../../hoc/Wraper';
import { connect } from 'react-redux';
import { fetchIngredients, updateIngredients, updatePrice, fetchPriceIngredients } from '../../actions/index';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };
    componentDidMount() {//componentDidMount được gọi khi các child component được render ra hoàn toàn => lúc componentDidMount được gọi thì withErrorHandler đã được render ra r => không thể catch được lỗi => Để khắc phục thì có thể sử dụng componentWillMount ở trong withErrorHandler hoặc hook.
        this.props.fetchIngredients();
        this.props.fetchPriceIngredients();

    };
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((ing) => ingredients[ing]).reduce((total, item) => total += item, 0);// Calculate total purchase money
        this.setState({ purchaseable: sum >= 0 });// check purchase 
    };
    addIngredientHander = (type) => {
        const oldCount = this.props.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = { ...this.props.ingredients };
        updateIngredients[type] = updateCount;
        const priceAddition = this.props.ingPrice[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.props.updateIngredients(updateIngredients);
        this.props.updatePrice(newPrice);
        this.updatePurchaseState(this.props.ingredients);
    };
    removeIngredientHander = (type) => {
        const oldCount = this.props.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = { ...this.props.ingredients };
        updateIngredients[type] = updateCount;
        const priceDeduction = this.props.ingPrice[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.props.updateIngredients(updateIngredients);
        this.props.updatePrice(newPrice);
        this.updatePurchaseState(updateIngredients);
    };
    purchaseHander = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHander = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHander =  () => {
        this.props.history.push({ pathname: '/checkout' });
    };
    render() {
        let orderSummary = null;
        let burger = this.state.error ? `Ingredients can't loaded!` : <Spinner />
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHander} removeIngredientHander={this.removeIngredientHander}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHander}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancel={this.purchaseCancelHander}
                purchaseContinue={this.purchaseContinueHander}
                totalPrice={this.props.totalPrice}
            />
        };
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHander}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    };
}
const mapStateToProps = (state, ownProp) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.price,
        ingPrice: state.ingPrice
    };
};
export default connect(mapStateToProps, {
    fetchIngredients,
    updateIngredients,
    updatePrice,
    fetchPriceIngredients
})(withErrorHandler(BurgerBuilder, axios));