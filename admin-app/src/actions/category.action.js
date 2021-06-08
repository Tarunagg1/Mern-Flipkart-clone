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


export const addCategory = (data)=>{
    return async (dispatch)=>{
        try {
            dispatch({type:categoryConstant.ADD_NEW_CATEGORY_REQUEST});
            const resp = await axios.post('/category/create',data);
            dispatch({type:categoryConstant.ADD_NEW_CATEGORY_SUCCESS,payload:{category:resp.data.category}});
        } catch (error) {
            dispatch({type:categoryConstant.ADD_NEW_CATEGORY_FAIl,payload:error.response.data.error});
            // console.log(error);
        }
    }
}


export const updateCategorirs = (form)=>{
    return async (dispatch)=>{
        try {
            dispatch({type:categoryConstant.UPDATE_CATEGORIES_REQUEST});
            const resp =  await axios.post('/category/update',form);
            if(resp.status === 201){
                dispatch({type:categoryConstant.UPDATE_CATEGORIES_SUCCESS});
                dispatch(getAllCategory());
            }
        } catch (error) {
            dispatch({type:categoryConstant.UPDATE_CATEGORIES_FALIUR,payload:error.response});
        }
    }
}


export const deleteCategorirs = (ides)=>{
    return async (dispatch)=>{
        try {
            // dispatch({type:categoryConstant.ADD_NEW_CATEGORY_REQUEST});
            const resp = await axios.post('/category/delete',{
                payload:{
                    ides
                }
            });
            if(resp.status === 201){
                return true;
            }else{
                return false;
            }
            // dispatch({type:categoryConstant.ADD_NEW_CATEGORY_SUCCESS,payload:{category:resp.data.category}});
            // console.log(resp);
        } catch (error) {
            // console.log();
            // dispatch({type:categoryConstant.ADD_NEW_CATEGORY_FAIl,payload:error.response.data.error});
            console.log(error);
        }
    }
}


// export {getAllCategory }