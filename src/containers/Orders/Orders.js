import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { fetchOrders } from '../../actions';
import { connect } from 'react-redux';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    state = {
        loading: true
    };
    async  componentDidMount() {
        this.props.fetchOrders();
        this.setState({ loading: false});
    };
    render() {
        return (
            <div>
                {
                    this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { orders: state.orders }
}
export default connect(mapStateToProps, { fetchOrders })(withErrorHandler(Orders, axios));
