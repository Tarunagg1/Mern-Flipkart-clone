import axios from "../helpers/axios"
import { productConstant } from "./constants";

export const getProductBySlug = (slug)=>{
    return async dispatch => {
        console.log('ij');
        const resp = await axios.get(`/products/${slug}`);
        if(resp.status == 200){
            dispatch({
                type:productConstant.GET_PRODUCTS_BY_SLUG,
                payload:resp.data
            })
        }else{
            console.log(resp);
        }
    }
}