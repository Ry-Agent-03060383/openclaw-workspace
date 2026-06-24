import axios from 'axios';
import { useUserStore } from '../store/user';
import { ElMessage } from 'element-plus';
const instance = axios.create({
    baseURL: '/api',
    timeout: 15000,
});
instance.interceptors.request.use(config => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
});
instance.interceptors.response.use(res => {
    if (res.data.code === 401) {
        useUserStore().logout();
    }
    return res.data;
}, err => {
    ElMessage.error(err.message);
    return Promise.reject(err);
});
const request = {
    get(url, config) { return instance.get(url, config); },
    post(url, data, config) { return instance.post(url, data, config); },
    put(url, data, config) { return instance.put(url, data, config); },
    delete(url, config) { return instance.delete(url, config); },
};
export default request;
