



<template>
  <div class="h">
 即将开放&nbsp;&nbsp;敬请期待
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
        
       console.log(this.arr)
     
}, function(response){
    // 响应错误回调
})
  },
  methods:{
    ban(id,gid,type){
      localStorage.setItem('fid',gid);
       localStorage.setItem('type',type);
      this.$router.push('/Xqy?id='+id+'&type='+gid);
       console.log(id)
    }
  }
}
</script>
<style scoped>
.bd{
  width: 100%;
  height: 5rem;
}
    .h {
      width: 12.5rem;
      height:21.625rem; 
     
      margin-left: 0.5rem;
    

    }
    .hua{
    	width: 100%; height: 12rem;
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
  .h {
    font-size: 0.7rem;
    margin-top: 1rem;
    text-align: center;

  }
</style>
