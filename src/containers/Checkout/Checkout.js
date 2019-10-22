import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';
import ContactData from './ContactData/ContactData';
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
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutContinued={this.checkoutContinued}
                    checkoutCancelled={this.checkoutCancelled}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
  return {
      ingredients:state.ingredients,
      totalPrice:state.totalPrice
  }
};
export default connect(mapStateToProps)(Checkout);
