import axios from 'axios'
const api = axios.create({
    baseURL : 'http://192.168.206.1:5005/api',
    timeout: 10000000,
})
api.defaults.headers.common.Accept = 'application.json';
export default api;
