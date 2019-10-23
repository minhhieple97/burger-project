import * as actionTypes from './actionTypes';
export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    }
};
export const authSuccess = (authData)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        payload:authData
    }
};
export const authFail = (error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        payload:error
    }
}
export const auth = (email,password)=>{
    return dispatch => {
        dispatch(authStart());
        
    }
}