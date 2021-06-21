import { userConstant } from "../actions/constants";

const initialState = {
    address:[],
    error:null,
    loading:false
}


export default (state=initialState,action) => {
    const {type,payload} = action;
    switch (type) {
        case userConstant.GET_USER_ADDRESS_REQUEST:
            return {...state,loading:true}
        case userConstant.GET_USER_ADDRESS_SUCCESS:
            return{...state,address:payload.address,loading:false}
        case userConstant.GET_USER_ADDRESS_FALIURE:
            return {...state,error:payload.error,loading:false}
        default:
            return {...state};
    }

}




