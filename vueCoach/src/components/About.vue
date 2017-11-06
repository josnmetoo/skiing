<template>
  <div class="About">
    <!-- <input type="text" name="1" value="" v-model="msg" placeholder="对应标题内容" @keyup.enter="addTodo" ref="input1" :readonly="false">
    <input type="button" name="" value="点我试试" @touchend.prevent="show"> -->
    <div class="user">
      <section class="userImg">
        <img src="" alt="" :src="list.coachPicture">
      </section>
      <p class="userName" v-html="list.coachName"></p>
      <div class="userInfo">
        <section>
          <img src="../assets/icon1.png" alt="">
          <span class="span1">{{list.regionName}}</span>
        </section>
        <section>
          <img src="../assets/icon2.png" alt="">
          <span class="span2">{{list.coachJob}}</span>
        </section>
        <section>
          <img src="../assets/icon3.png" alt="">
          <span class="span3">{{list.coachGrade}}</span>
        </section>
        <section>
          <img src="../assets/icon4.png" alt="">
          <span class="span4">{{list.coachReserve}}</span>
        </section>
      </div>
    </div>
    <div class="func">
      <section class="sec1 section" @click="sweep()">
        <img src="../assets/sao.png" alt="" class="secImg"> <span>扫一扫</span> <img src="../assets/jiantou.png" alt="" class="rightGo">
      </section>
      <section class="sec2 section" @click="setUp()">
        <img src="../assets/shezhi.png" alt="" class="secImg"> <span>系统设置</span> <img src="../assets/jiantou.png" alt="" class="rightGo">
      </section>
      <section class="sec3 section" @click="calendar()">
        <img src="../assets/rili.png" alt="" class="secImg"> <span>个人排课</span> <img src="../assets/jiantou.png" alt="" class="rightGo">
      </section>
    </div>
    <div class="btn" @click="clear()">
        退出登录
    </div>
  </div>
</template>

<script>
import AjaxConfig from "../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../libs/sessid.js'
export default {
  name: 'about',
  data () {
    return {
      list:[]
    }
  },filters:{
    imgFifter(value){
      let headImg = '';
      if(value == null){
        headImg = '../assets/user2.png'
      }else{
        headImg = value
      }
      return headImg;
    }
  },

  created:function () {

    var sessionId = localStorage.getItem("json");
    sessid();
    // var tarkId = localStorage.setItem("data",sessionId);

    let userInfo = AjaxConfig.api.coachInfo;
    var params = {"X-SESSION-ID":sessionId};

    var  URL = window.location.href;
    URL = URL.split("#")[0];
    let jssdk = AjaxConfig.api.jssdk;
    // 配置jssdk 环境
    this.$http.get('http://xhx.flowerski.com/api/wechat/jssdk/info',{"params":{"url":URL}}).then(function (response) {
     if(response.data.code == 0){
       var res = response.data.data;
      //  res = JSON.stringify(res);
      //  alert(res);
       wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appid, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.noncestr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名，见附录1
                jsApiList: [
                  'scanQRCode'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
      }
    },function () {
      // alert("调用微信环境失败");
    });


    // 请求个人信息
    this.$http.get(userInfo,{params:params,headers:{
      "X-SESSION-ID":sessionId
    }},{emulateJSON: true}).then(function (response) {
      var res = response.data.data;
      this.list = this.headImg(res);
    },function (response) {
        alert("请求失败");
    });
  },
  mounted:function () {
    document.title="个人中心";
    var nav = document.querySelector('.nav ul li:first-of-type a');
    var a = nav.firstChild;
    var img1 = a.firstChild;
    var img2 = a.lastChild;
    var span = nav.lastChild;
    var url = window.location.hash;
      if(url == '#/home/history' || url == "#/home/end"){
        img1.style.display="none";
        img2.style.display="inline-block";
        span.style.color="#6cc3ab";
      }else{
        img1.style.display="inline-block";
        img2.style.display="none";
        span.style.color="#dedede";
      };
  },
  methods:{

    sweep() {
        const self = this;
      wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) { // 当needResult 为 1 时，扫码返回的结果
              // 请求接口得到订单ID， 然后赋值在 startClass 的 url 上面 res.resultStr
                res.resultStr = res.resultStr.toString();
                var idType = sessionStorage.setItem('idType',res.resultStr);
                self.$router.push("/startClass");

          }
        });
    },
    show(ev){    //点击按钮添加文本

    },
    calendar() {
      this.$router.push({"path":"./calendar"});
    },
    setUp() { // 系统设置
      this.$router.push({"path":"./setup"});
    },
    clear() {
      var con = confirm("是否退出登录");
      if(con == true){
        // 清空所有本地缓存
        localStorage.clear();
        this.$router.push({"path":"./"});
      }
    }
  }
}
</script>

<style scoped>
.user{
  margin: 0.5rem 0;
   background-color: #fff;
   width: 100%;
   height: 7.5rem;
}
.userImg{
  display: inline-block;
  width: 4.35rem;
  height: 4.35rem;
  border-radius: 50%;
  overflow: hidden;
  float: right;
  margin-top: 1.85rem;
  margin-right: 1.9rem;
}
.userImg img{
  width: 100%;
  height: 100%;
}
.userName{
  font-size: 0.85rem;
  color: #000;
  font-weight: bold;
  padding-top: 1.55rem;
  margin-left: 1.5rem;
}
.userInfo{
  height: 3.15rem;
  width: 8rem;
  margin-left: 1rem;
  margin-top: 0.7rem;
}
.userInfo section{
  width: 4rem;
  height: 50%;
  float: left;
  display: flex;
  /*justify-content: space-around;*/
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.userInfo section img{
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 0.45rem;
}
.userInfo section:first-of-type img{
  width: 0.6rem !important;
  height: 0.75rem;
}
.userInfo section:last-of-type img{
  width: 0.6rem !important;
  height: 0.7rem;
}
.userInfo section span{
  font-size: 0.7rem;
  width: 3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.func{
  height: auto;
  background-color: #fff;
}
.func .section{
  height:2.9rem;
  width: 92%;
  margin:auto;
  border-bottom: 1px solid #dedede;
  line-height: 2.9rem;
  overflow: hidden;
}
.sec3{
  border-bottom:none !important;
}
.func .section .rightGo{
  float: right;
  width: 0.4rem;
  height: 0.6rem;
  margin-top: 1.2rem;
}
.func .section .secImg{
  width: 0.9rem;
  height: 0.9rem;
  padding-top: 0.9rem;
  margin-right: 0.5rem;
  float: left;
}
.func .section span{
  display: inline-block;
  font-size: 0.7rem;
  padding-bottom: 0.5rem;
  float: left;
}
.btn{
  height: 2.9rem;
  background-color: #fff;
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.7rem;
  color: #e68888;
  line-height: 2.9rem;
  background-color: #fff;
}



</style>
