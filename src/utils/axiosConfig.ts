import axios from "axios";

//Axios instarnce with credentials
export const axiosInstanceWithCredentials = axios.create({
    baseURL: '/api/v1',
    withCredentials: true//This is important to include cookies in requests
});

//Axios instance without credentials
export const axiosInstanceWithoutCredentials = axios.create({
    baseURL: '/api/v1',
    withCredentials: false
});


//Interceptor to add token to headers for instance with credentials
axiosInstanceWithCredentials.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            config.headers['Authorization']=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
    return null;
}