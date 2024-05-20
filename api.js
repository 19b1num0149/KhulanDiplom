import axios from 'axios'
const api = axios.create({
    baseURL : 'http://172.20.10.4:5005/api',
    timeout: 10000000,
})
api.defaults.headers.common.Accept = 'application.json';
export default api;
