import axios from 'axios'
import qs from 'qs'
import 'es6-promise/auto'

axios.defaults.timeout = 8080
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data, {
      arrayFormat: 'brackets'
    })
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.data.code != 20000) {
    return Promise.reject(res)
  }
  return res
}, (error) => {
  return Promise.reject(error)
})
export default axios