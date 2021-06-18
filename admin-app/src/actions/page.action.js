import axios from "../helpers/axios"
import { createPageCOnstant } from "./constants";


export const createPage = (form) => {
    console.log('dispatch');
    return async dispatch => {
        dispatch({
            type:createPageCOnstant.CREATE_PAGE_REQUEST
        })
        try {
            const resp = axios.post('/page/create',form);
            dispatch({
                type:createPageCOnstant.CREATE_PAGE_SUCCESS,
                resp
            })

        } catch (error) {
            dispatch({
                type:createPageCOnstant.CREATE_PAGE_FALIUER
            })
            console.log(error);    
        }
    }
}
