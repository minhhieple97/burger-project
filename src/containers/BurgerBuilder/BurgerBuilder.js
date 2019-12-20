import React, { useEffect, useState,useCallback } from 'react';
import Aux from '../../hoc/Wraper';
import Burger from '../../components/Burger/Burger';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import BuildControls from '../../components/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);
    const {history } = props;

    const dispatch = useDispatch();
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredient()),[dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const ingredients = useSelector(state=>(state.burgerBuilder.ingredients));
    const totalPrice = useSelector(state=>(state.burgerBuilder.totalPrice));
    const isAuthenticated = useSelector((state)=>(state.auth.token !== null));
    const error = useSelector(state=>state.burgerBuilder.error) 

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((ing) => ingredients[ing]).reduce((total, item) => total += item, 0);// Calculate total purchase money
        return sum > 0 // check purchase 
    };
    const addIngredientHander = (type) => {
        onIngredientAdded(type);
        updatePurchaseState(ingredients);
    };
    const removeIngredientHander = (type) => {
        const oldCount = ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        onIngredientRemoved(type);
        const updateIngredients = { ...ingredients };
        updatePurchaseState(updateIngredients);
    };
    const purchaseHander = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');//Bất cứ khi nào người dùng xác thực thì điều này sẽ xảy ra
            history.push('/auth');
        }
    };
    const purchaseCancelHander = () => {
        setPurchasing(false);
    };
    const purchaseContinueHander = async () => {
        onInitPurchase();//Khi ấn continue checkout thì khởi tạo state bằng action PURCHASE_INIT
        history.push({ pathname: '/checkout' });
    };
    let orderSummary = null;
    let burger = error ? <h1 style={{ textAlign: "center" }} >Ingredients can't loaded!</h1> : <Spinner />
    const disabledInfo = {
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };
    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={addIngredientHander} removeIngredientHander={removeIngredientHander}
                    disabled={disabledInfo}
                    price={totalPrice}
                    purchaseable={updatePurchaseState(ingredients)}
                    ordered={purchaseHander}
                    isAuth={isAuthenticated}
                />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={ingredients}
            purchaseCancel={purchaseCancelHander}
            purchaseContinue={purchaseContinueHander}
            totalPrice={totalPrice}
        />
    };
    return (
        <Aux>
            <Modal show={purchasing} clicked={purchaseCancelHander}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
};
//mapDispatchToProps mặc định nhận dispatch làm tham số và trả về một object
//các properties của object chính là các action-creator 
//hàm connect eject object này vào trong component BurgerBuiler truyền như props.
export default (withErrorHandler(BurgerBuilder, axios));