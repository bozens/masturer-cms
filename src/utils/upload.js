import axios from 'axios'

const service = axios.create({
  baseURL: 'http://meishule.wuyao.com:6001/api', // 本地做反向代理,所有的接口地址前面都会加上baseURL
  timeout: 2000, // 请求超过2s自动取消
  responseType: 'json',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
})
// 请求前的拦截
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
  },
  error => {
    return Promise.reject(error.data.error.message)
  }
)

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  res => {
    console.log('拦截', res)
    return res.data
  },
  error => {
    const errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(errorInfo)
  }
)

export default service
