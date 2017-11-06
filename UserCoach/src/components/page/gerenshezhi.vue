<template>
  <div class="hello">
    	<p class="p1">&nbsp;&nbsp;&nbsp;&nbsp;个人设置</p>
    	<div class="box">
    	<router-link to="/Call?text=4"><p class="p2"><span class="sp">手机号</span><img src="../../assets/jiantou.png"/><span class="np" >{{ophone}}</span></p></router-link>
    	
  			</div>

  </div>
</template>

<script>
import Config from '../../config/config.vue'

export default {
  name: 'hello',
  data () {
    return {
  			cid:'',
  			arr:'',
  			ophone:''
    }
  },created:function(){
  	  var cid= sessionStorage.getItem('xid');
  		  this.cid=cid
  	 this.$http.get(Config.api.callon,{params:{},headers:{'X-SESSION-ID':this.cid}}).then(function(response){
				      
				     console.log(response.data.data)
				     if(response.data.code==0){
				     	 this.ophone=response.data.data.phone
				     }else{
				     	this.ophone="未绑定"
				     }
				    
				     //console.log(this.ophone)
				}, function(response){
				    // 响应错误回调
				})

				     	
				
  }
  , mounted:function () {
   
    document.title="个人设置";
      //console.log(this.nowIndex)
      
    
  }
}
</script>
<style scoped>
	p{ height:2.5rem; font-size: 0.75rem;  
		font: left;
		color: #000;
		line-height: 2.65rem;
	}
	.box{
		width: 100%; background: #fff;
		line-height: 2.25rem;
	}
	.p2,.p3{
		background: #fff;
		font-size: 0.65rem;
		color: #8c8c8c;
		width:17.25rem; 
		margin: 0 auto;
		overflow: hidden;
		line-height: 2.82rem;
	}
	.p2 .sp{
		float: left;
	}
	.p2 .np{
		float: right;
		margin-right: 0.5rem;
	}
	.box img{ float: right; width: 0.4rem; height: 0.7rem;  margin-top: 1rem;}
	
</style>