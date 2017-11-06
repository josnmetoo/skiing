<template>
<div class="hot">
<div class="box">
  <mt-swipe :auto="3000">
  <mt-swipe-item><img src="../../assets/appk.png" alt="" @click="Miss()"/></mt-swipe-item>
  <mt-swipe-item><img src="../../assets/app.png" alt="" @click="jie()"/></mt-swipe-item>
 
</mt-swipe>
</div>
<p class="cls "> - - 精品课堂 - -</p>
 
<div class="box cls1" @click="jin()">

  <img src="../../assets/xunlian.png">
</div>




<div class="ko"></div>
  </div>




</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  data() {
    return{
      id:''
    }
  },
  created:function(){
   
  },
  methods:{
    jin(){
      var juj="42d7cb7c0d1d447484a76c8b8a2e75d9"
 this.$router.push('/Bespoke?id='+juj+'&type='+1)
    },
    gu(){
       localStorage.setItem('type',1);
       localStorage.setItem('fid','1b44bb6c786e4b649ce8e32426ebac5b');
       this.id="d2247ee88f4e4a1fbabae45d03dda5f0"
      var ui="1b44bb6c786e4b649ce8e32426ebac5b"
   this.$router.push('/Xqy?id='+this.id+'&type='+ui);
    },
    Miss(){
       this.$router.push("/Sncar")//到指定的季卡详情页面
    },
    jie(){
       this.$router.push("/Apps")
    }
  }
}
</script>

<style scoped>
.box .ke{
  top: 4.65rem;color: #fff;
  font-size: 0.6rem;
  left: 8.5rem;
}
.box .pack{
  top: 4.65rem;color: #fff;
  font-size: 0.6rem;
  right:0.5rem; 
}
.box .tech{
  width: 1.5rem; height: 1.5rem; border-radius: 50%;
  position: absolute; top: 0.5rem;left: 0.5rem
}
.box .name{
  font-size: 0.75rem;
  top: 0.8rem;
  color: #fff;
  left:2.375rem; 
}
.box .form{
  width: 0.55rem;
  height: 0.55rem;
  position: absolute;
  left: 0.55rem;
  top: 4.75rem
}
.bgt{
  width: 100%; height: 100%; 
  position: absolute;top: 0;
  
}
.box span{
  position: absolute;
}
.box .sp1{
  font-size: 0.75rem;
  color: #fff;
  top:0.5rem; 
  left: 0.5rem;
}
.box .sp5{
  font-size: 0.5rem;
  color: #fff;
  top:5.7rem; 
  left: 1.35rem;
}
.box .sp2{
  font-size: 0.5rem;
  color: #fff;
  top:4.65rem; 
  left: 1.35rem;
}
.box .sp3{
  font-size: 0.5rem;
  color: #fff;
  top:4.65rem; 
  left: 4rem;
}
.box .sp4{
  font-size: 0.8rem;
  color: #fff;
  bottom:0.5rem; 
  right: 0.5rem;
}
.box .img1,.img2,.img3{
  position: absolute;
}
.box .img1{
 width: 0.55rem;
 height: 0.6rem;
 left: 0.55rem;
 top: 4.6rem;
}
.box .img2{
 width: 0.325rem;
 height: 0.65rem;
 left: 3.375rem;
 top: 4.6rem;
}
.box .img3{
 width: 0.65rem;
 height: 0.65rem;
 left: 0.5rem;
 top: 5.8rem;
}
.box{
position: relative;
    top: 0.5rem;
    /* left: 0.5rem; */
    width: 12.6rem;
    height: 6.7rem;
    /* margin-bottom: 1rem; */
    margin: 0rem auto;
    margin-bottom: 1rem;
}
  .box img{
    width: 100%; height: 100%;
  }
  .ko{
    width: 100%;
    height: 5rem;
    
  }
.cls{
width:12.6rem ;

  left: 0.5rem;
  text-align: center;
  font-size:0.6rem;
  top: 7.875rem; 
  margin:0 auto;

}

.cls1{
  
}
.p{
  top:16.25rem;
}
.cls2{
  
}
</style>