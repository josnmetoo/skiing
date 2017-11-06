<template>
  <div class="h">

 <img class="img"src="../../assets/div3.jpg">
 <p class="top">
   现在绑定学滑雪
 </p>
 <p class="p1">
   手机号
 </p>
 <div class="ipone">
    <input type="text" class="inp"  placeholder="请输入你的手机号" v-model="ipion">
    
 </div>
 <p class="p2">验证码</p>
 <div class="ipone">
   <input type="text" class="ipn"  placeholder="请输入验证码" v-model="sing">
   <span class="spend" @click='send()'>获取验证码</span>
 </div>
  
  <p class="p2">设置密码</p>
  <input type="password" class="sin"  placeholder="请输入您的登录密码" v-model="passwd">
  <span class="on" @click="bind()">绑定</span>
  <p class="p3" @click="go()">注册即代表您同意<span class="xiahua">《学滑雪用户协议》</span></p>
  </div>

  
</template>

<script>

 import Config from '../../config/config.vue';
export default {
 
  data () {
    return {
        ipion:'',
        sing:'',
        passwd:'',
        sendd:true
    }
  },created:function(){
  		
  },
  mounted:function (){
$(document).scrollTop(0,0);
      $('.img').height($(window).height())

  },
  methods:{
  send(){
  if(this.sendd){
     var _this=this
    if(!(/^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[0589]\d{7}$/.test(this.ipion))){
       
      alert('请输入正确的手机号');
      return false;
    } 
   this.$http.post(Config.api.symm,{phone:this.ipion,type:1}).then(function (response) {
if(response.data.code==0){
  let sec =60;
                for(let  i=0; i<=60; i++){
                   window.setTimeout(function(){
                       if (sec != 0) {
                        
                        sec--;
                     
                          
                            $('.spend').html(sec + "秒后重发验证" )
                           _this.sendd=false
                     } else {
                         sec = 60;//如果倒计时结束就让  获取验证码显示出来
                        // _this.html="重新发送" ;
                       
                          
                           $('.spend').html("重发验证" )
                           _this.sendd=true
                    }
                   }, i * 1000)
                 }
}

   },function () {

});
      
  }
     
  },
  go(){
    this.$router.push('/Kmass');
  },
  bind(){

 if(!(/^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[0589]\d{7}$/.test(this.ipion))){
       
      alert('请输入正确的手机号');
      return false;
    } 
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.passwd))){
      alert("密码格式过于简单(字母开头最少6字符位)！")
      return false;
    }
     this.$http.post(Config.api.liong,{phone:this.ipion,password:this.passwd,code:this.sing,ticket:sessionStorage.getItem('lnid')}).then(
        function(response){ 
            if(response.data.code==13){
              alert('验证码输入有误，请重新输入')
            }
            if(response.data.code==0){
              var res=response.data.data
               sessionStorage.setItem('xid',res.session_id);
                //              this.$http.get(Config.api.info,{params:{'X-SESSION-ID':res.sessionid},headers:{'X-SESSION-ID':res.sessionid}}).then(
                //     function(response){
                //       var data = response.data.data;
                //       this.arr2 = this.headImg(data);
                //       console.log(this.arr2)
                //       if(response.data.code==0){

                //          zhuge.identify(this.arr2.uid, // 用户的id
                //            {
                //             "头像地址":this.arr2.purl,
                //             "昵称":this.arr2.name
                //           });

                //          this.$router.replace('/About')
                //       }


                //     }, function(response){
                //   // 响应错误回调
                // })  
                sessionStorage.removeItem("linshi");
                 this.$router.replace('/About');

            }else{
              alert('绑定失败')
            }
        }, function(response){
      // 响应错误回调
  }) 
  }
  }
}
</script>
<style scoped>
.xiahua{
  text-decoration: underline;
}
.img{
  width: 100%; height: 100%;
  position: absolute;
  z-index: -9999
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #fff;
    opacity: 0.3;

  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fff;
    opacity: 0.3;
  }

  input:-ms-input-placeholder {
    color: #fff;
    opacity: 0.3;
  }

  input::-webkit-input-placeholder {
    color: #fff;
    opacity: 0.3;
  }
  input{
    outline: none;

    border: none;
    background: none;
    color: #fff
  }
  .top{
    color: #fff;
      font-size: 1.25rem;
      padding: 2rem 0 0 0rem;
      margin:0 auto;

  }
  .inp,.sin{
     color: #fff;
    border-radius: 0px;
    font-size: 0.7rem;
  }
  p{
    width: 80%;
    margin: 0 auto;
    color: #fff;
    font-size: 0.75rem;
  }
  .sin{
    display: block;
    margin: 0 auto;
    width: 80%;
    border-bottom: 0.8px solid #fff;
      padding: 0.6rem 0 0.4rem 0 ;
  }
  .p1{
    margin-top: 2.5rem;
  }
  .p2{
    margin-top: 1rem;
  }
  .ipone{
  width: 80%;
  margin: 0 auto;
  border-bottom: 0.8px solid #fff;
  overflow: hidden;
  padding-bottom: 0.5rem;
  }
  .ipone span{
    color: #fff;
    font-size: 0.65rem;
   float: right;
  }
  .ipone input{
    float: left;
    padding-top: 0.6rem;
  }
.ipone .spend{
    width: 4.25rem;
float: right;

font-size: 0.6rem;
height: 1.5rem;
line-height: 1.65rem;
background: #fff;
color: #43aab8;
text-align: center;
border-radius: 5px;

  }
  .on{
    display: block;
    margin:1.3rem 0 0 1.8rem;
    width: 5.75rem;
    text-align: center;
    line-height:2.25rem;
    height: 2.1rem; 
    background: #fff;
    color: #43aab8;
    border-radius: 6px;
    font-size: 0.75rem;
  }
  .p3{
  font-size: 0.65rem;
  margin-top: 1rem;
  }
</style>