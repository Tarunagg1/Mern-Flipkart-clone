import axios from "../helpers/axios"
import { productConstant } from "./constants";

export const getProductBySlug = (slug)=>{
    return async dispatch => {
        const resp = await axios.get(`/products/${slug}`);
        if(resp.status === 200){
            dispatch({
                type:productConstant.GET_PRODUCTS_BY_SLUG,
                payload:resp.data
            })
        }else{
            
        }
    }
}

export const getProductPage = (payload)=>{
    return async dispatch => {
        dispatch({type:productConstant.GET_PRODUCT_PAGE_REQUEST})
        const {cid,type} = payload;
        const resp = await axios.get(`/page/${cid}/${type}`);
        if(resp.status === 200){
            dispatch({type:productConstant.GET_PRODUCT_PAGE_SUCCESS,payload:resp.data})
        }else{
            // console.log(resp);
            const {error} = resp.data;
            dispatch({type:productConstant.GET_PRODUCT_PAGE_FALIUER,error})
        }
    }
}


export const getProductDetails = (payload)=>{
    return async dispatch => {
        dispatch({type:productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST})
        const {productid} = payload.params;
        const resp = await axios.get(`/product/${productid}`);
        if(resp.status === 200){
            dispatch({type:productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,payload:resp.data})
        }else{
            const {error} = resp.data;
            dispatch({type:productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILEUR,error})
        }
    }
}