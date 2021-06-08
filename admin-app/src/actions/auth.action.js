import axios from '../helpers/axios'
import { authConstants } from "./constants"

export const login = (User) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        try {
            const resp = await axios.post('/admin/signin', User);
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
        try {
            dispatch({type:authConstants.LOGOUT_REQUEST});
            const {data} = await axios.post('/admin/signout');
            console.log(data);
            localStorage.clear();
            // dispatch({ type: authConstants.LOGOUT });
            dispatch({type:authConstants.LOGOUT_SUCCESS});
        } catch (error) {
            console.log(error);
            dispatch({type:authConstants.LOGOUT_FAILURE,payload:error.data})
        }
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
