<template>
<div class="login">
  <div class="logo">
    <img class="kk" src="../assets/ak.png" alt="">
    
  </div>
  <img src="../assets/lo.png" class="bu" alt="">
  <p class="yu">教练登陆</p>
  <p class="userName">
    <input type="text" name="" value="" placeholder="用户名" ref="username">
  </p>
  <p class="pwd">
    <input type="password" name="" value="" placeholder="密码" ref="password">
  </p>
  <div @click="login()" class="loin">
    登录
  </div>
</div>
</template>

<script>
import AjaxConfig from "../ajaxConfig/ajaxConfig.vue"
export default {
  data() {
    return{

    }
  },
  created:function () {

    // 令牌登录
    let coachTokenr = AjaxConfig.api.coachToken;
    var storage=window.localStorage;
    var datas=storage.getItem('json');
    var coachName = localStorage.getItem("userName");
    var coachToken = localStorage.getItem("coachToken");
        if(coachToken != "" || coachToken != undefined || coachToken != null){
          // 这里要请求接口，查看、token是否过期
          this.$http.post(coachTokenr,{
            "coachNumber":coachName,
            "coachToken":coachToken
          },{
             headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
             emulateJSON: true
          }).then(function (respone) {
            var card = respone.data;
            if(card.code == 0){
              // token 未失效，直接跳转页面
              var sessionId = card.data.sessionId;

              var storage=window.localStorage;
              storage.setItem("json",sessionId);
              this.$router.push('/home/now?sessionId='+sessionId);
            }else{
              // storage.clear(); // 清除本地缓存
            }
          },function () {
              // alert("请检查网络连接");
          });
        }
  },
  mounted:function () {
      var login = document.querySelector(".login");
      var height = window.screen.height ;
      var width = window.screen.width ;
      login.style.width = width+"px";
      login.style.height = height+"px";
      var body = document.querySelector("body");
      body.style.margin='0px';
      document.title="登录";


  },
  beforeUpdate:function () {

  },
  methods:{
    login() {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; // 判断电话
      var userObj = {};
      let ajaxlogin = AjaxConfig.api.login;
      const self = this;
      var userName = self.$refs.username.value; // 输入的用户名
      var password = self.$refs.password.value; // 输入的密码
      if(userName == "" || password == ""){
        alert("用户名和密码不能为空");
        // if(!reg.test(userName)){
        //   alert("用户名必须是手机号，请检查输入的用户名");
        // }else
      }else {
        var obj = {"coachNumber":userName,"coachPassword":password};

        // 字段： coachNumber   coachPassword
        var userName = localStorage.setItem("userName",userName);
        this.$http.post(ajaxlogin,obj,{
           headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
           emulateJSON: true
        }).then(function (response) {
           const self = this;
           var res = response.data;
            if(res.code == 0){
              var storage=window.localStorage;
              var loginTime = new Date().getTime();
              var coachToken = localStorage.setItem("coachToken",res.data.coachToken);
              var loginTime = localStorage.setItem("loginTime",loginTime);
              var sessionTime = localStorage.setItem("sessionTime",res.data.sessionTime);
              var sessionId = res.data.sessionId;
              storage.setItem('json',sessionId);
              self.$router.push('/home/now?sessionId='+sessionId);
            }else{
              alert("账号密码错误");
            }
           // 得到返回数据的、token存储起来， 在每次进入页面的时候就走令牌登录，如果token 失效，就让他用密码登录，如果没失效就用token登录 ， 一旦token失效，那么就要清除掉本地缓存.clear()

        }, function(response) {
           // 这里是处理错误的回调
           alert("请检查网络连接");
           console.log(response);
        });
      }


      // self.$router.push('/home/now');
    }
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding: 0px;
}
body{
  margin:0px !important;
}
.login .yu{
  text-align: center;
  color: #fff;
  font-size: 0.75rem;
   margin-bottom: 2.5rem;
}
a{
  text-decoration: none;
}
.login{
  background-color: #6ac4ab;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
}
.logo{
  text-align: center;
  padding-bottom:7rem;

}
.logo img{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
}
.login p{
  width: 85%;
  height: 2.4rem;
  margin:auto;
}
.bu{
  width: 18%;
 position: absolute;
 top:3.8rem;
 left: 50%;
 margin-left: -9%;
}
.userName{
  margin-bottom: 1rem !important;
}
.login p input{
  width: 100%;
  height: 100%;
 background: rgba(255,255,255,0.2);
  border: none;
  text-indent: 2em;
  color: #fff;
  outline: none;
  font-size: 0.8rem;
      border-radius: 2rem;
}
 ::-webkit-input-placeholder{
     color: #fff;
     font-size: 0.8rem;
}
.btn{
  text-align: center;
  margin-top: 1.5rem;
}
.btn span{
  display: inline-block;
  width: 3.5rem;
  height: 3.5rem;
  text-align: center;
  line-height: 3.5rem;
  background-color: #fff;
  color: #57b59b;
  border-radius: 50%;
  font-size: 0.8rem;
}




.loin{

  margin-top: 1rem;
  background: #fff;
  border-radius: 2rem;
  text-align: center;
  line-height: 2.3rem;
  font-size: 0.75rem;
  color: #4ab6b5;
width: 85%;
margin:2.5rem auto;
height: 2.3rem;
}

</style>
