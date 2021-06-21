import axios from '../helpers/axios'
import { authConstants, cartConstant } from "./constants"

export const login = (User) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        try {
            const resp = await axios.post('/signin', User);
            console.log(resp);
            const { token, user } = resp.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({ type: authConstants.LOGIN_SECCESS, payload: { user, token } })
        } catch (error) {
            console.log(error.response);
            dispatch({ type: authConstants.LOGIN_FAIL, payload: { error: error.response } })
        }

    }
}

export const isuserLogiIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({ type: authConstants.LOGIN_SECCESS, payload: { user, token } })
        } else {
            dispatch({ type: authConstants.LOGIN_FAIL, payload: { error: 'failed to Login' } })
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        // localStorage.removeItem('user');
        // localStorage.removeItem('token');
        localStorage.clear();
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        dispatch({type:cartConstant.RESET_CART});
    }
}


export const signUp = (User) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.REGISTER_REQUEST })
        try {
            const { data: { user } } = await axios.post('/admin/signup', User);
            // console.log(user);
            dispatch({ type: authConstants.REGISTER_SECCESS, payload: user })
            dispatch({ type: authConstants.REGISTER_REQUEST_DONE })

        } catch (error) {
            const { data } = error.response;
            console.log(data);
            dispatch({ type: authConstants.REGISTER_FAIL, payload: data })
            dispatch({ type: authConstants.REGISTER_REQUEST_DONE })
        }

    }
}
