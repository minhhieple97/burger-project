import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './contactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'MinhHiepLe',
                address: {
                    street: 'BN',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'hieplevuc@gmail'
            },
            deliveryMethod: 'fastest'
        };
        try {
            const response = await axios.post('/orders.json', order);
            this.setState({ loading: false });
            this.props.history.push('/');
            console.log(response);
        } catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }
    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"></input>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="Your street"></input>
                <input className={classes.Input} type="text" name="postal" placeholder="Your postal"></input>
                <Button btnType="Success" clicked={this.orderHandler} >Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData} >
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
export default withRouter(ContactData)