<template>
	<div class="h" @click.stop="nice()">
		<div class="list-li" v-for="(val,index) in arr " @click="cc(val.memberid)">
			<img class="img" :src="val.avatar">
			<div>
				<p class="p1">
					<span v-html="val.nickname">
						
					</span>
					<img v-if="val.membertype==0" src="../../assets/mmm.png" class="nan" alt="">
					<img v-if="val.membertype==1" src="../../assets/nn.png" alt="">
				</p>
				<p class="p2">
					<span>单板Lv{{val.levelone}}&nbsp; &nbsp;</span>
					<span>单板Lv{{val.leveltwo}}</span>
				</p>
			</div>
			<p class="p3" @click.stop="tk(index)">
				<img src="../../assets/dian.png">

			</p>
			<div class="rif" >
				<span class="sp1" @click.stop="compile(val.memberid)"><img src="../../assets/xie1.png"></span>
				<span class="sp2"><img src="../../assets/lese.png" @click.stop="end(val.memberid,val.usercardid)"></span>    
			</div>
		</div>

		<!-- <input type="file" id="ip"  accept="image/*" > -->
		<div class="foot" @click="go()"  >
			+ 创建新成员
		</div>
	</div>

</template>

<script>

	import Config from '../../config/config.vue'
	export default {

		data () {
			return {
				fd:'',
				ts:false,
				arr:'',
				bbui:''
			}
		},created:function(){
			 function getvalue(name)
      {
      var str=window.location.hash;
      if (str.indexOf(name)!=-1)
      {
      var pos_start=str.indexOf(name)+name.length+1;
      var pos_end=str.indexOf("&",pos_start); 
      if (pos_end==-1)
      {
      return str.substring(pos_start);
      }
      else
      {
      return str.substring(pos_start,pos_end)
      }
      }
      else
      {
      return "没有这个name值";
      }
      }
      this.dd=getvalue("type")
      var did=getvalue("id");
      this.uu=getvalue("uu");
       this.key=getvalue("key");
       this.bbui=getvalue("bbxx")
        this.did=did
  			//成员列表
  			var xid= sessionStorage.getItem('xid');
  			this.$http.get(Config.api.user,{params:{'X-SESSION-ID':xid},headers:{'X-SESSION-ID':xid}}).then(
  				function(response){
  					console.log(response.data.data)
  					this.arr= this.headImg(response.data.data);

  				}, function(response){
                    // 响应错误回调
                })
  		},
  		mounted:function () {

  		document.title="成员管理";
},
methods:{
	go(){ //创建新
  var hid=this.did
		this.$router.push('/Compile?type='+hid+'&ui='+this.dd+'&key='+this.key+'&pl='+1+'&uu='+this.uu+'&bbxx='+this.bbui)
	},
	nice(){
		$('.rif').css("opacity","0")
		$('.rif').css("display","none")
	
	},
	 cc(hid){ //点击去那个页面支付
	 	if(this.uu==8){
	 		return;
	 	}
	 	 if(this.dd==2){

         this.$router.replace('/Page?uid='+hid)
          localStorage.setItem('memberid',hid)
      }
     else if(this.dd==1){
         this.$router.replace('/Bzfu?id='+this.did+'&page='+hid+'&type='+this.dd+'&key='+this.key)
      }else{
      var id=this.did
      this.$router.replace('/Zfu?id='+id+'&type='+hid+'&bbxx='+this.bbui);
       console.log(id)}
    },
	tk(i){
		this.ts=true;
		$('.rif').css("display","none")
		$('.rif').css("opacity","0")
		$('.rif').eq(i).css("display","block")
		$('.rif').eq(i).animate({"opacity":"1"},1000)

	},
	compile(mid){//修改
		  var hid=this.did
		this.$router.push('/Compile?type='+hid+'&ui='+this.dd+'&key='+this.key+'&mid='+mid+'&uu='+this.uu+'&bbxx='+this.bbui)
	},
   end(id,uid){//删除成员
   	var msg = "您真的确定要删除吗？\n\n请确认！";
   	if(uid==""){
   		if (confirm(msg)==true){
				var xid= sessionStorage.getItem('xid');
   	this.$http.post(Config.api.userend,{memberid:id},{headers:{'X-SESSION-ID':xid}}).then(
   		function(response){
   			console.log(response.data)
   			if(response.data.code==0){

   				alert("删除成功");
   				$('.rif').css("display","none")
   				this.$http.get(Config.api.user,{params:{'X-SESSION-ID':xid},headers:{'X-SESSION-ID':xid}}).then(
   					function(response){
   						console.log(response.data.data)
   						this.arr=response.data.data

   					}, function(response){
    // 响应错误回调
})
   			}

   		}, function(response){
    // 响应错误回调
})
			}else{
			return false;
			}
		}else {
				var ms="此用户检测到有卡激活,是否要删除？"
   				var msg = "您真的确定要删除吗？\n\n请确认！";
   				if(confirm(ms)==true){
   					if (confirm(msg)==true){
				var xid= sessionStorage.getItem('xid');
   	this.$http.post(Config.api.userend,{memberid:id},{headers:{'X-SESSION-ID':xid}}).then(
   		function(response){
   			console.log(response.data)
   			if(response.data.code==0){

   				alert("删除成功");
   				$('.rif').css("display","none")
   				this.$http.get(Config.api.user,{params:{'X-SESSION-ID':xid},headers:{'X-SESSION-ID':xid}}).then(
   					function(response){
   						console.log(response.data.data)
   						this.arr=response.data.data

   					}, function(response){
    // 响应错误回调
})
   			}

   		}, function(response){
    // 响应错误回调
})
			}else{
			return false;
			}
		}else{
			return false
		}
   				
   }
		}
}
}
</script>
<style scoped>
.h{
	margin-bottom: 5rem;
	padding-bottom: 10rem;
}
	.rif{
		display: none;
		position: absolute;
		right: 0;
		width: 6.375rem;
		height: 100%;
		
		opacity: 0;

	}
	.rif span{
		float: left;
		text-align: center;
		width: 50%;
		height: 100%;
	}
	.rif .sp1{
		background: #e5e9f0;
	}
	.rif .sp2{
		background: #fc5c62;
	}
	.rif .sp2 img{
		width: 1rem;
		height: 1rem;
	}
	.rif img{
		vertical-align: middle;
		width: 0.9rem;
		height:1.05rem; 
		margin-top:1.35rem;
	}
	.list-li{
		width: 100%;
		height: 3.75rem;
		background: #fff;
		overflow: hidden;
		margin-top:0.5rem;
		position: relative;
	}
	.list-li .img{
		float: left;
		width: 2.375rem;
		height: 2.375rem;
		border-radius: 50%;
		margin-top:0.7rem;
		margin-left: 0.5rem;
		margin-right: 0.8rem;
	}
	.list-li div{
		float: left;
	}
	.p1{
		overflow: hidden;
		margin-top:1rem;

	}
	.p1 span{
		float: left;
		font-size: 0.75rem;
		color: #333;
		line-height: 1rem;
	}
	.p1 .nan{
		float: left;
		width: 0.75rem;
		height: 0.73rem;
		margin-top:0.09rem;
		margin-left: 0.2rem
	}
	.p1 img{
		float: left;
		width: 0.65rem;
		height: 0.75rem;
		margin-top:0.07rem;
		margin-left: 0.2rem
	}
	.p2{

		color: #bcbcbc;
		font-size: 0.6rem;
		margin-top:0.2rem;
	}
	.p3{
		float: right;
		overflow: hidden;
		height: 100%;
	}
	.p3 img{
		float: left;
		height: 1.25rem;
		margin-right: 1rem;
		margin-top:1.3rem;
	}
	.p3 span{
		float: right;
		font-size: 0.65rem;
		color: #bcbcbc;
		line-height: 3.92rem;
		margin: 0 0.5rem 0 0.3rem;
	}
	.foot{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2.5rem;
		background: #fff;
		text-align: center;
		line-height: 2.6rem;
		font-size: 0.75rem;
		color: #41b6b5
	}
</style>
