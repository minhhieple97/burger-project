import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './contactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler';
import * as  actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../helper/utilly';
import { connect } from 'react-redux';
const ContactData = props => {
    const { ingredients, price, userId, onOrderBurger, token, loading } = props;
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            checkClick: false,
            valid: false
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
            },
            checkClick: false,
            valid: false
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
                minLength: 5,
                maxLength: 15
            },
            checkClick: false,
            valid: false
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
            },
            checkClick: false,
            valid: false
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
            },
            checkClick: false,
            valid: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            valid: true,
            validation: {}
        }
    })
    const [formIsValid, setFormIsValid] = useState(false);
    const orderHandler = async (e) => {
        e.preventDefault();
        const formData = {};
        for (const formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients,
            price,
            orderData: formData,
            userId
        };
        onOrderBurger(order, token);
    };
    const inputChangedHandler = (event, inputIdentifier) => {
        const updateFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(
                event.target.value,
                orderForm[inputIdentifier].validation
            ),
            checkClick: true
        });
        const updateOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updateFormElement
        });
        updateOrderForm[inputIdentifier] = updateFormElement;//cập nhật lại state.
        let updateFormIsValid = true;//Mỗi lần một ô input thay đổi thì lại check xem toàn bộ form có hợp lệ hay không ?
        for (const key in updateOrderForm) {//lặp qua tất cả các key trong state (orderForm)
            updateFormIsValid = updateOrderForm[key].valid && updateFormIsValid;//lặp qua tất cả giá trị của valid của tất cả các object trong orderForm , giá trị của formIsvalid trong mỗi lần lặp sẽ ảnh hưởng đến lần lặp tiếp theo => chỉ cần formIsValid=false thì giá trị của nó luôn bằng false
            if (!updateFormIsValid) break;
        }
        // this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid });
        setOrderForm(updateOrderForm);
        setFormIsValid(updateFormIsValid);
    };
    const clickHandled = (e, formElement) => {
        const _orderForm = { ...orderForm };
        _orderForm[formElement.id].checkClick = true;
        setOrderForm(_orderForm);
    }
    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({ id: key, config: orderForm[key] })
    };
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (<Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                changed={(event) => inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                clicked={(event) => clickHandled(event, formElement)}
                checkClicked={formElement.config.checkClick}
                valueType={formElement.id}
            />)
            )}
            <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler} >Order</Button>
        </form>
    );
    if (loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData} >
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));