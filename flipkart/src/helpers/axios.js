import axios from 'axios';
import { API_URL } from '../env';

const token = localStorage.getItem("token");

const axiosinstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Authrization": token ? `Bearear ${token}` : ""
    }
});

export default axiosinstance;
