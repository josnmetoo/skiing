

// 这里面负责写路由映射，便于管理


// 引入路由模块并使用它
import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../components/Home'
// 预定页的二级路由
import readme from '../components/readme'
import hot from '../components/page/hot'
import history from '../components/page/history'
import end from '../components/page/end'
import wkf from '../components/page/wkf'
import wkj from '../components/page/wkj'
import wkk from '../components/page/wkk'
import wky from '../components/page/wky'




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
            component: hot,
          },
          {
            path:'/home/hot',
            component: hot,
          },
          {
            path:'/home/history',
            component: history,
          },
          {
            path:'/home/end',
            component: end,
          },
          ,
          {
            path:'/home/wkf',
            component: wkf,
          },
          ,
          {
            path:'/home/wkj',
            component: wkj,
          },
          {
            path:'/home/wky',
            component: wky,
          },
          {
            path:'/home/wkk',
            component: wkk,
          },
          {
            path:'/home/jxy',
            component:require('../components/page/jxy.vue'),
          }
        ]
      }
      ,{
        path: '/About', component: require('../components/About.vue')
      },
      ,{
        path: '/Page', component: require('../components/page.vue')
      }
    ]
  },
  {
    path :'/login' ,
    component: require('../components/login.vue')
  },
      {
        path: '/Xqy', component: require('../components/page/xiangqingye.vue')
      }, {
        path: '/Grsz', component: require('../components/page/gerenshezhi.vue')

      }, {
        path: '/Zhsz', component: require('../components/page/zhanghushezhi.vue')
      }, {
        path: '/Zfu', component: require('../components/page/zhifu.vue')
      }, {
        path: '/Bzfu', component: require('../components/page/bzhifu.vue')
      },  {
        path: '/Xzxq', component: require('../components/page/sonw.vue')
      },  {
        path: '/Ad', component: require('../components/page/add.vue')
      }, {
        path: '/Cxs', component: require('../components/page/info.vue')
      }, {
        path: '/Qian', component: require('../components/page/qian.vue')
      }, {
        path: '/Order', component: require('../components/page/order.vue')
      }, {
        path: '/Add', component: require('../components/page/addr.vue')
      }, {
        path: '/Bespoke', component: require('../components/page/bespoke.vue')
      }, {
        path: '/List', component: require('../components/page/list.vue'),
        children:[
        {path: '/Unpaid', component: require('../components/page/unpaid.vue')},
        {
          path: '/Paid', component: require('../components/page/paid.vue')
        },{
          path: '/Ping', component: require('../components/page/ping.vue')
        },{
          path: '/No', component: require('../components/page/no.vue')
        }]
      }, {
        path: '/Pold', component: require('../components/page/piold.vue')
      }, {
        path: '/Xxi', component: require('../components/page/xiaoxi.vue')
      }, {
        path: '/House', component: require('../components/page/house.vue'),children:[
         {path: '/Teacher', component: require('../components/page/teacher.vue')},
        {
          path: '/Class', component: require('../components/page/classes.vue')
        }, {
        path: '/House', component: require('../components/page/teacher.vue')}
        ]
      },{
        path:'/study',
        component: require("../components/page/study.vue"),
        children: [
          {
            path:'/study/dan',
            component: require("../components/page/dan.vue"),
          },
          {
            path:'/study/shuang',
            component: require("../components/page/shuang.vue"),
          },
        ]
      },
      {
        path:"/study/studyVideo",
        component: require("../components/page/studyVideo.vue"),
      },
      {
        path:"/Detail",
        component: require("../components/page/orderDetail.vue"),
      },
      {
        path:"/Evaluation",
        component: require("../components/page/evaluation.vue"),
      }, {
        path: '/Magss', component: require('../components/page/masses.vue')
      }
      , {
        path: '/Call', component: require('../components/page/call.vue')
      }, {
        path: '/Miss', component: require('../components/page/miss.vue')
      }, {
        path: '/Jzhifu', component: require('../components/page/jzhuf.vue')
      }, {
        path: '/Jika', component: require('../components/page/jika.vue'),children:[
         {path: '/Mis', component: require('../components/page/mist.vue')},
        {
          path: '/Nice', component: require('../components/page/nice.vue')
        }, {
        path: '/Jika', component: require('../components/page/mist.vue')}
        ]
      } , {
        path: '/Make', component: require('../components/page/make.vue')
      } , {
        path: '/Member', component: require('../components/page/member.vue')
      }, {
        path: '/Misseb', component: require('../components/page/misseb.vue')
      }, {
        path: '/Mue', component: require('../components/page/payoff.vue')
      }, {
        path: '/Susses', component: require('../components/page/sussess.vue')
      }, {
        path: '/Toggle', component: require('../components/page/toggel.vue')
      }, {
        path: '/Compile', component: require('../components/page/compile.vue')
      }, {
        path: '/Mentt', component: require('../components/page/mentt.vue')
      }, {
        path: '/Social', component: require('../components/page/mocial.vue')
      }, {
        path: '/Kcall', component: require('../components/page/Kcall.vue')
      }, {
        path: '/Kmass', component: require('../components/page/massee.vue')
      }, {
        path: '/Apps', component: require('../components/page/APPs.vue')
      }, {
        path: '/Sncar', component: require('../components/page/sonwcar.vue')
      }, {
        path: '/one', component: require('../components/page/one.vue')
      }

]
})

// path :'*' ,redirect: '/home ' 设置为默认路径
//
// 输出router
export default router;
