<template>
<div class="hot ">
  <p v-show="ss=uu" class="qi ">&nbsp;&nbsp;此雪区暂无集训营</p>
	<div class="ls" v-for="val in arr" @click="ban(val.groupid)" data-plant-height="1">
		<img class="img" :src="val.url+'_w720'" alt="" />
		<p class="p1">
			<span class="sp1">{{val.gname}}</span>
			<span class="sp2">¥<b>{{val.price*0.01}}</b></span>
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

<div class="bd"></div>
  </div>




</template>

<script>
import Vue from 'vue';
import Config from '../../config/config.vue'

export default {
  data() {
    return{
      uu:false,
    	arr:'',
    	id:''
    }
  },
 created:function(){
     var id=localStorage.getItem('regionId')
     this.id=id
     var xid=sessionStorage.getItem('xid')
      this.xid=xid
      if(id==null){
      this.$http.get(Config.api.infos).then(
      function(response){
        var res=response.data.data;
        this.arr2=res
  //  console.log(response)// 响应成功回调
this.id=this.arr2[4].id
    //alert(this.arr2[4].id)


  this.$http.get(Config.api.ginfo,{params:{regionId:this.id}}).then(
      function(response){
        var res=response.data
    this.arr=res.data
  if(this.arr.length==0){
          this.uu=true;
        }
   // console.log(this.arr)// 响应成功回调
}, function(response){
    // 响应错误回调
})
}, function(response){
    // 响应错误回调
})
   }else{


 this.$http.get(Config.api.ginfo,{params:{regionId:this.id}}).then(
      function(response){
        var res=response.data
    this.arr=res.data
    if(this.arr.length==0){
          this.uu=true;
        }
   // console.log(this.arr)// 响应成功回调
}, function(response){
    // 响应错误回调
})
   }
  }, methods:{

    ban(gg){///Bespoke?id='+id+'&type='+gid
    var f = $('.ls');
//console.log(f.data("plant-height"));
      this.$router.push('/Bespoke?id='+gg+'&type='+f.data("plant-height"))
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
.hot{
  margin-top: 0.5rem;
}
.qi{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.7rem;
  color: #666;
  background: #ededed;
  text-align: center;
  list-style: none;
}
.p2 .img3{
	margin-left: 1rem;
	width: 0.63rem;
	height: 0.63rem;
	margin-top: 0.05rem;
}
.p2 .iu{

   float: left;
    font-size: 0.55rem;
    line-height: 0.85rem;
}
.bd{
  width: 100%;
  height: 5rem;
}
.ls{

	width: 12.5rem; margin:0.5rem auto;
	background: #fff;
}
img{
	vertical-align: middle;
}
.ls .img{
	width: 100%; height:6.5rem;
}
.p1,.p2,.p3 {
	overflow: hidden;
    width: 11rem;
    margin: 0 auto;
    /* line-height: 0.95rem; */
    /* line-height: 1rem; */
    line-height: 0.7rem;
    /* padding: 0.2rem 0; */
    /* margin-bottom: 1rem; */
    padding-bottom: 0.3rem
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
.p2 img{
	width:0.55rem;
	height: 0.7rem;
	float: left;
	margin-bottom: 0.3rem;
	margin-right: 0.3rem
}
.p2 .sp1,.sp2{
	    float: left;
    font-size: 0.55rem;
    line-height: 0.8rem;
}
.p3 img{
	width:0.55rem;
	height: 0.55rem;
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
</style>
