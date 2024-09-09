import axios from 'axios';

const api = axios.create({
    baseURL: 'https://synchronize-api.onrender.com', 
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token && !config.url.includes('/auth/login')) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;