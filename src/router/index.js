import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home'
import Library from '../pages/LibraryIndex'

// const Library = r => require.ensure([], () => r(require('../pages/LibraryIndex')), 'Library')

Vue.use(Router)

export default new Router({
  //  去除#访问
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Appindex',
          component: () => import('../pages/Appindex.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: Library,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/Appindex.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/Register.vue')
    }
  ]
})
