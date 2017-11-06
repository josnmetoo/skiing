<template>
  <div class="h">
    <input type="text" class="inp"  placeholder="请输入你的手机号" v-model="ipion">
    <div><input type="text" class="winp"  placeholder="验证码" v-model="ont"><p class="spend" @click="send()">{{html}}</p></div>
    <div class="footers" @click="bind()"><img src="../../assets/tijiaokuang.png" class="tij" >绑定</div> 
  </div>
  
   
</template>

<script>

import Config from '../../config/config.vue'
export default {
 
  data () {
    return {
   ipion:'',
   cid:'',
   ont:'',
   html:'发送验证码',
   sendd:true,
   id:'',
   type:'',
   t:''
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
    this.id=getvalue('id')
    this.type=getvalue('type')
    this.t=getvalue('text')
    console.log(this.t)
        var cid= sessionStorage.getItem('xid');
        this.cid=cid
   
  },
   mounted:function () {
   
    document.title="手机绑定";
      //console.log(this.nowIndex)
      
    
  },
  methods:{
   send(){
    
    if(this.sendd){
       var _this=this;//
    if(!(/^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[0589]\d{7}$/.test(this.ipion))){
      alert('请输入正确的手机号');
      return false;
    } 
        
     this.$http.get(Config.api.callone,{params:{phone:this.ipion},headers:{'X-SESSION-ID':this.cid}}).then(function(response){
              
             //console.log(response.data.data.status)
             
             if(!response.data.data.status){

              let sec =60;
                for(let  i=0; i<=60; i++){
                   window.setTimeout(function(){
                       if (sec != 0) {
                        
                        sec--;
                        $('.spend').css('background','#ededed')
                           $('.spend').css('color','#666')
                            $('.spend').html(sec + "秒后重发验证" )
                           _this.sendd=false
                     } else {
                         sec = 60;//如果倒计时结束就让  获取验证码显示出来
                        // _this.html="重新发送" ;
                          $('.spend').css('background','#43aab8')
                          $('.spend').css('color','#fff');
                           $('.spend').html("重发验证" )
                           _this.sendd=true
                    }
                   }, i * 1000)
                 }
               this.$http.get(Config.api.calltwo,{params:{phone:this.ipion},headers:{'X-SESSION-ID':this.cid}}).then(function(response){
              
             console.log(response.data.code)
        }, function(response){
            // 响应错误回调
        })

              }else{
                alert("该手机号已经绑定")
        }
        }, function(response){
            // 响应错误回调
        })
    }
  
    
            
   },
   bind(){
   if(!(/^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[0589]\d{7}$/.test(this.ipion))){
      alert('请输入正确的手机号');
      return false;
    }
    if(this.ont==''){
      alert("请输入正确验证码")
    } 
       this.$http.get(Config.api.callone,{params:{phone:this.ipion},headers:{'X-SESSION-ID':this.cid}}).then(function(response){
        if(!response.data.data.status){
              this.$http.post(Config.api.call,{
                  phone:this.ipion,
                  code:this.ont
          },{headers:{'X-SESSION-ID':this.cid}}).then(
                      function(response){
                  if(response.data.code==0){
                    alert('绑定成功')
                    if(this.t==1){
                       this.$router.replace('/Xqy?id='+this.id+'&type='+this.type);
                    }
                     if(this.t==2){
                       this.$router.replace('/Bespoke?id='+this.id+'&type='+this.type);
                    }
                     if(this.t==3){
                       this.$router.replace('/Miss?carid='+this.id);
                    }
                     if(this.t==4){
                       this.$router.replace('/Grsz');
                    }
                  }
                  if(response.data.code==2030){
                    alert('验证码有误')
                  }
                }, function(response){
                    // 响应错误回调
                })
        }else{
          alert('该手机号已经绑定')
        }
          }, function(response){
            // 响应错误回调
        })
    
    }
   }
  
}
</script>
<style scoped>
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
  input{
    outline: none;

    border: none;
  }
  .inp{
    width: 17.25rem;
    display: block;
    margin:0 auto;
    margin-top:0.5rem;
    height: 2.5rem;
    font-size: 0.75rem;
    border-bottom: 1px solid #ededed;
  }
  .h{
    width: 100%;
    background: #fff;
  }
  .winp{
    width: 8rem;
    height: 2.5rem;
    font-size: 0.75rem;
    margin-left:0.75rem; 
    float: left;
  }
  .spend{
    width: 4.25rem;
float: right;
margin-right: 0.75rem; 
font-size: 0.6rem;
height: 1.75rem;
line-height: 1.85rem;
background: #43aab8;
text-align: center;
border-radius: 5px;
margin-top:0.45rem;
color: #fff
  }
  .h div{
    overflow: hidden;
  }
.footers img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10
}
.footers{
  width:15.5rem ;
  height:2.5rem; 
   text-align: center;
  line-height:2.5rem;
  position: fixed;
  bottom: 1.75rem;
  left:1.5rem; 

  color: #fff;
  font-size:0.75rem;
  border-radius: 5px;
}
</style>
