<template>

  <div class="home">
    <ul class="header">
      <!-- <router-link to="/home/now"><li class="li" @click="thisCss" ref="" value="">当前任务</li></router-link>
      <router-link to="/home/history"><li class="li" @click="thisCss" ref="" value="">历史任务</li></router-link>
      <router-link to="/home/end"><li class="li" @click="thisCss" ref="" value="">完结任务</li></router-link> -->
      <li v-for="(item,$index) in navItem" class="li"><router-link :to="item.url">{{item.text}}</router-link></li>
    </ul>
    <div class="task" id="task">
      <!-- 路由匹配到的组件将渲染在这里 -->
        <transition name="move" mode="out-in"><router-view></router-view></transition>

    </div>
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <ul>
      <li v-for="article in articles">

          <div class="m-img inl-block"><img v-bind:src="article.images.small"/></div>
       <div class="m-content inl-block">
          <div>{{article.title}}</div>
        <div>年份：{{article.year}}</div>
         <div>类型：{{article.subtype}}</div>
       </div>
      </li>
    </ul> -->

  </div>

</template>

<script>

// mounted 钩子函数  这里去请求豆瓣数据

// export default {
//   name: 'home',
//   data () {
//     return {
//       msg: '电影列表',
//       articles:[]
//     }
//   },
//   created:function(){  //这里mounted和created生命周期函数区别
//      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
//         headers: {
//
//         },
//         emulateJSON: true
//     }).then(function(response) {
//       // 这里是处理正确的回调
//         console.log(response.data);
//         this.articles = response.data.subjects
//         // this.articles = response.data["subjects"] 也可以
//
//     }, function(response) {
//         // 这里是处理错误的回调
//         console.log(response)
//     });
//   }
// }
import Vue from 'vue'
import now from './page/now.vue'
import history from './page/history.vue'
import end from './page/end.vue'

 export default {
  name:'home',
  data() {
    return {
      msg:"",
      navItem: [
  					{text:"计划任务",url:"/home/now"},
  					{text:"近期任务",url:"/home/history"},
  					{text:"历史任务",url:"/home/end"},
  				]
    }
  },
  components: {
  },

  mounted:function () {
  //   $(window).scroll(function () {
  //   var distance = $(window).scrollTop();
  //   console.log(distance);
  //   if(distance >= 62){
  //     $('.header').addClass('fixedTop');
  //   }else{
  //     $('.header').removeClass('fixedTop');
  //   }
  // });

  },
  methods:{
    thisCss() {

    },selectStyle (item, index) {
　　　　　　this.$nextTick(function () {
　　　　　　　　this.navItem.forEach(function (item) {
　　　　　　　　　　Vue.set(item,'active',false);
　　　　　　　　});
　　　　　　　　Vue.set(item,'active',true);
　　　　　　});
　　　　}
      }
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fixedTop{
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  z-index: 10;
}
.header li{
  width: 33%;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
}
.header li:nth-of-type(2){
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.header li a{
  font-size: 0.75rem;
  color: #bababa;
}
.active a{

}
.unactive a{

}
.router-link-active{
  color: #6cc3ab !important;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
ul li{
/*border-bottom: 1px solid #999;
padding: 10px 0;*/
}
.header{
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  height: 2.5rem;
  line-height: 2.5rem;
}
.header li{
  height: 1rem;
  line-height: 1rem;
}
.header li a{
  color: #ccc;
  width: 100%;
  height: 100%;
}

a{
  text-decoration: none;
}

.inl-block{
display: inline-block;
}

.m-img{

}
.m-content{
margin-left: 20px;
}
</style>
