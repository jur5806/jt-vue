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
 let userInfoEdit = (data) => axios.post(`/march/admin/userUpdate`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
/**
 * 用户信息查询
 * 字段
 */
 let userDetail = (userId) => axios.get('/march/admin/userDetail?userId=' + userId);

 /**
 * 用户信息列表
 * 字段
 */
  let userList = () => axios.get('/march/admin/userList');

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
    /**
   * 
   * 首页职位区 
   */
  let recruitList = (params) => axios.get('/march/recruitList',{params: params});

  /**
 * 修改状态
 * 
 */
 let statusUpdate = (data) => axios.put(`/march/admin/userStatus`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  /**
 * 用户信息修改及分配角色
 * 
 */
 let adminUserUpdate = (data) => axios.post(`/march/admin/user`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
/**
 * 职位信息上传
 * 
 */
 let recruitsUpdate = (data) => axios.put(`/march/updateRecruit`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
 
/* 删除职位列表
 * 
 */
  let deleRecruit = (recruitId) => axios.get('/march/deleRecruit?recruitId='+recruitId);

  /**
 * HR管理的职位列表
 */
let hrPosition = (userId) => axios.get('/march/getByhrIdList?hrId='+userId);

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
  let resumetDel = (resumeInfoId) => axios.get('/march/deleResumeInfo?resumeInfoId='+resumeInfoId);

  // let resumetDel = (data) => axios.post(`/march/deleResumeInfo`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

  let recruitAdd = (data) => axios.post(`/march/recruitAdd`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
/* 获取路由权限
 * 
 */
let getMenu = () => axios.get('/march/menu');

/**
 * 积分列表
 */
let pointsList = () => axios.get('/march/pointsList')

/**
 * 更改角色状态
 * 
 */
let roleStatusUpdate = (data) => axios.put(`/march/role/status`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
 
/**
 * 更改角色信息
 * 
 */
let roleInfoUpdate = (data) => axios.put(`/march/admin/role`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

/**
 * 更改角色路由
 * 
 */
let roleMenuUpdate = (rid,data) => axios.put(`/march/admin/role/menu?rid=`+rid,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
 /** 
 * HR管理的简历列表
 */
 let hrResumeList = (params) => axios.get(`/march/getByhrIdResumeList`,{params: params});

 /** 
 * 获取我的积分
 */
 let pointsIdList = (params) => axios.get(` /march/pointsIdList`,{params: params});


  /*
  积分变动处理
   */
  let pointsInfoAdd = (data) => axios.post(`/march/pointsInfoAdd`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

 
 /** 
 * 查看职位信息
 */
 let LookById = (params) => axios.get(`/march/LookById`,{params: params});


  /** 
 * 查看职位信息
 */
  let resumeInfoList = () => axios.get(` /march/resumeInfoList`);

 /** 
 * 获取积分设置
 */
 let integeralList = (params) => axios.get(` /march/integeralList`,{params: params});

   /*
  积分配置修改
   */
let integeralUpdata = (data) => axios.post(`/march/integeralUpdata`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

 /** 
 * 获取抵扣原因列表
 */
 let reasonList = (params) => axios.get(` /march/reasonList`,{params: params});

   /*
  更新抵扣原因
   */
let reasonUpdata = (data) => axios.post(`/march/reasonUpdata`,JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

 /**
 * 删除抵扣种类
 * 字段
 */
  let deleReason = (id) => axios.get('/march/deleReason?id='+id);
 
export {
  checkLogin, addBooks, getBooks, searchBookPages, deleteBooks, categoriesBooks, register, logout,
  userInfoEdit, userDetail, userList, roleList, deleUser, resetPassword, rolePerm, roleMenu, addRole,
  recruitList, statusUpdate, recruitsUpdate, deleRecruit, recruitAdd, getMenu,resumetAdd,resumetDel,
  myResumeInfo, pointsList, adminUserUpdate, roleStatusUpdate, roleInfoUpdate, roleMenuUpdate,hrResumeList,hrPosition,
  pointsIdList, pointsInfoAdd, LookById, resumeInfoList, integeralList, integeralUpdata, reasonList, reasonUpdata,
  deleReason,
}
