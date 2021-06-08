import { categoryConstant } from "../actions/constants";

const initState = {
    categories:[],
    loading:false,
    error:null
}


export default (state=initState,action)=>{
    const {type,payload} = action;
    switch (type) {
        case categoryConstant.GET_ALL_CATEGORIES_REQUEST:
            return {...state,loading:true}
        case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
            return {...state,categories:payload,loading:false}
        case categoryConstant.GET_ALL_CATEGORIES_FAIL:
            return {...state,error:payload,loading:false}
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            return {...state,loading:true}
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            return {...state,loading:false,}
        case categoryConstant.ADD_NEW_CATEGORY_FAIl:
            return {...state,loading:false}
            
        default:
            return {...state}
    }
}
