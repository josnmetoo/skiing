

<template>
  <div class="h">
<p class="tishi" v-show="ss=uu">暂无数据</p>
 <div class="noe" v-for="val in arr">
  	<div class="done">
  	<span class="zj" v-if="val.cardstatus=='1'">已激活</span>
  	<span class="zj" v-if="val.cardstatus=='2'">已失效</span>
  	<span class="zj" v-if="val.cardstatus=='3'">已转卡</span>
 	<img :src="val.listimg">
 	<div>
 	<p class="p1">
 		<span class="sp1">
 			{{val.cardpeopletype}}{{val.cardtype}}
 		</span>
 		<span class="sp2">
 			（{{val.useday}}天）
 		</span>
 	</p>
 	<p class="p2">
 		<span class="sp1">{{val.skateboardtype}}</span>
 	
 	</p>
 	<p class="p3" ><span v-for="va in val.sitenames">{{va}}</span></p>
  </div>
 
  </div>
 </div>
 
  </div>
 
  </div>
 </div>
 </div>
</template>

<script>
 import Config from '../../config/config.vue'
export default {
 
  data () {
    return {
     arr:[],
     xid:'',
     uu:false
    }
  },created:function(){
  			 this.xid= sessionStorage.getItem('xid');
this.$http.get(Config.api.carall,{headers:{'X-SESSION-ID':this.xid}}).then(
      function(response){
     	if(response.data.code==0){
     		var json =response.data.data;

     		for(var i=0;i<json.length;i++){
     			if(json[i].cardstatus!=="0"){
     				
     				this.arr.push(json[i])
     			}
     		}
     		 if(this.arr.length==0){
          this.uu=true;
        }
     		console.log(this.arr)
     	}
}, function(response){
    // 响应错误回调
})
  
  },
  methods:{
   
  }
}
</script>
<style scoped>
.tishi{
	width: 100%;
	height: 3rem;
	text-align: center;
	padding-top: 1rem;
	color: #333;
	font-size: 0.7rem;
}
*{
	margin: 0;
	padding: 0;
	line-height: normal;
}
.done div{
height: 3rem;
	margin-top:1.15rem;
}
.done div p{
	height: 33%;
}
p{
	line-height:normal;
}
.zj{
	position: absolute;
	font-size: 0.75rem;
	color: #bcbcbc;
	right: 0.5rem;
	top:2.2rem; 
}
.done{
	width:100%;
	height: 5.25rem;
	background: #fff;
	overflow: hidden;
	position: relative;
	border-bottom:1px solid #ededed;
}

.noe{
	margin-top: 0.5rem;
	background: #fff;
}
.done img{
	width:5.75rem;
	height:3.75rem;
	margin:0.65rem 0.5rem 0 0.75rem; 
	float: left;  
}
.p1{
	overflow: hidden;

	color: #333;
}
.p1 .sp1{
	font-size: 0.7rem;
	float: left;
}
.p1 .sp2{
	float: left;
	font-size: 0.55rem;
	margin-top: 0.15rem;
}
.p2{
	overflow: hidden;
}
.p2 .sp1{
	float: left;
	font-size: 0.6rem;
	color: #333;
}
.p2 .sp2{
	float: right;
	color: #bcbcbc;
	font-size: 0.75rem;
	margin-right: 0.5rem;
}
.p3{
	font-size: 0.6rem;
	color: #bcbcbc;
	overflow: hidden;
}
.p3 span{
	float: left;
}
.p4{
	font-size: 0.6rem;
	color: #bcbcbc;
}
.jihuo{
	width: 100%;
	height: 2.2rem;
	display: flex;
}
.jihuo span{
	flex: 1;
	text-align: center;
	border-right: 1px solid #ededed;
	color: #bcbcbc;
	font-size: 0.7rem;
	line-height: 2.3rem;
}
</style>
