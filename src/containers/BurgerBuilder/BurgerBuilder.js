import React, { Component } from 'react';
import Aux from '../../hoc/Wraper';
import Burger from '../../components/Burger/Burger';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import BuildControls from '../../components/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    };
    componentDidMount() {
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((ing) => ingredients[ing]).reduce((total, item) => total += item, 0);// Calculate total purchase money
        return sum > 0 // check purchase 
    };
    addIngredientHander = (type) => {
        this.props.onIngredientAdded(type);
        this.updatePurchaseState(this.props.ingredients);
    };
    removeIngredientHander = (type) => {
        const oldCount = this.props.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        this.props.onIngredientRemoved(type);
        const updateIngredients = { ...this.props.ingredients };
        this.updatePurchaseState(updateIngredients);
    };
    purchaseHander = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');//Bất cứ khi nào người dùng xác thực thì điều này sẽ xảy ra
            this.props.history.push('/auth');
        }
    };
    purchaseCancelHander = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHander = async () => {
        this.props.onInitPurchase();//Khi ấn continue checkout thì khởi tạo state bằng action PURCHASE_INIT
        this.props.history.push({ pathname: '/checkout' });
    };
    render() {
        let orderSummary = null;
        let burger = this.props.error ? `Ingredients can't loaded!` : <Spinner />
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
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHander}
                        isAuth={this.props.isAuthenticated}
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
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));