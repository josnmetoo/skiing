<template>
  <div class="h">
  <p v-show="ss=uu" class="huo">
  暂无收藏
</p>
<div class="ls" v-for="val in arr" @click="jx(val.gid)" data-plant-height="1">
    <img class="img" :src="val.pic+'_w720'" alt="" />
    <p class="p1">
      <span class="sp1">{{val.gname}}</span>
      <span class="sp2"><b>¥{{val.gprice}}</b><span>起</span></span>
    </p>
    <p class="p2">
      <img class="img2" src="../../assets/pxweizhi.png" alt="" />
      <span class="sp1">{{val.rname}}</span>
      <span class="sp2">
        {{val.sname}}
      </span>
      <img  class="img3" src="../../assets/pxpingjia.png" alt="" />
      <span class="iu">{{val.score}}分</span>
    </p>
  
      
    
  </div>

  </div>
  
</template>

<script>

import Config from '../../config/config.vue'

export default {
 
  data () {
    return {
      arr:'', 
      uu:false
     }
  },created:function(){
         this.ueid=sessionStorage.getItem('xid');
            this.$http.get(Config.api.list,{params:{type:1},headers:{'X-SESSION-ID':this.ueid}}).then(
      function(response){
       ///console.log(response.data.data)
      this.arr=response.data.data;
       if(this.arr.length==0){
          this.uu=true;
        }
}, function(response){
    // 响应错误回调
})
  }, mounted:function () {
   
   
      
      
    
  },
  methods:{
    jx(gg){
      var f = $('.ls');
        this.$router.push('/Bespoke?id='+gg+'&type='+f.data("plant-height"))
    }
  } 
  
}
</script>
<style scoped>
.huo{
  color: #666;
  font-size: 0.75rem;
  text-align: center;
}
.h{
 
  
  margin-top:0.5rem;
}
.p2 .img3{
  margin-left: 1rem;
  width: 0.65rem;
  height: 0.65rem;
  margin-top: 0.05rem;
}
.p2 .iu{
      float: left;
    font-size: 0.65rem;
    line-height: 0.85rem;
}
.bd{
  width: 100%;
  height: 5rem;
}
.ls{

   margin:0.5rem auto;
  background: #fff;
  height: 12.8rem;
    padding: 0 0.8rem;
        margin-bottom: 0.5rem
}
img{
  vertical-align: middle;
}
.ls .img{
  width: 100%; height:8.875rem; 
  margin-top:0.5rem;
}
.p1,.p2,.p3 {
  overflow: hidden;
  
    margin: 0 auto;
    /* line-height: 0.95rem; */
    /* line-height: 1rem; */
    line-height: 0.7rem;
    /* padding: 0.2rem 0; */
}
.p1 .sp1{
  float: left;
  font-size: 0.7rem;
  line-height: 1.75rem;
  color: #000;
}
.p1 .sp2{
  float: right;
  color: #fc5c62;
  font-size: 0.75rem;
  line-height: 1.75rem;
}
.sp2 span{
  font-size: 0.5rem;
}
.sp2 b{
  font-size: 0.7rem;
}
.p3 span{
  padding-bottom: 0.7rem;
}
.p2 img{
  width:0.63rem;
  height: 0.75rem;
  float: left;
  margin-bottom: 0.3rem;
  margin-right: 0.3rem
}
.p2 .sp1,.sp2{
      float: left;
    font-size: 0.65rem;
    line-height: 0.85rem;
}
.p3 img{
  width:0.6rem;
  height: 0.6rem;
  float: left;
  margin-right: 0.3rem
}
.p3 span{
  float: left;font-size: 0.55rem;
  line-height: 0.55rem;
    
}
.p3{
  padding-bottom: 0.5rem;
}
.p1{
  margin-top: 0.3rem;
  font-size: 0.7rem;
}
</style>
