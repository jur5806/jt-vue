import axios from 'axios'

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// axios.interceptors.request.use((config) => {
//   // 在发送请求之前做些什么
//   return config
// }, (error) => {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

/**
* 登录请求
* 参数：
* 参数名 必选 类型 说明
*/
let checkLogin = (data) => axios.post(`/march/login`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })

/**
* 新增图书
* 参数：
* 参数名 必选 类型 说明
*/
let addBooks = (data) => axios.post(`/march/books`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })

/**
 *获取书籍信息
 *参数名 必选 类型 说明
 */
let getBooks = () => axios.get('/march/getBooks')

/**
 *切换页面书籍信息
 *参数名 必选 类型 说明
 */
let searchBookPages = (keywords) => axios.get('/march/search?keywords=' + keywords)

/**
* 删除图书
* 参数：
* 参数名 必选 类型 说明
*/
let deleteBooks = (data) => axios.post(`/march/delete`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })

/**
 *分类获取书籍信息
 *参数名 必选 类型 说明
 */
let categoriesBooks = (cid) => axios.get('/march/categories/' + cid + '/books')

export {
  checkLogin, addBooks, getBooks, searchBookPages, deleteBooks, categoriesBooks

}
