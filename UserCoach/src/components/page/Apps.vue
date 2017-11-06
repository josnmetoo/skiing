<template>
  <div class="h">
	<img src="../../assets/appa.png" >
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
 document.title="App详情";
     $(document).scrollTop(0,0);

  },
  methods:{
  hui(){
  	 this.$router.replace('home/hot')
  }
  }
}
</script>
<style scoped>
.h{
	width: 100%;
	height: 100%;
	background: #fff;
	
}
img{
	width: 100%;
vertical-align: middle;
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
	margin: 3rem auto;
	text-align: center;
	font-size: 0.75rem;
	border: 1px solid #4ab6b5;
	color: #4ab6b5;
	line-height: 2.1rem;
	border-radius: 5px;
}
</style>
