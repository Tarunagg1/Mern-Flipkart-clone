import { createPageCOnstant } from "../actions/constants";

const initialState = {
    error: null,
    loading: false,
    page: {}
}



export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case createPageCOnstant.CREATE_PAGE_REQUEST:
            return { ...state, loading: true };
        case createPageCOnstant.CREATE_PAGE_SUCCESS:
            return { ...state, loading: false }
        case createPageCOnstant.CREATE_PAGE_FALIUER:
            return { ...state, loading: false }
        default:
            return state;
    }
}