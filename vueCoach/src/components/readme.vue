<template>
    <!-- <hello></hello> -->
    <div class="name">
    <div class="nav">
        <ul>
          <li><router-link to="/home/now" @click="getUrl1()"><span>
            <img src="../assets/ding2.png" alt="" class="img1">
          <img src="../assets/ding.png" alt="" class="img2">
        </span><span>订单</span></router-link></li>
          <li><router-link to="/About" @click="getUrl2()"><span>
            <img src="../assets/user2.png" alt="" class="img1">
            <img src="../assets/user.png" alt="" class="img2">
          </span><span>我的</span></router-link></li>
        </ul>
    </div>
     <div class="main">
     <!-- 路由匹配到的组件将渲染在这里 -->
       <router-view></router-view>
     </div>
   </div>
</template>

<script>
import Vue from 'vue'
import home from './Home.vue'
import about from './About.vue'
export default {
  name:'name',
  data() {
    return{

    }
  },
  components: {
  },
  methods:{

  }
}
</script>

<style>
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
.nav{
  position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    height: 2.5rem;
    z-index: 10;
    background-color: #fff;
}
.nav ul{
  background-color: #fff;
list-style: none;
 margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.nav ul li{
  height: 2.35rem;
  text-align: center;
  background-color: #fff;
}
.nav ul li a{
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}
.nav ul li a span{
  display: inline-block;
  float: left;
  width: 100%;
  height: 1.175rem;
  line-height: 1.175rem;
  font-size: 0.6rem;
  color: #dedede;
}
.nav ul li a span:first-of-type{
  position: relative;
  margin-top: 0.3rem;
}
.nav ul li a span:last-of-type{
  margin-top: -0.1rem;
}
.nav ul li a span:first-of-type img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.nav ul li:first-of-type a span:first-of-type img{
  /*width: 70%;*/
  height: 72%;
}
.nav ul li:last-of-type a span:first-of-type img{
  /*width: 70%;*/
  height: 70%;
}
.nav ul li a span:first-of-type .img2{
  display:none;
}
.nav .router-link-active span{
  color: #6cc3ab !important;
}
.nav .router-link-active .img2{
  display: inline-block !important;
}
.nav .router-link-active .img1{
  display: none;
}

.main{
  width: 100%;
  margin-bottom: 4rem;
}
</style>
