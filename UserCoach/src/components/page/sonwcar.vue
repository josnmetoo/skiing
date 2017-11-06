<template>

  <div class="h">
	
<div class="ceng" v-show="sdk" @click="sdk=false">
	 <div class="xuo">
    <p style="margin-top:0.5rem">请选择你想购买的季卡</p>
 <span class="top2">崇礼</span>
 <ul class="list">
 	<li v-for="(val,index) in arr" @click="ka(index,val.type,val.id)">{{val.name}}</li>
 	
 </ul>
 <span class="top2">阿勒泰</span>
 <ul class="list">
 	<li v-for="(val,index) in arr1" @click="ka2(index,val.type,val.id)">{{val.name}}</li>
 	
 </ul>
   </div>
</div>
	<h3>“郝世花滑雪”教学季卡火爆销售中</h3>

<p class="p">即日购买享受</p>

<span class="red">万龙季卡7折</span><br/>
<span class="red pb">新疆阿勒泰季卡4折</span><br/>
10月23日价格将持续上调<br/> 
限！时！优！惠！<br/>
还不快来抢购？！<br/>
<img class="imgg" src="../../assets/kk.png">
一张季卡<br/>
拯救滑雪小白的福音<br/>
解决你想学滑雪又觉得学费贵的苦恼<br/>
<img class="img1" src="../../assets/111.png">

有效期内不限次数预约<br/>
反复巩固练习，形成正确的肌肉记忆<br/>
<img class="img1" src="../../assets/111.png">

专业教练指导 / 视频随行记录<br/>
记录你滑雪学习中的点滴美好<br/>
<p class="p2">
<span class="buld">可以学到什么水平？</span><br/>
  【双板】平行式自由滑行各种雪道<br/>
【单板】自如换刃滑行各种雪道<br/>
</p>
<p class="p3"><span class="buld">教学季卡使用期限？</span><br/>
12月1日 - 2月28日<br/></p>

<p class="p2"><span class="buld">教学季卡价格包含哪些？</span><br/>
此卡只包含教学费用<br/>
雪票、食宿、交通等其他费用需要您自理<br/></p>
<p class="p2">
<span class="buld">预约的学员水平参差不齐，如何教学？</span><br/>
保证同水平的学员在一起学习<br/>
各班级固定教学内容<br/>
</p>
<p class="p2">
<span class="buld">每班有几个人？</span><br/>
小班制教学，每班1-8 人<br/>
具体看当日预约情况，平均4-5人，8人上限<br/>
很有可能是1v1服务哦~<br/>
</p>
<p class="p2">
<span class="buld">一次课程的教学时间是多久？</span><br/>
大约从早9点到下午4点，午间休息<br/>
5个小时左右，视实际情况而定<br/>
</p>
<p class="p2">
<span class="buld">有何使用要求？</span><br/>
此卡为特价活动商品不支持退换<br/>
购卡完成未激活卡片，可线上操作转赠给他人<br/>
预约平台上进行开卡操作后，即视为已激活卡片<br/>
卡片一旦激活，不可再转卡，必须本人使用<br/>
</p>
<p class="p2">
错失这个机会<br/>
你将再等一年<br/>
机会总是留给有准备的人<br/>
抓住机会，勇敢向这个雪季发出挑战吧！<br/>
</p>
<p class="puo" @click="sdk=true">立即购买</p>

  </div>

  
</template>

<script>


export default {
 
  data () {
    return {
  		arr:[{name:"成人季卡",type:'1',id:'1'},{name:'儿童季卡',type:'3',id:'3'},{name:'亲子套餐',type:'2',id:'2'}],
  		arr1:[{name:"成人季卡",type:'1',id:'4'},{name:'儿童季卡',type:'3',id:'6'},{name:'亲子套餐',type:'2',id:'5'}],
  		sdk:false
    }
  },created:function(){
  		
  },
  mounted:function (){
 document.title="App详情";
     $(document).scrollTop(0,0);

  },
  methods:{
  ka(index,type,id){
  	 this.$router.push("/Miss?carid="+id+'&cidtype='+type)
  },
  ka2(index,type,id){
  	 this.$router.push("/Miss?carid="+id+'&cidtype='+type)
  }
  }
}
</script>
<style scoped>
.buld{
	font-weight: bold;
}
.pb{
	padding-bottom: 1rem;
}
.red{
	color: red;
	display: inline-block;
}
.ceng{
	position: fixed;
	top: 0;
	left: 0;
	  background: rgba(0,0,0,0.5);
	width:100%;
	height: 100%;
}
.h{
	padding: 2.5rem 0 0 0;
	width: 100%;
	height: 100%;
	background: #fff;
	
	font-size: 0.7rem;
	text-align: center;
	line-height: 1.3rem;
	color: #666
}
.top2{
display: block;
text-align: left;
	margin-left: 1.2rem;
	margin-bottom: 0.2rem
}
li{
	list-style: none;
}
.list{
	width: 95%;
	margin:0 auto;
margin-left: 0.8rem;
margin-bottom: 1rem;
overflow: hidden;
}
.list li{
	float: left;
	width:4rem;
	margin-left: 0.2rem;
	background: #ededed;
	color: #bcbcbc;
	font-size: 0.65rem;
	border-radius: 5px;
	height: 1.7rem;
	line-height: 1.8rem
}
h3{
	color: #333
}
.p{
	margin-bottom: 0.8rem;
}
.ceng .xuo{
	opacity: 1;
  position: absolute;
  background: #fff;
  border-radius: 5px;
 width:14rem; 
 height: 11rem;
  border: 1px solid #ededed;
left: 50%;/*配合margin-left的负值实现水平居中*/ margin-left: -7rem;/*值的大小等于元素宽度的一半*/ top:50%;/*配合margin-top的负值实现垂直居中*/ margin-top: -4.75rem;

}
.imgg{
	width: 80%;
	display: block;
	margin:0 auto;
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
}
.img1{
	width: 1.2rem;
	height: 1rem;
	display: block;
	margin:0 auto;
	margin-top: 1.5rem;
	margin-bottom: 0.5rem;
}
.p2{
	color: #333;
	margin:1rem 0;
}
.p3{
	margin-bottom:1rem;
}
.p3 span{
	
}
.puo{
	background:  #4ab6b5;
	width: 75%;
	height: 1.8rem;
	line-height: 1.9rem;
	margin:0 auto;
	border-radius: 1.8rem;
	text-align: center;
	color: #fff;
	margin-bottom: 1rem;
}
</style>
