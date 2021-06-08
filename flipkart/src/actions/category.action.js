import axios from "../helpers/axios"
import { categoryConstant } from "./constants"


export const getAllCategory = ()=>{
    return async (dispatch)=>{
        dispatch({type:categoryConstant.GET_ALL_CATEGORIES_REQUEST});
        try {
            const {data:{categoriesList}} = await axios.get('/category/getcategory');
            dispatch({type:categoryConstant.GET_ALL_CATEGORIES_SUCCESS,payload:categoriesList})
        } catch (error) {
            console.log(error);
            dispatch({type:categoryConstant.GET_ALL_CATEGORIES_FAIL,payload:error});

        }
    }
}
