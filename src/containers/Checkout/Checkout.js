import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
class Checkout extends Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                    checkoutContinued={this.checkoutContinued}
                    checkoutCancelled={this.checkoutCancelled}
                />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData {...props} ingredients={this.props.ingredients} price={this.props.totalPrice} />} ></Route>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { ingredients: state.ingredients, totalPrice: parseFloat(state.price) }
};
export default connect(mapStateToProps, {})(Checkout);