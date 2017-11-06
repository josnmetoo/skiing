
<template>
  <div class="h">
  <router-link to="/Xqy">
  <div class="hua">
    <img class="teacher" src="../../assets/tehchers.png">
    <img class="ding" src="../../assets/teacher.png">
    <span class="name">
      辛晶
    </span>
    <p class="ping">
      <img class="img2" src="../../assets/pingfen.png">
      <span class="sp1">9.5分</span>
      <img class="img3" src="../../assets/xuxi.png">
      <span class="sp2">126次</span>
    </p >
    <p class="qian">￥<b>1560</b>起</p>
    <p class="zhong">
      <span>滑行</span>
      <span>平滑</span>
      
      <span>野雪</span>
      <span>卡宾</span>
    </p>
  </div>
  </router-link>
  <div class="bg"></div>
 <div class="hua">
    <img class="teacher" src="../../assets/tehchers.png">
    <img class="ding" src="../../assets/teacher.png">
    <span class="name">
      辛晶
    </span>
    <p class="ping">
      <img class="img2" src="../../assets/pingfen.png">
      <span class="sp1">9.5分</span>
      <img class="img3" src="../../assets/xuxi.png">
      <span class="sp2">126次</span>
    </p >
    <p class="qian">￥<b>1560</b>起</p>
    <p class="zhong">
      <span>滑行</span>
      <span>平滑</span>
      
      <span>野雪</span>
      <span>卡宾</span>
    </p>
  </div>
  </div>
  
</template>

<script>

import Config from '../../config/config.vue'
export default {
 
  data () {
    return {
    }
  },created:function(){
    var id=localStorage.getItem('regionId')
    console.log(id)
    this.$http.get(Config.api.sinf,{params:{regionId: id, serviceType: 1}}).then(
      function(response){
        var res=response.data.data;
        this.arr=res
    console.log(res)// 响应成功回调
}, function(response){
    // 响应错误回调
})
  }
}
</script>
<style scoped>
    .h {
      width: 12.5rem;
      height:21.625rem; 
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      border: 1px solid #ccc;

    }
    .hua{
      width: 100%; height: 11.5rem;
      position: relative;
      background: #fff;
    }
    .hua .teacher{ width: 100%; height:6.5rem;  }
  .ding{
    position: absolute;
    left:0.75rem;
    top:5.25rem; 
    border-radius: 50%; border:2px solid #fff;
    width:2.375rem; 

  }
  .name{
    position: absolute; left:1.1rem; top:7.7rem; 
    font-size:0.75rem;  
  }
  .ping{
    width: 100%; height: 1.5rem; position: relative;
  }
  .ping img{  width:0.75rem; height: 0.75rem; position:absolute;top: 0.5rem;   }
  .img2{ left:6.5rem;    }
  .img3{ right:2.6rem;  }
  .ping span{ position: absolute;
    font-size: 0.7rem; top: 0.4rem;
  }
  .sp1{left: 7.5rem;}
  .sp2{ left: 10rem; }
  .qian{ color:#fc5c62 ; width: 11.9rem; height: 1.5rem; line-height: 1.5rem; font-size:0.75rem; text-align: right;  }
  .zhong{ width:11.9rem; height: 1.5rem; font-size: 0.6rem; margin-top: 0.2rem   }
  .zhong span{ float: right; width:1.7rem;  margin-right:0.3rem; background:#ededed; text-align: center;     }
  .bg{ background: #ededed; width: 100%; height: 0.75rem; }
  .h a{ color: #666; }
</style>
