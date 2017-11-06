<template>
  <div class="h">
<p class="top">
	<img src="../../assets/dadui.png" alt="" />
	<span>支付成功！</span>
</p>
<img class="cont" :src="obj.cardimg">
<p class="numb">
	<span>购买数量：{{obj.count}}张</span>
</p>
<p class="foot">
	 <span @click="home()">返回首页&nbsp;&nbsp;</span></router-link>
	
	<span @click="ka()">&nbsp;&nbsp;卡片管理</span>
	<span class="border"></span>
</p>
  </div>
  
</template>

<script>


export default {
 
  data () {
    return {
   obj:''
    }
  },created:function(){
 this.obj= JSON.parse(localStorage.getItem('succe'))
   console.log(this.obj)
  
  },
  methods:{
  home(){
  	this.$router.replace('/home/hot')
  },
   ka(){
  	this.$router.replace('/Mis')
  },
  }
}
</script>
<style scoped>
a{
	color: #41b6b5;
}
.h{
	position: fixed;
	width: 100%;
	height: 100%;
	background: #fff;
}
.top {
text-align: center;
margin-top:2.5rem;
}
.top img{
vertical-align: middle;
width: 2.25rem;
height:2.125rem;
margin-top: -1.3rem; 
}
.top span{
	line-height:1rem;
	color: #41b6b5;
	font-size: 0.85rem;
	font-weight: 600;
}
.cont{  display: block;
  width: 16.55rem;
  height: 10.6rem;
  margin:1rem auto;}
  .numb{
  	width: 100%;
  	text-align: center;
  	color: #bcbcbc;
  	font-size: 0.75rem;

  }
  .foot{
  	text-align: center;
  	color: #41b6b5;
  	font-size: 0.75rem;
  	margin-top:9rem;
  	position: relative;
  	line-height: 1.2rem;
  }
  .border{
  	height: 0.6rem;
  	position: absolute;
  	border-right: 1px solid #41b6b5;
  	left: 9.4rem;
  	top:0.22rem;
  }
 
</style>
