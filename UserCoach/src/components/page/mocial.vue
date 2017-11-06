<template>
	<div class="h">
		<div class="top">
			<div>
			<!-- <img   class="img" src="../../assets/400.png">
			-->
				<p class="p1 p" v-if="headImg==''" @click="iup()"><img class="ui" src="../../assets/kilo.png"></p>
				<p class="p1 p" v-else  @click="iup()" ><img class="im" :src="headImg"> </p>
				<p class="p1"><img src="../../assets/zhnegj.png"></p>
				<input type="file" id="ip"  accept="image/*" style="display:none" >
			</div>
			<p class="lp">· 激活卡片需上传您的正面彩色照片；</p>
			<p class="lp">· 头像请保持水平居中，照片需清晰可辨；</p>
			<p class="lp">· 该照片用于教练员上课前核实身份使用；</p>
			<p class="lp">· 冒充他人使用我们将有权取消您的使用资格。</p>
			

		</div>
		<div class="boy" >
				<img class="img" :src="arr2.avatar">
				<div>
					<p class="p2">
						<span>成员状态：</span>
						<span>{{arr2.membertypes}}({{arr2.genders}})</span>
					</p>
					<p class="p2">
						<span>真实姓名：</span>
						<span>{{arr2.name}}</span>
					</p>
					<p class="p2">
						<span>证件号码：</span>
						<span>{{arr2.identification}}</span>
					</p>
				</div>
				
</div>
<div class="foot" @click="active()">提交</div>
	</div>

</template>

<script>

import Config from '../../config/config.vue'
	export default {

		data () {
			return {
				headImg:'',
				mid:'',
				carid:'',
				arr2:'',
				sid:''
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
	      this.mid=getvalue("mid")
	      this.carid=getvalue("ucarid");
	        this.sid=sessionStorage.getItem('xid');
	      this.$http.get(Config.api.userone,{params:{memberid:this.mid},headers:{'X-SESSION-ID':this.sid}}).then(
      function(response){
       ///console.log(response.data.data)
       this.arr2=response.data.data;
       }, function(response){
    // 响应错误回调
})		

		},
		  mounted:function () {
	  	var _this=this
	  	var headImg;
	  	var backgroundImage;
	// 上传图片
	function uploadEdieFile(file){

	
		var formdata = new FormData();
		formdata.append('file',file);
		$.ajax({
			url:'/api/common/upload/image',
			type:'POST',
			data:formdata,
			processData:false,
			contentType:false,
			success:function(json){
				console.log(json);
				if(json.code == 0){
					_this.headImg = json.data.url;
					alert("上传成功");
				}
			},error:function(){
				alert("网络连接错误");
			}
		});
	}

	var file1 = document.querySelector('#ip');

	file1.onchange = function (e) {
		var fileUploadControl = file1.files[0];
		if (file1.files.length > 0) {
			var file = file1.files[0];
			uploadEdieFile(file);
		}
	}
},
		methods:{
				iup(){
					
	   		$('#ip').click()
	   	},
	   	active(){
	   		if(this.headImg==''){
	   			alert('请上传证件照')
	   			return;
	   		}
	   		this.$http.post(Config.api.active,{usercardid:this.carid, usermemberid:this.mid ,img:this.headImg},{headers:{'X-SESSION-ID':this.sid}}).then(
                function(response){
                	if(response.data.code==0){
                		alert('激活成功')
                		this.$router.replace('/Mis')
                	}
}, function(response){
    // 响应错误回调
})
	   	}
		}
	}
</script>
<style scoped>
 
.foot{
	width: 100%;
	position: fixed;
	bottom: 0;
	height:2.4rem;
	line-height: 2.5rem;
	color: #fff;
	text-align: center;
	font-size: 0.7rem;
	background: #41b6b5;
}
.zhn{
	width: 2.5rem;
	height: 2.5rem;
	margin-top: 1rem;
	margin-left: 1rem;
}
.boy{
		width: 94%;
		height: 5.75rem;
		background: #fff;
		overflow: hidden;
		margin:0.75rem auto;

	}
	.boy .img{
		float: left;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		margin-top:1.3rem;
		margin-left: 0.5rem;
		margin-right: 0.8rem;
	}
	.boy div{
		margin-top: 1.4rem;
		float: left;
	}
	
	.p2{
		overflow: hidden;
		color: #bcbcbc;
		font-size: 0.65rem;
		line-height: 1.1rem;
	}
	.p2 span{
		float: left;
	}
	.lp{
		padding-left:2rem;
		color: #bcbcbc;
		font-size: 0.6rem;
		line-height: 1rem;
	}
	.top{
		width: 100%;
		height: 13rem;
		background: #fff;
	}
	.top div{
		overflow: hidden;
		text-align: center;
		padding-top: 1.25rem;
		margin-bottom: 0.35rem;
	}
	.top .p1{
		width: 6.25rem;
		height: 6.25rem;
		background: #ededed;
		display: inline-block;
		text-align: center;
		float: left;

	}
	.p{
		margin-right: 1.8rem;
		float: left;
		margin-left: 2.3rem;
	}
	.top img{
		width: 100%;
		height: 100%;
		
		vertical-align:middle;
		text-align: center;
	}
	
	.p1 .im {
	width: 100%;
	height: 100%;
	margin-top:0;


	}
</style>
