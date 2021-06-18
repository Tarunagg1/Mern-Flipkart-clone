import { productConstant } from "../actions/constants"

const initialState = {
    products:[],
    productByPrice:{
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under30k:[],
    },
    pageRequest:false,
    page:{},
    pageError:null,
    loading:false,
    productDetails:{}
}


export default (state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case productConstant.GET_PRODUCTS_BY_SLUG:
            return {
                ...state,
                products:payload.product,
                productByPrice:{
                    ...payload.productsByPrice
                }
            }
        case productConstant.GET_PRODUCT_PAGE_REQUEST:
            return {...state,pageRequest:true}
        case productConstant.GET_PRODUCT_PAGE_SUCCESS:
            return {...state,pageRequest:false,page:payload}
        case productConstant.GET_PRODUCT_PAGE_FALIUER:
            return {...state,pageRequest:false,error:payload.error}
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            return {...state,loading:true}
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return {...state,loading:false,productDetails:payload}
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILEUR:
            return {...state,loading:false}
                    
        default:
            return {...state}
    }
}

