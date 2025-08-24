import axios from 'axios'


const api = axios.create(
{
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    withCredentials: true,
})

api.interceptors.response.use(
    res => res,
    error => {
        // console.log(error.response.data.message); 백엔드에서 호출된 에러 메시지
        return Promise.reject(error);
    }
);


export default api;