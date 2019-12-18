import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import { Route, Redirect, withRouter } from 'react-router-dom';
const Checkout = (props) => {
    const { history,match,ingredients,purchased } = props
    const checkoutCancelled = () => {
        history.goBack();
    }
    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-data');
    }
    let summary = <Redirect to="/" />
    if (ingredients) {
        const purchasedRedirect = (purchased) ? (<Redirect to="/" />) : null//Khi trạng thái purchased là true thì redirect trang trang chủ  
        // action PURCHASE_BURGER_SUCCESS được kích hoạt ở component ContactData sẽ set purchased = true. 
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutContinued={checkoutContinued}
                    checkoutCancelled={checkoutCancelled} />
                <Route path={match.path + '/contact-data'} component={ContactData} />
            </div>
        )
        return summary
    }
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased//purchased là state trong order để xác định xem user đã thanh toán hay chưa
    }
};
export default connect(mapStateToProps)(withRouter(Checkout));
