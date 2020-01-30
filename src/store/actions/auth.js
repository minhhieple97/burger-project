import * as actionTypes from './actionTypes';
import axios from 'axios';
const TOKEN = `AIzaSyDU23a5ieqoH4XsUCHo_Yu2zmMIhttmuAg`;
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const checkAuthTimeout = (expirationTime) => {//Hàm kiểm tra thời gian đăng nhập cho phép
    console.log(expirationTime);
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime);//Sau khoảng thời gian này thì tự động gọi hàm logout
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: authData
    }
}
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
            const expiresIn = Date.now() + response.data.expiresIn * 1000 * 24 * 7;
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expiresIn', expiresIn);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn*1000*24*7));
        } catch (error) {
            console.log(error.message);
            dispatch(authFail(error.response.data.error));
        }
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}
export const authCheckLogin = () => {//Hàm kiểm tra xem đã thực hiện đăng nhập hay chưa ? thực hiện kiểm tra token trong localStorage
    return dispatch => {
        const token = localStorage.getItem('token');//Kiểm tra token trong localStorage
        if (!token) dispatch(logout());//Token không tồn tại thì call action logout
        else {
            const expirationTime = localStorage.getItem('expiresIn');
            if ((expirationTime - Date.now()) < 0) dispatch(logout());
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess({ idToken: token, localId: userId }));
                dispatch(checkAuthTimeout((expirationTime - Date.now())));
            }
        }
    }
}