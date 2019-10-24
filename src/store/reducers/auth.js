import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilly';
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};
const authStart = (state) => {
    return updateObject(state, { loading: true, error: true });
};
const authSuccess = (state, { payload }) => {
    return updateObject(state, {
        token: payload.idToken,
        userId: payload.localId,
        error: null,
        loading: false
    });
};
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    })
};
const authLogout = (state) => {
    return updateObject(state, { token: null, userId: null })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state)
        default: return state;
    }
};
export default reducer;