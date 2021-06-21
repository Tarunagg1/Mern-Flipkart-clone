import { cartConstant } from "../actions/constants";

const initialState = {
    cartItems:{},
    updatingCart:false,
    error:null
};

export default (state=initialState,action) => {
    const {payload,type} = action;
    switch (type) {
        case cartConstant.ADD_TO_CART_REQUEST:
            return {...state,updatingCart:true}
        
        case cartConstant.ADD_TO_CART_SUCCESS:
            return {...state,updatingCart:false,cartItems:payload.cartItems}
        
        case cartConstant.ADD_TO_CART_FALIUR:
            return {...state,error:payload.error}
    
        default:
            return state;
    }
}