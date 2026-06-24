import axios from 'axios'
import { useUserStore } from '../store/user'
import { ElMessage } from 'element-plus'

type ApiResponse<T = any> = { code: number; message: string; data: T }
type ApiPromise<T = any> = Promise<ApiResponse<T>>

const instance = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

instance.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

instance.interceptors.response.use(
  res => {
    if (res.data.code === 401) {
      useUserStore().logout()
    }
    return res.data as any
  },
  err => {
    ElMessage.error(err.message)
    return Promise.reject(err)
  },
)

const request = {
  get<T = any>(url: string, config?: any): ApiPromise<T> { return instance.get(url, config) as any },
  post<T = any>(url: string, data?: any, config?: any): ApiPromise<T> { return instance.post(url, data, config) as any },
  put<T = any>(url: string, data?: any, config?: any): ApiPromise<T> { return instance.put(url, data, config) as any },
  delete<T = any>(url: string, config?: any): ApiPromise<T> { return instance.delete(url, config) as any },
}

export default request
