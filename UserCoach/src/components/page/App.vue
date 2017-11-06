<template>
  <div class="h">
	<p>
		新版APP即将上线，详情请关注我们的微信公众号！
	</p>
<span @click="hui()">返回</span>
  </div>

  
</template>

<script>


export default {
 
  data () {
    return {
  
    }
  },created:function(){
  		
  },
  mounted:function (){


  },
  methods:{
  hui(){
  	
  }
  }
}
</script>
<style scoped>
.h{
	width: 100%;
	height: 100%;
	background: #fff;
	position: fixed;
}
.h p{
	width: 65%;
	margin: 0 auto;
	text-align: center;
	margin-top: 13.5rem;
	color: #222;
font-size: 0.7rem;
}
.h span{
	width: 5rem;
	height: 2rem;
	display: block;
	margin: 13.5rem auto;
	text-align: center;
	font-size: 0.75rem;
	border: 1px solid #4ab6b5;
	color: #4ab6b5;
	line-height: 2.1rem;
	border-radius: 5px;
}
</style>
