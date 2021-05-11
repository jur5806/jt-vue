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

/**
* 删除图书
* 参数：
* 参数名 必选 类型 说明
*/
let register = (data) => axios.post(`/march/register`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })


/**
 * 退出登录-清除session接口
 */
let logout = () => axios.get(`/march/logout`);

/**
 * 用户信息修改
 * 字段
 */
 let userInfoEdit = (data) => axios.post(`/march/admin/user`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
/**
 * 用户信息查询
 * 字段
 */
 let userDetail = (username) => axios.get('/march/admin/userDetail?username=' + username);

 /**
 * 用户信息列表
 * 字段
 */
  let userList = () => axios.get('/march/admin/user');

 /**
 * 角色列表
 * 字段
 */
  let roleList = () => axios.get('/march/admin/role');
 /**
 * 删除用户
 * 字段
 */
  let deleUser = (id) => axios.get('/march/admin/deleUser?id='+id);
 /**
 * 重置密码
 * 字段
 */
  let resetPassword = (data) => axios.post(`/march/admin/password`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  

  let rolePerm = () => axios.get('/march/admin/role/perm');
  
  let roleMenu = () => axios.get('/march/admin/role/menu');
  
 /**
 * 添加角色
 * 字段
 */
  let addRole = (data) => axios.post(`/march/admin/role`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  
  let recruitList = () => axios.get('/march/recruitList');

  /**
 * 修改状态
 * 
 */
 let statusUpdate = (data) => axios.put(`/march/admin/userStatus`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
 let recruitsUpdate = (data) => axios.put(`/march/updateRecruit`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
 
/* 删除职位列表
 * 
 */
  let deleRecruit = (recruitId) => axios.get('/march/deleRecruit?recruitId='+recruitId);

/**
 * 我的推荐
 */
let myResumeInfo = (userId) => axios.get('/march/getResumeInfoByUserId?userId='+userId);

  /*
  简历上传
   */
  let resumetAdd = (data) => axios.post(`/march/resumeInfoAdd`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

  /*简历删除
  */
  let resumetDel = (data) => axios.post(`/march/deleResumeInfo`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

  let recruitAdd = (data) => axios.post(`/march/recruitAdd`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
/* 获取路由权限
 * 
 */
let getMenu = () => axios.get('/march/menu');
  
export {
  checkLogin, addBooks, getBooks, searchBookPages, deleteBooks, categoriesBooks, register, logout,
  userInfoEdit, userDetail, userList, roleList, deleUser, resetPassword, rolePerm, roleMenu, addRole,
  recruitList, statusUpdate, recruitsUpdate, deleRecruit, recruitAdd, getMenu,resumetAdd,resumetDel,
  myResumeInfo

}
