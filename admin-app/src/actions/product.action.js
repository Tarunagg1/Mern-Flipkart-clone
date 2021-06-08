import axios from "../helpers/axios";
// import { categoryConstant, initilData, ProductConnstant } from "./constants";

export const AddProducts = (fdata) =>{
    return async dispatch => {
        try {
            console.log('oiju');
             await axios.post('/product/create',fdata);
            // dispatch({type:ProductConnstant.ADD_NEW_PRODUCT_SUCCESS,payload:data})
        } catch (error) {
            // dispatch({type:ProductConnstant.ADD_NEW_PRODUCT_FAIl,payload:error.response.data.error});
        }
    }
}


