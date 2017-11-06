<template>
    <!-- <hello></hello> -->
    <div class="name">
    <div class="nav">
        <ul>
         <li @click="kk()"><router-link to="/home/hot"><span>
           
          <img src="../assets/fuwu2.png" alt="" class="img2 lk">
           <img src="../assets/fuwu.png" alt="" class="img2 bk">
        </span><span class="jjj">服务</span></router-link></li>
         <li @click="ks()"><a><span>
           
          <img src="../assets/kj.png" alt="" class="img sc">
           <img src="../assets/jk.png" alt="" class="img sk">
        </span><span class="wo1">成就</span></a></li>
          <li @click="kb()"><a><span>
            <img src="../assets/gr2.png" alt="" class="img1 jj">
            <img src="../assets/ren.png" alt="" class="img1 ll">
         
          </span><span class="wo">我的</span></a></li>
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
sid:"",
linshi:''
    }
  },
  components: {

    
  }, 
  mounted:function () {
     if (window.location.hash=="#/About") {
       $('.ll').css("display","none");
      $('.jj').css("display","block");
      $('.bk').css("display","none");
      $('.wo').css("color","#4ab6b5");
      $('.jjj').css("color","#bcbcbc");
      $('.wo1').css("color","#bcbcbc");
        $('.sc').css("display","none");
          $('.sk').css("display","block");
      }
   },
   methods:{
    ks(){
this.sid=sessionStorage.getItem('xid');
console.log(sessionStorage.getItem('xid'));
this.linshi=sessionStorage.getItem('linshi');
      if(this.linshi=='111'){
        
         this.$router.replace("/Kcall");
      }else{
          this.$router.push("/Page");
      }
       $('.wo1').css("color","#4ab6b5");
        $('.sc').css("display","block");
         $('.sk').css("display","none");
         $('.bk').css("display","none");
          $('.jjj').css("color","#bcbcbc");
            $('.jj').css("display","none");
              $('.ll').css("display","block");
               $('.wo').css("color","#bcbcbc");
    },
    kk(){

       $('.bk').css("display","block");
      $('.jj').css("display","none");
       $('.sc').css("display","none");
      $('.ll').css("display","block");
      $('.wo').css("color","#bcbcbc");
       $('.jjj').css("color","#4ab6b5");
        $('.wo1').css("color","#bcbcbc");
          $('.sk').css("display","block");

    },
    kb(){
      this.linshi=sessionStorage.getItem('linshi');
      if(this.linshi=='111'){
      
         this.$router.replace("/Kcall");
      }else{
          this.$router.push("/About");
      }
      $('.ll').css("display","none");
      $('.jj').css("display","block");
      $('.bk').css("display","none");
      $('.wo').css("color","#4ab6b5");
      $('.jjj').css("color","#bcbcbc");
      $('.wo1').css("color","#bcbcbc");
        $('.sc').css("display","none");
          $('.sk').css("display","block");
    }
   }
}
</script>

<style>
.img{
  width: 1rem;
  height: 1.1rem;
}
body{
      background-color: #ededed;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      color:#7f7f7f;
}
  *{
    margin:0;
    padding: 0px;
  }
  a{
    text-decoration: none;
  }
.nav{
      position: fixed;
      width: 100%;
      left: 0px;
      bottom: 0px;
      height: 2.35rem;
      z-index: 10;
      border-top: 1px solid #ededed;
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
                  font-size: 0.5rem;
                 
}
.nav .jjj{
       
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
                                                 /* width:90%;*/
                                                  height: 80%;
}
.nav ul li:last-of-type a span:first-of-type img{
                                                   /* width: 90%;*/
                                                    height: 80%;
}
.main{
      width: 100%;
      margin-bottom: 0;
}
</style>