import axios from "../helpers/axios"
import { userConstant } from "./constants";

export const getAddress = ()=>{
    return async dispatch =>{
        try {
            dispatch({type:userConstant.GET_USER_ADDRESS_REQUEST})
            const resp = await axios.get('/user/address/getaddress');
            if(resp.status === 200){
                const {userAddress:{address}} = resp.data;
                dispatch({type:userConstant.GET_USER_ADDRESS_SUCCESS,payload:{address}})
            }else{
                const {error} = resp.data;
                dispatch({type:userConstant.GET_USER_ADDRESS_FALIURE,payload:{error}})
            }
        } catch (error) {
            dispatch({type:userConstant.GET_USER_ADDRESS_FALIURE,payload:error.data})
        }
    }
}


export const addAddress = (payload)=>{
    return async dispatch =>{
        try {
            dispatch({type:userConstant.ADD_USER_ADDRESS_REQUEST})
            const resp = await axios.post('/user/address/addaddress',{payload});
            if(resp.status === 201){
                console.log(resp.data);
                const {address:{address}} = resp.data;
                console.log(address);
                // const {userAddress:{address}} = resp.data;
                // dispatch({type:userConstant.ADD_USER_ADDRESS_SUCCESS,payload:{address}})
            }else{
                const {error} = resp.data;
                dispatch({type:userConstant.ADD_USER_ADDRESS_FAILURE,payload:{error}})
            }
        } catch (error) {
            dispatch({type:userConstant.ADD_USER_ADDRESS_FAILURE,payload:error.data})
        }
    }
}