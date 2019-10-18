import React, { Component } from 'react';
import Aux from '../../hoc/Wraper';
import { connect } from 'react-redux';
import { fetchIngredients,updateIngredients,updatePrice } from '../../actions/index';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };
    async componentDidMount() {//componentDidMount được gọi khi các child component được render ra hoàn toàn => lúc componentDidMount được gọi thì withErrorHandler đã được render ra r => không thể catch được lỗi => Để khắc phục thì có thể sử dụng componentWillMount ở trong withErrorHandler hoặc hook.
        // try {
        //     const response = await axios.get('/ingredients.json');
        //     this.setState({ ingredients: response.data });
        // } catch (error) {
        //     console.log(error);
        //     this.setState({ error: true });
        // };
        this.props.fetchIngredients();

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
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.props.totalPrice;
        this.props.updateIngredients(updateIngredients);
        this.props.updatePrice(priceAddition);
        // this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
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
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updateIngredients);
    };
    purchaseHander = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHander = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHander = async () => {//
        const queryParams = [];
        for (const i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        };
        queryParams.push(`price=${this.props.totalPrice}`)
        const queryString = queryParams.join('&');
        this.props.history.push({//Khi nhấn vào contine ở modal thì change URL, đi kèm với các query trên.
            pathname: '/checkout',
            search: `?${queryString}`
        });
    };
    render() {
        console.log(this.props);
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
    return { ingredients: state.ingredients , totalPrice:state.price };
};
export default connect(mapStateToProps, { fetchIngredients,updateIngredients,updatePrice })(withErrorHandler(BurgerBuilder, axios));