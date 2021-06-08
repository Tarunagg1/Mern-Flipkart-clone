import { authConstants } from "../actions/constants";

const initialState = {
    error: null,
    loading: false,
    user: {}
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case authConstants.REGISTER_REQUEST:
            return { ...state, loading: true };
        case authConstants.REGISTER_SECCESS:
            return { ...state, user: payload }
        case authConstants.REGISTER_FAIL:
            return { ...state, error: payload };
        case authConstants.REGISTER_REQUEST_DONE:
            return { ...state, loading: false }
        default:
            return state
    }
}


