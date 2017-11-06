<template>
  <div class="change">
    <div class="input">

      <p class="p1">新密码<input type="password" name="" value="" class="first" placeholder="请输入新密码"  ref="fistP"></p>
      <p>再次输入<input type="password" name="" value="" class="second" placeholder="请输入新密码"  ref="twoP"></p>

    </div>
    <p class="btn"><button type="button" name="button" class="sureBtn" @click="sure()">确认修改</button></p>
  </div>
</template>

<script>
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../../libs/sessid.js'
export default {
  data(){
    return{
      test:""
    }
  },
  created:function () {
    document.title="修改密码";
  },
  methods:{
    // ^[0-9a-zA_Z]+$ 验证只能输入数字和英文的正则
    blurOne(e) {
      var thisInput = e.currentTarget;
      var firstPwd = $(thisInput).val();
      var reg = /^[a-z0-9]+$/i;
      if(firstPwd.length < 6 || firstPwd.length > 26){
          alert("只能输入6到26位的密码长度");
      }else if(!reg.test(firstPwd)){
        alert("密码只能输入数字和英文");
        $(thisInput).val('');
      }
    },
    blurTwo(e) {
      var twoInput = e.currentTarget;
      var twoPwd = $(twoInput).val();
      var firstVal = this.$refs.fistP.value;
      if(twoPwd != firstVal){
        alert("两次密码输入不相同，请重新输入");
        $(twoInput).val('');
      }
    },
    sure() {
      var self = this;
      var sessionId = localStorage.getItem("json");
      sessid();
      var change = AjaxConfig.api.changePwd;
      var onePwd = this.$refs.fistP.value;
      var newPwd = this.$refs.twoP.value;
      var reg = /^[a-z0-9]+$/i;
      if(onePwd.length < 6 || onePwd.length > 26){
          alert("只能输入6到26位的密码长度");
          return false;
      }else if(!reg.test(onePwd)){
        alert("密码只能输入数字和英文");
        $('.first').val('');
        return false;
      }if(newPwd == '' || onePwd == ''){
        alert("请输入完整密码");
        return false;
      }else if(newPwd != onePwd){
        alert("两次密码输入不相同，请重新输入");
        $('.first').val('');
        $('.second').val('');
        return false;
      }else{
        this.$http.post(change,{"password":newPwd},{"headers":{
          "X-SESSION-ID":sessionId,
        }}).then(function (response) {
            if(response.data.code == 0){
              var res = response.data.data;
              alert("密码修改成功啦");
              localStorage.clear();
              self.$router.push({"path":"./"});
            }
        },function (response) {
            alert("网络请求失败");
        });
      }
    }
  }
}
</script>

<style scoped>
.change{
  margin-top: 0.6rem;
  background-color: #fff;
  height: 5.1rem;
  width: 100%;
  /*position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;*/
}
.input{
  width: 92%;
  margin: auto;
  height: 100%;
}
.input p{
  height: 50%;
  box-sizing: border-box;
  font-size: 0.75rem;
  line-height: 2.55rem;
  overflow: hidden;
}
.input p:first-of-type{
  border-bottom: 1px solid #ededed;
}
.input p input[type="password"]{
  height: 2.125rem;
  text-indent: 1em;
  border: none;
  width: 77%;
  float: right;
  font-size: 0.75rem;
  outline: none;
  margin-top: 0rem;
}
::-webkit-input-placeholder{
    color:#dedede;
}
.btn{
  text-align: center;
  position: fixed;
  bottom: 1.7rem;
  width: 100%;
}
.sureBtn{
  width: 82.6667%;
  height: 2.25rem;
  background-color: #7bd2ba;
  color: #fff;
  font-size: 0.75rem;
  border: none;
  outline: none;
  border-radius: 5px;
}

</style>
