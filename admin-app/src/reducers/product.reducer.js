import { ProductConnstant } from "../actions/constants"

const initialState = {
    products:[],
    loading:false
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case ProductConnstant.GET_ALL_PRODUCTs_REQUEST:
            return {...state,loading:true}
        case ProductConnstant.GET_ALL_PRODUCTs_SUCCESS:
            return {...state,products:payload.products,loading:false}
        case ProductConnstant.GET_ALL_PRODUCTs_FAIl:
            return {...state,loading:false}
        default:
            return {...state}
    }
}
