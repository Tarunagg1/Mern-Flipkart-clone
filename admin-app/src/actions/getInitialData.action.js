import axios from "../helpers/axios";
import { categoryConstant, initilData, ProductConnstant } from "./constants";

export const getProducts = ()=>{
    return async dispatch => {
        dispatch({type:initilData.GET_ALL_INITIAL_DATA_REQUEST});
        const res = await axios.get('/initialdata');
        if(res.status === 200){
            const {products,categories} = res.data;
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload:categories
            })
            dispatch({
                type:ProductConnstant.GET_ALL_PRODUCTs_SUCCESS,
                payload:{products}
            })
        }
    }
}
