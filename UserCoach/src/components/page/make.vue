<template>
  <div class="h">
  <div class="ceng" v-show="ok">
  <div class="xuo">
  	<p class="p1">提示</p>
  	<p class="p2">
  		您确定要将此卡转赠给手机号<span>{{fond}}</span>&nbsp;的用户
  	</p>
  	<p class="p4">
  		<span @click="ok=false">否</span>
  		<span class="yes" @click="food()">是</span>
  	</p>
  </div>
  	
  </div>
<p class="top">请填写您转赠人的手机号</p>
<input type="text" class="in1" v-model="fond"></input>
<p class="kk">亲爱的雪友您的季卡将转赠给他人，转赠后将由对方持卡，请您谨慎操作，亲爱的雪友您的季卡亲爱的雪友您的季卡亲爱的雪友您的季卡亲爱的雪友您的季卡亲爱的雪友您的季卡</p>
<p class="ok" @click=" fonm()">
	确认转赠
</p>
  </div>
  

</template>

<script>

import Config from '../../config/config.vue'
export default {
 
  data () {
    return {
   		ok:false,
      fond:'',
      xid:'',
      app:''
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
      return "";
      }
      }
      this.card= getvalue("card")
       this.app= getvalue("sseeid");
      if(this.app==''){
        this.xid= sessionStorage.getItem('xid');
      }else{
         this.xid=getvalue("sseeid");
      }
      // console.log(this.card)
      //   console.log(this.xid)
    
  
  },
  methods:{
    fonm(){
      if(!(/^1(3[0-9]|47|5((?!4)[0-9])|7(0|1|[6-8])|8[0-9])\d{8,8}$/.test(this.fond))){
      alert('请输入正确的手机号');
      return false;
    } else{
      this.ok=true
    }
    },
  food(){

      this.$http.post(Config.api.makecar,{usercardid:this.card,phone:this.fond},{headers:{'X-SESSION-ID':this.xid}}).then(
                function(response){
                  if(response.data.code==0){
                    alert("转卡成功")
                    this.ok=false
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
.h{
	width: 100%;
	height: 100%;
	background: #fff;
	position: fixed;
}
.top{
	color: #333;
	font-size: 0.85rem;
	margin:2rem 0 0 0.7rem; 
}
 :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #000;
    opacity: 0.1;

  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #000;
    opacity: 0.1;
  }

  input:-ms-input-placeholder {
    color: #000;
    opacity: 0.1;
  }

  input::-webkit-input-placeholder {
    color: #000;
    opacity: 0.1;
  }
   input {

    outline: none;

    border: none;

  }
  .in1{
  	margin-top:2rem;
  	border-bottom: 1px solid #bcbcbc;
  	border-radius: 0;
  	margin-left: 0.7rem;
  	width: 17.25rem;
  	font-size: 1rem;

  }
  .kk{
  	width: 17.25rem;
  
  	font-size: 0.68rem;
  	color: #bcbcbc;
  
  		margin: 1rem auto;
  }
  .ok{
  	width: 6rem;
  	height: 2rem;
  	line-height: 2.1rem;
  	color: #fff;
  	background: #41b6b5;
  	font-size: 0.7rem;
  	text-align: center;
  	margin-left: 0.7rem;
  	border-radius: 5px;
  }
  .ceng{
  position: fixed;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
  z-index: 100
}
.xuo{
  position: absolute;
  background: #fff;
  border-radius: 5px;
 width:14.875rem; 
 height: 9.55rem;
  border: 1px solid #ededed;
left: 50%;/*配合margin-left的负值实现水平居中*/ margin-left: -7.4375rem;/*值的大小等于元素宽度的一半*/ top:50%;/*配合margin-top的负值实现垂直居中*/ margin-top: -7.5rem;

}
 .xuo .p1{
 	width: 100%;
 	text-align: center;
 	margin: 0.5rem 0 0.5rem 0;
 	color: #333;
 	font-size: 0.75rem;
 }
 .xuo .p2{
 	color: #333;
 	width:9.5rem;
 	margin: 0 auto;
 	font-size: 0.75rem;
 	text-align: center;
 	line-height: 1.5rem;
 }
 .xuo .p2 span{
 	color: #fd8589;
 }
 .xuo .p4 {
 	
 	width: 100%;
 	text-align: center;
 	
 }
 .xuo .p4 span{
 	display: inline-block;
 	padding: 0.3rem 1.5rem 0.28rem 1.5rem;
 	border-radius: 1rem;
 	border: 1px solid #bcbcbc;
 	font-size: 0.7rem;
	margin: 1.5rem;
	color: #bcbcbc;

 }
 .xuo .p4 .yes{
 	padding: 0.32rem 1.52rem 0.3rem 1.52rem;
 	background: #41b6b5;
	border: none;
	color: #fff;
	box-sizing:border-box;
 }
</style>
