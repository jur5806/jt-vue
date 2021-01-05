import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/**
* 获取单个确认支付信息
* 参数：
* 参数名 必选 类型 说明
*/
let checkLogin = (data) => axios.post(`/march/login`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })

export {
  checkLogin

}
