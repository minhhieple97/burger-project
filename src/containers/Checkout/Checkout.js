import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
export default class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }
    componentWillMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        console.log(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0]==='price') {
                price = param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        console.log(this.state.ingredients);
        this.setState({ ingredients, totalPrice: price });
    }
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutContinued={this.checkoutContinued}
                    checkoutCancelled={this.checkoutCancelled}
                />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData {...props}ingredients={this.state.ingredients} price={this.state.totalPrice} />} ></Route>
            </div>
        )
    }
}
