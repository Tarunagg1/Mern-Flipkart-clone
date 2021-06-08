import { productConstant } from "../actions/constants"

const initialState = {
    products:[],
    productByPrice:{
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under30k:[],
        
    }
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
        default:
            return {...state}
    }
}

