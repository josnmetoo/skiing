

// 这里面负责写路由映射，便于管理


// 引入路由模块并使用它
import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../components/Home'
// 预定页的二级路由
import readme from '../components/readme'
import now from '../components/page/now'
import history from '../components/page/history'
import end from '../components/page/end'


//开启debug模式
// Vue.config.debug = true;
Vue.use(VueRouter)



// 创建路由实例并配置路由映射
// path:'*',redirect:'/home'  重定向到path是/home的映射
const router = new VueRouter({
  routes:[{
    path :'/' ,
    component: require('../components/login.vue')
  },{
    path:'/readme',
    component: readme,
    children:[
      {
      	path: '/home',
        component: require('../components/Home.vue'),
        children: [
          {
            path:'/home',
            component: now,
          },
          {
            path:'/home/now',
            component: now,
          },
          {
            path:'/home/history',
            component: history,
          },
          {
            path:'/home/end',
            component: end,
          },
        ]
      },{
      	path: '/About', component: require('../components/About.vue')
      }
    ]
  },
  {
    path :'/login' ,
    component: require('../components/login.vue')
  },{
    path:"/calendar",
    component: require('../components/page/calendar.vue')
  },
  {
    path:"/setup",
    component: require('../components/page/setUp.vue')
  },{
    path:"/taskDetail",
    component: require('../components/page/taskDetail.vue')
  },{
    path:"/startClass",
    component: require('../components/page/startClass.vue')
  },{
    path:"/changePassword",
    component: require('../components/page/changePassword.vue')
  },{
    path:"/study",
    component: require("../components/page/study.vue"),
    children: [
      {
        path:'/study/studyProject',
        component: require("../components/page/studyProject.vue"),
      },
      {
        path:'/study/studyVideo',
        component: require("../components/page/studyVideo.vue"),
      },
    ]
  },
  {
    path:"/study/upload",
    component:require("../components/page/upload.vue"),
  }

]
})

// path :'*' ,redirect: '/home ' 设置为默认路径
//
// 输出router
export default router;
