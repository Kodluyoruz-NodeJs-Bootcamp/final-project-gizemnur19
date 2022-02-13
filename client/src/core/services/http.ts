import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.auth = token;
    }
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    // Do something with response error
    if(error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default axios;