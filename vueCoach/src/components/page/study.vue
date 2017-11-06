<template>
  <div class="study">
    <div class="stuNav">
        <ul>
          <span class="centerLine"></span>
          <!-- <li><router-link to="/study/studyProject"><span>学习进度</span></router-link></li>
          <li><router-link to="/study/studyVideo"><span>历史视频</span></router-link></li> -->
          <li v-for="(relation,index) in relations"  v-on:click="relationClick(index)" v-bind:class="{checked:index==nowIndex}" v-bind:id="relation.id"  >
             {{relation.text}}

      </li>

        </ul>
    </div>
     <div class="main2">
     <!-- 路由匹配到的组件将渲染在这里 -->
       <router-view></router-view>
     </div>

  </div>
</template>

<script>
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../../libs/sessid.js'
import Vue from 'vue'
import now from './studyProject.vue'
import history from './studyVideo.vue'
export default {
  data() {
    return{
      relations: [
   {text:'学习进度',id:'program',url:'/study/studyProject'},
   {text:'历史视频',id:'person',url:'/study/studyVideo'},

  ],
  nowIndex:0,

    }
  },
  created:function () {
    document.title = "学习档案";
    var viewWidth = document.documentElement.clientWidth;
    var viewHeight = document.documentElement.clientHeight;

    var sessionId = localStorage.getItem("json");
    sessid();
    // 拿到sessionId


  },
  mounted:function () {

  },
  methods:{
    relationClick:function(index){
       this.$router.replace(this.relations[index].url)
       this.nowIndex=index;
      }

  }
}
</script>

<style scoped>
.centerLine{
  display: inline-block;
  width: 1px;
  height: 1rem;
  background-color:rgb(188, 188, 188);
  position: relative;
  left: 50%;
  top:0rem;
  transform: translate(-50%);
}
.checked{
  color: #4ab6b5 !important;
}
.router-link-active{
  color: #4ab6b5;
}
body{
  background-color: #f5f5f5;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color:#7f7f7f;
}
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, figure, /*结构元素*/
dl, dt, dd, ul, ol, li, /*列表元素*/
fieldset, lengend, button, input, textarea, /*表单元素*/
th, td, /*表格元素*/
pre /*文本格式元素*/ {
    margin: 0;
}

/*清除内边距*/
ul, ol, menu {
    padding: 0;
}


/*重置列表元素*/
ul, ol {
    list-style: none;
}


/*将字体扶正*/
address, cite, dfn, em, var {
    font-style: normal;
}


/*清下划线*/
a {
    text-decoration: none;
    color: black;
}
/*鼠标略过a标签，显示下划线*/
a:hover {
    /*text-decoration: underline;*/
}
.stuNav{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1000;
  background-color: #fff;
  height: 2.5rem;
  line-height: 2.5rem;
  border-bottom: 1px solid #f5f5f5;
}
.stuNav ul{
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stuNav ul li{
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  font-size: 0.7rem;
}
.stuNav ul li a{
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 0.7rem;
}
.main2{
  padding-bottom: 1rem;
  overflow: hidden;
}


</style>
