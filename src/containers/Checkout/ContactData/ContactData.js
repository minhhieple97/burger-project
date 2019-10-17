import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './contactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
             elementType:'input',
             elementConfig:{
                 type:'text',
                 placeholder:'Name'
             },
             value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            street: 'BN',
        },
        loading: false
    }
    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        } catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }
    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name" />

                <Input inputtype="input" type="email" name="email" placeholder="Your email" />

                <Input inputtype="input" type="text" name="street" placeholder="Your street" />

                <Input inputtype="input" type="text" name="postal" placeholder="Your postal" />

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
export default (ContactData)