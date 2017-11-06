		<template>
			<div class="h">
				<div class="boy"  v-for="val in arr" @click="social(val.memberid,val.usercardid,val.membertype)">
					
					<img class="img" :src="val.avatar">
					<div>
						<p class="p1">
							<span v-html="val.nickname">
							
							</span>
								<img v-if="val.membertype==0"src="../../assets/mmm.png" alt="">
						<img v-if="val.membertype==1"src="../../assets/nn.png" alt="">
						</p>
						<p class="p2">
							<span>单板Lv{{val.levelone}}</span>
							<span>单板Lv{{val.leveltwo}}</span>
						</p>
					</div>
					<p class="p3" v-if="val.usercardid==''">
			
			<span>点击激活</span>
		</p>
					<p class="p3" v-else>
						<img src="../../assets/hui.png">
						<span>已绑定</span>
					</p>
		
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
					arr:'',
					arry:''
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
		      this.ucarid=getvalue("card")
				var xid= sessionStorage.getItem('xid');
				this.$http.get(Config.api.user,{params:{'X-SESSION-ID':xid},headers:{'X-SESSION-ID':xid}}).then(
	  				function(response){
	  					console.log(response.data.data)
	  					this.arr=this.headImg(response.data.data);

	  				}, function(response){
	                    // 响应错误回调
	                })
				this.$http.get(Config.api.usecar,{params:{usercardid:this.ucarid},headers:{'X-SESSION-ID':xid}}).then(
	  				function(response){
	  					console.log(response.data.data)
	  					this.arry=this.headImg(response.data.data);

	  				}, function(response){
	                    // 响应错误回调
	                })
			},
			mounted:function () {
		

	},
	methods:{
		go(){
			this.$router.push('/Compile?pl='+1+'&mm='+3+'&ucarid='+this.ucarid)
		},
		social(mid,ciff,mm){
			if (ciff!=='') {//证明此用户有卡已经绑定
				alert('此用户已经绑定过一张卡片,请选择其他用户')
			}else{
				if(this.arry.cardpeopletype==mm){
					this.$router.push('/Social?mid='+mid+'&ucarid='+this.ucarid)
				}else{
					alert('请选择相同的人员类型')
				}
			}
		
		}
	}
	}
	</script>
	<style scoped>
	.h{
		margin-bottom: 3rem;
	}
		.boy{
			width: 100%;
			height: 3.75rem;
			background: #fff;
			overflow: hidden;
			margin-top:0.5rem;
		}
		.boy .img{
			float: left;
			width: 2.375rem;
			height: 2.375rem;
			border-radius: 50%;
			margin-top:0.7rem;
			margin-left: 0.5rem;
			margin-right: 0.8rem;
		}
		.boy div{
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
		.p1 img{
			float: left;
			width: 0.65rem;
			height: 0.75rem;
			margin-top:0.03rem;
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
			width:1.1rem ;
			height: 0.9rem;
			margin-top:1.4rem;
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
