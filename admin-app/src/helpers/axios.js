import axios from 'axios';
import { authConstants } from '../actions/constants';
import { API_URL } from '../env';
import store from '../store';

const token = localStorage.getItem("token");

const axiosinstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Authrization": token ? `Bearear ${token}` : ""
    }
});

axiosinstance.interceptors.request.use((req) => {
    const {auth} = store.getState()
    // console.log(auth.token);
    if(auth.token){
        req.headers.Authrization = `Bearear ${token}`
    }
    return req
})

axiosinstance.interceptors.response.use((res) => {
    return res;
},(error) => {
    console.log(error.response);
    const {status} = error.response;
    if(status === 500){
        localStorage.clear('token');
        store.dispatch({
            type:authConstants.LOGOUT_SUCCESS
        })
    }
    return Promise.reject(error);
})



export default axiosinstance;
