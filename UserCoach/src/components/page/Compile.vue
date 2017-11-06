		<template>
		  <div class="h">
		  <div  class="top">
			<p >上传头像</p>
			<div class="comma">
				<img v-if="headImg==''" @click="iup()" class="img" src="../../assets/400.png">
				<img v-else  @click="iup()"  class="img" :src="headImg">
				<img class="img1" src="../../assets/comma.png">
				<input type="file" id="ip"  accept="image/*" style="display:none" >
			</div>
			</div>
			<div class="name">
				<p class="p1 boder">
					<span>昵称</span>
					<input type="text" placeholder="昵称或真实姓名即可" v-model="name"></input>
				</p>
				<p class="p1">
					<span>联系电话</span>
					<input type="text" placeholder="预约人联系电话" v-model="iphone"></input>
				</p>
			</div>
			<div v-if="pl==1">
			<div class="bg">
				以下信息创建后将不可修改
			</div >
			<div class="build ">
				<p class="tp">
					<b>成员类型</b>
					<span v-for="(val,index) in type" @click="ontype(index)" :class="{on:index==tindex}">{{val}}</span>

				</p>
				<p class="tp boder pand">
					<b class="sex">性别</b>
					<span v-for="(val,index) in sex" @click="onsex(index)" :class="{on:index==sindex}">{{val}}</span>

				</p>
				<p class="p boder pand">
					<span>真实姓名</span>
					<input type="text" placeholder="请填写预约人真实姓名" v-model="sname"></input>
				</p>
				<p class="p">
					<span>证件号码</span>
					<input type="text" placeholder="请填写预约人有效证件号码" v-model="numb"></input>
				</p>
			</div>
			</div>
			
			<p v-if="pl==1" class="bottom" @click="add()">添加</p>
			<p v-else class="bottom" @click="addt()">确认修改</p>
		  </div>
		  
		</template>

		<script>
		import Config from '../../config/config.vue'

		export default {
		  data () {
		    return {
		   type:["成人","儿童"],
		   sex:["女","男"],
		   tindex:-1,
		   sindex:-1,
		   pl:'',
		   headImg:'',
		   name:'',
		   iphone:'',
		   sname:'',
		   numb:'',
		   xid:'',
		   mid:'',
		    bid:'',
	    	jid:'',
	    	key:'',
	    	uarr:'',
	    	mm:'',
	    	ucarid:'',
	    	bbui:''
		    }
		  },created:function(){

		  	this.xid= sessionStorage.getItem('xid');
		  	console.log( this.headImg)
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
		      this.bbui=getvalue('bbxx')
		      this.uu=getvalue('uu')
		        this.ucarid=getvalue("ucarid")
		      this.mm=getvalue('mm')
		      this.pl= getvalue("pl")
		 	 this.mid=getvalue("mid")
		 	  var uid=getvalue("id");
	      var jid=getvalue("type")
	      this.ui=getvalue("ui")
	       this.key=getvalue("key");
	      this.jid=jid
	       if(this.mid!==''&&this.pl!=1){
	         this.$http.get(Config.api.userone,{params:{memberid:this.mid},headers:{'X-SESSION-ID':this.xid}}).then(

	      function(response){
	       console.log(response.data.data)

	        this.uarr=response.data.data
	        this.headImg=response.data.data.avatar
	        this.name=response.data.data.nickname
	        this.iphone=response.data.data.phone
	}, function(response){
	    // 响应错误回调
	})}
		  },
		  mounted:function () {
		  
		  	document.title="成员编辑";
		  	var _this=this;
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
						_this.headImg = json.data.url+'_avatar';
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
				console.log(file)
				uploadEdieFile(file);
			}
		}
	},
		   methods:{
		   	ontype(index){
		   		this.tindex=index
		   	},    
		   	onsex(index){
		   		this.sindex=index
		   	},
		   	iup(){ 
		   		$('#ip').click()
		   	},
		   	add(){
		   		 if(!(/^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[0589]\d{7}$/.test(this.iphone))){
	      alert('请输入正确的手机号');
	      return false;
	    } 
		   		var xid= sessionStorage.getItem('xid');
		   		this.$http.post(Config.api.useradd,{avatar:this.headImg,
		   											nickname:this.name,
		   											phone:this.iphone,
		   											membertype:this.tindex,
		   											gender:this.sindex,
		   											name:this.sname,
		   											identification:this.numb
		   											},{headers:{'X-SESSION-ID':xid}}).then(
	                function(response){
	                		if (response.data.code==2208) {
	                			alert("请输入正确的证件号码")
	                		}
	                		if (response.data.code==0) {
	                			alert("创建成功");
	                			if (this.mm=='3') {
	                				this.$router.replace('/Member?card='+this.ucarid)
	                			}else{
	                			this.$router.replace('/Toggle?id='+this.jid+'&type='+this.ui+'&key='+this.key+'&uu='+this.uu+'&bbxx='+this.bbui)}
	                		}else{
	                			//alert('创建失败，请检查您所填写的信息')
	                		}
	}, function(response){
	    // 响应错误回调
	})
		   	},
		   	addt(){
		   		 if(!(/^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[0589]\d{7}$/.test(this.iphone))){
	      alert('请输入正确的手机号');
	      return false;
	    } 
		   		this.$http.post(Config.api.useraddt,{avatar:this.headImg,
		   											nickname:this.name,
		   											phone:this.iphone,
		   											memberid:this.mid
		   											},{headers:{'X-SESSION-ID':this.xid}}).then(
	                function(response){
	                	
	                		if (response.data.code==0) {
	                			alert("修改成功");
	                			
	                			this.$router.replace('/Toggle?id='+this.jid+'&type='+this.ui+'&key='+this.key+'&uu='+this.uu+'&bbxx='+this.bbui)	
	                			
	                			
	                		}else{
	                			alert('修改失败，请检查您所填写的信息')
	                		}
	}, function(response){
	    // 响应错误回调
	})
		   	}	
		   }
		}
		</script>
		<style scoped>
		.h{
			margin-bottom: 1rem;
		}
		.h .build .pand{
			padding-bottom: 0.7rem;
		}
		.boder{
			border-bottom: 1px solid #ededed;
		}
		.p1,p input{
			font-size: 0.65rem;
		}
		.bottom{
			    position: fixed;
    bottom: 0;
    left: 0;
			width: 100%;
			height: 2.4rem;
			color: #fff;
			font-size: 0.7rem;
			text-align: center;
			line-height: 2.5rem;
			background:#41b6b5;
		}
		.build .p{
			overflow: hidden;
			width: 94%;
			margin: 0 auto;
			padding: 0.8rem 0 0.4rem 0;
			margin-top:0.5rem;
		}
		.build{
			width: 100%;
			height: 11.5rem;
			background: #fff;
			padding-top: 0.3rem;
			margin-bottom: 2rem;
			  
		}
		.tp{
			overflow: hidden;
			font-size: 0.75rem;
			width: 94%;
			margin: 0 auto;
			padding: 0.7rem 0 0 0;
		}
		.tp .sex{
			margin-right: 2.35rem;
		}
		.tp span{
		float: left;
		margin: 0 0.5rem;
		width: 3.5rem;
		height: 1.375rem;
		background: #ededed;
		border-radius: 1.375rem;
		color: #bcbcbc;
		text-align:center;
		line-height: 1.47rem;
		font-size: 0.65rem
		}
		.tp b{
			font-weight: normal;
			float: left;
			line-height: 1.6rem;
			margin-right: 0.8rem;
			color: #333
		}
		.tp .on{
			background: #41b6b5;
			color: #fff;
		}
		.bg{
			width: 94%;
			margin: 0 auto;
			height:2.1rem ;
			color: #bcbcbc;
			font-size: 0.7rem;
			line-height: 2.2rem;
			font-size: 0.7rem;

		}
		 input {

		    outline: none;

		    border: none;

		  }
		 input:-ms-input-placeholder {
		    color: #000;
		    opacity: 0.1;
		  }

		  input::-webkit-input-placeholder {
		    color: #000;
		    opacity: 0.1;
		  }

		.name{
			background: #fff;
		height: 5rem;
		padding-top: 0.5rem
		}
		.name .p1{
			overflow: hidden;
			width: 94%;
			margin: 0 auto;
			padding: 0.8rem 0 0.4rem 0;
		}
		.p1 span{
			float: left;
			font-size: 0.7rem;
			color: #333;
		}
		.p1 input{
			float: right;
			width:13.2125rem;
			
		}
		.p span{
			float: left;
			font-size: 0.7rem;
			color: #333;
		}
		.p input{
			float: right;
			width:13.2125rem;
			
		}
		.top{
			width: 100%;
			height:8rem;
			background: #fff; 
			margin-bottom: 0.5rem;
		}
		.top p{
			text-align: center;
			font-size: 0.7rem;
			color: #bcbcbc;padding-top: 1.2rem;
		}
		.comma{
			
			width: 100%;
			text-align:center;
			position: relative;
			margin-top:0.5rem;
		}
		.comma .img{
			width: 4rem;
			height: 4rem;
			
			text-align: center;
		border-radius: 50%;
			display: block;
			margin: 0 auto;
		}
		.img1{
			position: absolute;
			width: 1rem;
			height: 1rem;
		bottom: 0rem;
		left: 10.2rem;
			
		}
		</style>
