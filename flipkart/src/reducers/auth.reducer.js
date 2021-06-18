import { authConstants } from "../actions/constants";


const initialState = {
    token: null,
    user: {
        firstname: "",
        lastname: "",
        email: "",
        picture: "",
        role: ""
    },
    authenticate: false,
    authenticating: false
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case authConstants.LOGIN_REQUEST:
            return { ...state, ...payload };
        case authConstants.LOGIN_SECCESS:
            return { ...state, token: payload.token, user: payload.user, authenticate: true }
        case authConstants.LOGOUT_REQUEST:
            return { ...initialState, loading: true }
        case authConstants.LOGOUT_SUCCESS:
            return {...state,authenticate:false}
        case authConstants.LOGOUT_FAILURE:
            return {...state,error:payload,loading:false}
        default:
            return state
    }
}


