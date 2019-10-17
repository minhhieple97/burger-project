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
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:''  
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''  
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Mail'
                },
                value:''  
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest' },
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:''  
            }

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
    inputChangedHandler = (event,inputIdentifier)=>{
     console.log(inputIdentifier);
     console.log(event.target.value);
     const updateOrderForm = {...this.state.orderForm};
     const updateFormElement = {
       ...updateOrderForm[inputIdentifier]
     };
     updateFormElement.value = event.target.value;
     updateOrderForm[inputIdentifier] = updateFormElement;
     this.setState({orderForm:updateOrderForm});
    }
    render() {
        console.log(this.state);
        const formElementsArray = [];
        for(let key in this.state.orderForm){
         formElementsArray.push({id:key,config:this.state.orderForm[key]})
        };
        let form = (
            <form>
                {formElementsArray.map(formElement=>(
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
                    changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
                 <Button btnType="Success" clicked={this.orderHandler.bind(this)} >Order</Button>
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