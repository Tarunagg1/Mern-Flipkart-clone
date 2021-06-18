import axios from 'axios';
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
    const {auth:{token}} = store.getState();
    if(token){
        req.headers.Authrization = `Bearer ${token}`;
    }
    return req;
})


export default axiosinstance;
