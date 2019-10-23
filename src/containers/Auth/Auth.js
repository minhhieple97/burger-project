import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.module.css';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                checkClick: false,
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                checkClick: false,
                valid: false
            }
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = (value.trim() !== '') && isValid;
        };
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && isValid;
        };
        if (rules.maxLength) {
            isValid = (value.length <= rules.maxLength) && isValid;
        }
        return isValid;
    };
    inputChangedHandler = (event, controlName) => {
        const updatedControl = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                checkClick: true
            }
        };
        this.setState({ controls: updatedControl });
    }
    submitHandled = (event)=>{
        event.preventdefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value);
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({ id: key, config: this.state.controls[key] })
        };
        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                checkClicked={formElement.config.checkClick}
                valueType={formElement.id}
            />
        ))
        return (
            <div className={classes.Auth} >
            <form onSubmit={this.submitHandled} >
                {form}
                <Button
                    btnType="Success"

                >Submit</Button>
            </form>
            </div>
        )
    }
}
const mapDispathToProps = (state)=>{

}
const mapStateToProps = (dispatch)=>{
  return {
    onAuth:(email,password)=>dispatch(actions.auth())
  }
}
export default connect(mapStateToProps,mapDispathToProps)(Auth);