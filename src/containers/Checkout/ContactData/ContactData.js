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
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }

        },
        loading: false
    }
    orderHandler = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (const formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        try {
            const response = await axios.post('/orders.json', order);
            this.setState({ loading: false });
            this.props.history.push('/');
        } catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    };
    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = { ...this.state.orderForm };
        const updateFormElement = {
            ...updateOrderForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value,updateFormElement.validation);
        console.log(updateFormElement);
        updateOrderForm[inputIdentifier] = updateFormElement;
        this.setState({ orderForm: updateOrderForm });
    };
    checkValidity(value,rules){
      let isValid = false;
      if(rules.required){
          isValid = value.trim() !== '';
      };
      if(rules.minLength){
           isValid = value.length >= rules.minLength;
      };
      if(rules.maxLength){
          isValid = value.length <= rules.maxLength;
      }
      return isValid;
    };
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({ id: key, config: this.state.orderForm[key] })
        };
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
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