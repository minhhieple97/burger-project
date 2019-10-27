import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
class Checkout extends Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = (this.props.purchased) ? (<Redirect to="/" />) : null//Khi trạng thái purchased là true thì redirect trang trang chủ  
            // action PURCHASE_BURGER_SUCCESS được kích hoạt ở component ContactData sẽ set purchased = true. 
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutContinued={this.checkoutContinued}
                        checkoutCancelled={this.checkoutCancelled} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }
        return summary
    }
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased//purchased là state trong order để xác định xem user đã thanh toán hay chưa
        //Khi 
    }
};

export default connect(mapStateToProps)(Checkout);



