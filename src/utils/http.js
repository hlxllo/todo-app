import axios from 'axios'

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => config, e => Promise.reject(e))

// axios响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => Promise.reject(e))


export default httpInstance