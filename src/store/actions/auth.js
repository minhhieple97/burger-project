import * as actionTypes from './actionTypes';
import axios from 'axios';
const TOKEN = `AIzaSyDU23a5ieqoH4XsUCHo_Yu2zmMIhttmuAg`;
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: authData
    }
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: error
    }
}
export const auth = (email, password, isSignup) => {
    return async dispatch => {
        try {
            dispatch(authStart());
            const authData = { email, password, returnSecureToken: true };
            let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${TOKEN}`;
            if (!isSignup) {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${TOKEN}`
            }
            const response = await axios.post(url, authData);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            console.log(error.message);
            dispatch(authFail(error.response.data.error));
        }
    }
}
export const setAuthRedirectPath = (path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}