import React, { useEffect, useState } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';
import classes from './auth.module.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../helper/utilly';
const Auth = (props) => {
    const [controls, setControls] = useState({
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
    });
    const [isSignup,setIsSignup] = useState(true);
    const {onAuth, buildingBurger, authenRedirectPath, onSetAuthRedirectPath,error, isAuthenticated,loading} = props;
    const inputChangedHandler = (event, controlName) => {
        const updatedControl = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value,controls[controlName].validation),
                checkClick: true
            })
        });
        setControls(updatedControl);
    };
    const submitHandled = (event) => {
        event.preventDefault();
        onAuth(controls.email.value, controls.password.value, isSignup);
    };
    const switchAuthModeHandler = () => {
        setIsSignup(preState=>!preState)
    };
    useEffect(() => {
        if (!buildingBurger && (authenRedirectPath !== '/')) {//Nếu không ở trạng thái building và authenRedirect 
            console.log("Running here!");
            onSetAuthRedirectPath('/');
        }
        //Chúng ta có một state dùng để xác định trạng thái người dùng có đang build một burger hay không ? nhằm giải quyết vấn đề khi mới vào trang chưa đăng nhập và build burger => chuyển sang trang auth để order => khi quay lại trang chủ thì ingredient bị mất =>để giải quyết thì sau khi nhận auth xong thì chuyển sang trang checkout luôn. mà không back lại BugerBuilder nữa.
    },[authenRedirectPath,buildingBurger,onSetAuthRedirectPath])
        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({ id: key, config: controls[key] })
        };
        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                changed={(event) => inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                checkClicked={formElement.config.checkClick}
                valueType={formElement.id}
            />
        ));
        let content = (
            <form onSubmit={submitHandled} >
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
        )
        let errorContent = null;
        if (error) {
            errorContent = (
                <p>{error.message}</p>
            )
        }
        let authRedirect = null;
        if (isAuthenticated) {//Nếu đã đăng nhập rồi thì redirect đến trang chủ.
            authRedirect = <Redirect to={authenRedirectPath} />
        }
        if (loading) {
            content = <Spinner />
        }
        const button = <Button clicked={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        return <div className={classes.Auth} >
            {errorContent}
            {authRedirect}
            {content}
            {button}
        </div>
}
const mapStateToProps = (state) => {
    const { auth, burgerBuilder } = state;
    return {
        loading: auth.loading,
        error: auth.error,
        isAuthenticated: auth.token !== null,//xác định đăng nhập hay chưa 
        buildingBurger: burgerBuilder.building,//xác định xem có đang ở trạng thái build-burger hay không
        authenRedirectPath: auth.authRedirect//Đường dẫn cần redirect đến khi authen xong
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Auth);