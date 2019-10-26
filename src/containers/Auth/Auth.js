import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';
import classes from './auth.module.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
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
            },

        },
        isSignup: true
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
    submitHandled = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    switchAuthModeHandler = () => {
        this.setState(preState => {
            return { isSignup: !preState.isSignup }
        })
    }
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authenRedirectPath) {
            this.props.onSetAuthRedirectPath();
        }
        //Chúng ta có một state dùng để xác định trạng thái người dùng có đang build một burger hay không ? nhằm giải quyết vấn đề khi mới vào trang chưa đăng nhập và build burger => chuyển sang trang auth để order => khi quay lại trang chủ thì ingredient bị mất =>để giải quyết thì sau khi nhận auth xong thì chuyển sang trang checkout luôn. mà không back lại BugerBuilder nữa.
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
        ));
        let content = (
            <form onSubmit={this.submitHandled} >
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
        )
        let error = null;
        if (this.props.error) {
            error = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authenRedirectPath} />
        }

        if (this.props.loading) {
            content = <Spinner />
        }
        return <div className={classes.Auth} >
            {error}
            {authRedirect}
            {content}
            <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authenRedirectPath: state.auth.authRedirect
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Auth);