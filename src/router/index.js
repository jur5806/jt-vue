import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../view/index.vue'
import Library from '../view/LibraryIndex'
import layer from '@/view/layer'

// const Library = r => require.ensure([], () => r(require('../view/LibraryIndex')), 'Library')

Vue.use(Router)

const positionList = () => import('../view/人才推荐/职位列表.vue')
const userManagement = () => import('../view/人才推荐/用户管理.vue')
const roleConfiguration = () => import('../view/人才推荐/角色配置.vue')
const NewPosition = () => import('../view/jobManagement/NewPosition.vue')
const PublishedPosition = () => import('../view/jobManagement/PublishedPosition.vue');

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
            { path: '/index/positionList', hidden: false, component: positionList, name: '首页职位区' ,meta:{keepAlive: false }},
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
          path: '/userManagement',
          name: '用户管理',
          hidden: false,
          leaf: true,
          redirect: '/index/userManagement',
          component: layer,
          children:[
            { path: '/index/userManagement', hidden: false, component: userManagement, name: '用户列表' ,meta:{keepAlive: false }},
            { path: '/index/roleConfiguration', hidden: false, component: roleConfiguration, name: '角色配置' ,meta:{keepAlive: false }},
          ]
        },
        {
          path: '/library',
          name: '职位管理',
          component: layer,
          hidden: false,
          leaf: true,
          children:[
            { path: '/index/NewPosition', hidden: false, component: NewPosition, name: '职位发布' ,meta:{keepAlive: false }},
            { path: '/index/PublishedPosition', hidden: false, component: PublishedPosition, name: '我发布的职位' ,meta:{keepAlive: false }},
          ]
        },

      ]
    },
    {
      path: '/',
      name: '登录',
      component: () => import('../view/Login.vue'),
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
