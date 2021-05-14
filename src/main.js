// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import components from './components/'
import store from './story'
import SvgIcon from './components/SvgIcon'// svg component
import './icons' // icon
import * as getData from './service/getData'
import layer from '@/view/layer'
// register globally
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.axios = axios
axios.defaults.withCredentials = true
window.Promise = Promise
//  设置定义的组件命名（带符号后）首字母大写
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  console.log(name)
  Vue.component(`v${name}`, components[key])
})

router.beforeEach((to, from, next) => {
  console.log(sessionStorage.getItem("userName"));
  if (sessionStorage.getItem("userName")) {
    console.log(88888999);
    initAdminMenu(router, store)
  }
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("userName")) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0 && window.location.pathname != '/login') {
    return
  }
  getData.getMenu().then(res => {
    if (res && res.status === 200) {
      var fmtRoutes = formatRoutes(res.data.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: layer,
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
