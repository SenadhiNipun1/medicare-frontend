import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            "Content-Type": "application/json"
        }
    });

    axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => Promise.reject(error));

    export {axiosInstance};