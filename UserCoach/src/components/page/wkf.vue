<template>
  <div class="h">
<p  class="qi ">&nbsp;&nbsp;即将开放&nbsp;&nbsp;敬请期待</p>

<!-- 
  <div v-for="value in arr" class="hua" @click="ban(value.cid,value.monomerid,value.serviceType)">
  <div class="bg"></div>
  	<img class="teacher" src="../../assets/tehchers.png">
  	<img class="ding" :src="value.curl">
  	<span class="name">
  	{{value.cname}}
  	</span>
    <div >
     
  	<p class="ping">
  		<img class="img2" src="../../assets/pingfen.png">
  		<span class="sp1">9.5分</span>
  		<img class="img3" src="../../assets/xuxi.png">
  		<span class="sp2">{{value.creserve}}</span>
  	</p >
  	<p class="qian">￥<b>{{value.cprice}}</b>起</p>
  	<p class="zhong">
  		<span v-for="val in value.clable">{{val.lname}}</span>
  		
  	</p>
    </div> -->

  
 
 
  </div>
  
</template>

<script>

import Config from '../../config/config.vue'
export default {
 
  data () {
    return {
      arr:'',
    }
  },created:function(){

    var id=localStorage.getItem('regionId')
   
    this.$http.get(Config.api.sinf,{params:{regionId:1, serviceType:1}}).then(
      function(response){
        this.arr=response.data.data
        
      // console.log(this.arr)
     
}, function(response){
    // 响应错误回调
})
  },
  methods:{
    ban(id,gid,type){
      localStorage.setItem('fid',gid);
       localStorage.setItem('type',type);
      this.$router.push('/Xqy?id='+id+'&type='+gid);
      // console.log(id)
    }
  }
}
</script>
<style scoped>
.qi{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.7rem;
  color: #666;
  background: #ededed;
  text-align: center;
}

</style>
