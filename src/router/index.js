import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../view/index.vue'
// import Home from '../components/home.vue'
// import Library from '../view/LibraryIndex'
import layer from '@/view/layer'

// const Library = r => require.ensure([], () => r(require('../view/LibraryIndex')), 'Library')

Vue.use(Router)
const positionList = () => import('../view/人才推荐/职位列表.vue');
const userManagement = () => import('../view/人才推荐/用户管理.vue');
const roleConfiguration = () => import('../view/人才推荐/角色配置.vue');
const myRecommend = () => import('../view/人才推荐/我的推荐.vue');
const pointsManagement = () => import('../view/人才推荐/积分列表.vue');
const NewPosition = () => import('../view/jobManagement/NewPosition.vue');
const PublishedPosition = () => import('../view/jobManagement/PublishedPosition.vue');
const complexTable = () => import('../view/jobManagement/complex-table.vue');
const ResumeUpload = () => import('../view/ResumeUpload/index.vue');
const pointsExchange = () => import('../view/pointsManagement/pointsExchange.vue');
const talentPool = () => import('../view/talentPool/LibraryIndex.vue');
const resumeInfoList = () => import('../view/talentPool/resumeList.vue');
const HrResume = () => import('../view/HR/Hr-Resume.vue');

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
          path: '/index/myRecommend',
          name: '我的推荐',
          hidden: false,
          leaf: true,
          component: layer,
          children:[
            { path: '/index/myRecommend', hidden: false, component: myRecommend, name: '我的推荐' ,meta:{keepAlive: false }},
          ]
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
          path: '/index/HrResume:hrId',
          name: '我收到的简历',
          hidden: false,
          leaf: true,
          component: layer,
          children:[
            { path: '/index/HrResume:hrId', hidden: false, component: HrResume, name: '我收到的简历' ,meta:{keepAlive: false }},
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
            { path: '/index/complexTable', hidden: false, component: complexTable, name: '我发布的职位1' ,meta:{keepAlive: false }},
          ]
        },
        {
          path: '/',
          component: layer,
          hidden: false,
          redirect: '/ResumeUpload',
          leaf: true,
          name: '简历上传',
          children:[
            { path: '/ResumeUpload', name: '简历上传', component: ResumeUpload ,meta:{ title: '职位区', icon: 'job' }},
          ]
        },
        {
          path: '/',
          component: layer,
          hidden: false,
          redirect: '/talentPool',
          leaf: true,
          name: '人才管理',
          children:[
            { path: '/talentPool/talentInfoList', name: '人才库', component: talentPool ,meta:{keepAlive: false }},
            { path: '/talentPool/resumeInfoList', name: '简历列表', component: resumeInfoList ,meta:{keepAlive: false }},
          ]
        },
        {
          path: '/index/pointsManagement',
          name: '积分管理',
          hidden: false,
          leaf: true,
          component: layer,
          children:[
            { path: '/index/pointsManagement', hidden: false, component: pointsManagement, name: '积分列表' ,meta:{keepAlive: false }},
            { path: '/index/pointsExchange', hidden: false, component: pointsExchange, name: '积分兑换物品' ,meta:{keepAlive: false }},
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
    },
    {
      path: '/detail/:recruitId',
      name: 'detail',
      component: () => import('../view/人才推荐/detail.vue')
    },
    {
      path: '/ResumeDetail',
      name: 'ResumeDetail',
      component: () => import('../view/ResumeUpload/ResumeDetail.vue')
    }
  ]
})
