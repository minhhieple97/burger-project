import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };
    async  componentDidMount() {
        try {
            const response = await axios.get('/orders.json');
            const fetchOrders = [];
            for (const key in response.data) {
               fetchOrders.push({
                   id:key,
                   ...response.data[key]
               })
            }
            this.setState({ loading: false,orders:fetchOrders });
        } catch (error) {
            console.log(error.message);
        }
    };
    render() {
        return (
            <div>
              {
                this.state.orders.map(order=><Order key={order.id} ingredients={order.ingredients}  price={+order.price} />)
              }
            </div>
        )
    }
}
export default withErrorHandler(Orders,axios);
