import React, { useEffect } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
const Orders = (props) => {
    const { orders, loading,token,userId,onFetchOrders } = props;
    useEffect(() => {
        onFetchOrders(token,userId);
    },[token,userId,onFetchOrders])
    let content = <Spinner/>;
    if (!loading) {
         if (orders.length < 1) return <h1 style={{ textAlign: "center" }}>You have no orders!</h1>
         content = orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)
    }
    return <div>{content}</div>
}
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
