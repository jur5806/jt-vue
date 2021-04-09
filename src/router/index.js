import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../view/index.vue'
import Library from '../view/LibraryIndex'
import layer from '@/view/layer'

// const Library = r => require.ensure([], () => r(require('../view/LibraryIndex')), 'Library')

Vue.use(Router)

const positionList = () => import('../view/人才推荐/职位列表.vue')



export default new Router({
  //  去除#访问
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      hidden: false,
      leaf: false,
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: '首页',
          component: layer,
          hidden: false,
          redirect: '/index/positionList',
          leaf: true,
          children:[
            { path: '/index/positionList', hidden: false, component: positionList, name: '我的工作台2' ,meta:{keepAlive: false }},
          ]
        },
        {
          path: '/library',
          name: '我的推荐',
          hidden: false,
          leaf: true,
          component: Library,
          children:[]
        },
        {
          path: '/library',
          name: '用户管理',
          hidden: false,
          leaf: true,
          component: Library,
          children:[]
        },
        {
          path: '/library',
          name: '权限管理',
          component: Library,
          hidden: false,
          leaf: true,
          children:[]
        },

      ]
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../view/Appindex.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../view/Register.vue')
    },
    {
      path: '/accountSettings',
      name: 'accountSettings',
      component: () => import('../view/账号设置.vue')
    }
  ]
})
