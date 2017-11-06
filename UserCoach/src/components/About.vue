<template>
 <div class="About">
 <div class="ceng" v-show="tk" @click="inint">

<div class="box"></div>
 </div>

    <div class="top">
    <img src="../assets/beij.png" class="beij">
    <img src="../assets/bl2.png" class="beij1">
      <div class="ziliao">
      <router-link to="/Grsz">
     <img class="bj" src="../assets/sz.png">
    </router-link>

        <img class="img1" :src="arr2.purl">
        <div class="kuai">
        <p class="name1" style="margin-top:2rem;font-size:0.8rem;color:#666;width:8rem;overflow:hidden;height:1.2rem;"v-html="arr2.name"></p>
        <p class="typp">
        <!--  <span @click=dan(arr2.uid)>单板Lv{{arr2.ograde}}</span>
         <span @click=shuang(arr2.uid)>双板Lv{{arr2.tgrade}}</span> -->
        </p>
       <p class="ka">
          <span class="k2">{{arr2.credit}}</span>
        </p></div>
      </div>


  <div class="zt">
  <ul class="ztb">

  <li class="li">
  <router-link to="/Unpaid?index=0">
    <img src="../assets/dzf.png" alt=""/>
   <span>待支付</span>
    </router-link>
   </li>


    <li class="li2">
     <router-link to="/Ping?index=1">
     <img src="../assets/jxz.png" alt=""/>
     <span>进行中</span>
     </router-link>
   </li>


    <li class="li3">
     <router-link to="/Paid?index=2">
     <img src="../assets/ywc.png" alt=""/>
     <span>已完成</span>
     </router-link>
   </li>


    <li class="li4">
    <router-link to="/No?index=3">
     <img src="../assets/tuik.png" alt=""/>
     <span>
       退款/取消
     </span>
    </router-link>
  </li>

  </ul>
  </div>

  </div>

  <ul class="da">
   <img class="bju" src="../assets/bl1.png" alt="">
   <li @click="ew">
     <img class="oneu" src="../assets/rrrr.png">
      <span class="s2">&nbsp;&nbsp;&nbsp;我的成员</span>
     <img class="imgj" src="../assets/jiantou.png">
    </li>
   <router-link to="/Mis">   
<li >
     <img class="icon" src="../assets/kaguan.png">
      <span class="s2">&nbsp;&nbsp;&nbsp;我的卡片</span>
     <img class="imgj" src="../assets/jiantou.png">
    </li>
    </router-link>
   <!--  <li @click="myClass(arr2.uid)">
     <img src="../assets/xxda.png">
      <span class="s2">&nbsp;&nbsp;&nbsp;学习档案</span>
     <img class="imgj" src="../assets/jiantou.png">
    </li> -->
     <router-link to="/Teacher">
     <li>
     <img src="../assets/wdsc.png">
      <span class="s2">&nbsp;&nbsp;&nbsp;我的收藏</span>
     <img class="imgj" src="../assets/jiantou.png">
    </li>
   </router-link>
    <!--  <li>
     <img class="juk" src="../assets/yqfl.png">
      <span class="s2">&nbsp;&nbsp;&nbsp;邀请返利</span>
     <img class="imgj" src="../assets/jiantou.png">
    </li> -->

     <li>
      <a href="tel:4008117555">
     <img src="../assets/lxwm.png">
      <span class="s2">&nbsp;&nbsp;&nbsp;联系我们</span>
     <img class="imgj" src="../assets/jiantou.png">
     </a>
    </li>

    <!--  <li>

     <img src="../assets/dianhua.png">

      <span class="s2">&nbsp;&nbsp;学滑雪客服</span>
     <img class="imgj" src="../assets/jiantou.png">

    </li> -->

   <router-link to="/Magss">
     <li class="border">
     <img src="../assets/yjfk.png" class="icon">
      <span class="s2 oko">&nbsp;&nbsp;&nbsp;意见反馈</span>
     <img class="imgj" src="../assets/jiantou.png">
    </li>
    </router-link>
     <div class="bg"></div>
     <router-link to="/Grsz">

    </router-link>
    <li class="di"></li>
  </ul>



</div>
</template>

<script>
import Config from '../config/config.vue'
require ('../libs/jquery.qrcode.min.js')
// import weChat from '../libs/weixin.js';
export default {
  name: 'about',
  data () {
    return {
     arr2:[],
      "tk": false,
      config:'',
      name:""
      }
    },
   created:function(){
    //模拟登录得到sessionid
     if (window.location.hash=="#/About") {
      //alert(0)
       $('.bk').css("display","none");
      $('.jj').css("display","block");
       $('.sc').css("display","none");
      $('.ll').css("display","none");
      $('.wo').css("color","#4ab6b5");
       $('.jjj').css("color","#bcbcbc");
        $('.wo1').css("color","#bcbcbc");
          $('.sk').css("display","block");
           $('.lk').css("display","block");
      }
$(document).scrollTop(0)
      var sid=sessionStorage.getItem('xid');
        this.$http.get(Config.api.info,{params:{'X-SESSION-ID':sid},headers:{'X-SESSION-ID':sid}}).then(
      function(response){
        var data = response.data.data;
       this.arr2 = this.headImg(data);

}, function(response){
    // 响应错误回调
})
       // 响应成功回调
  //   this.$http.post(Config.api.info,{params:{}}).then(
     // function(response){
     //   var res=response

  //  console.log(res)// 响应成功回调
//}, function(response){
    // 响应错误回调
//});
  }, mounted:function () {
    
         $('.da').scrollTop(0,0);
   
    // if (window.location.hash=="#/About") {

   
    // }

    // if (window.location.hash=="#/about") {

    //   $('.wo1').css("color","#4ab6b5");
    //     $('.sc').css("display","none");
    //      $('.sk').css("display","none");
    //      $('.bk').css("display","none");
    //       $('.jjj').css("color","#bcbcbc");
    //         $('.jj').css("display","block");
    //           $('.ll').css("display","none");
    //            $('.wo').css("color","#bcbcbc");
    //             $('.wo1').css("color","#4ab6b5");
    //     // $('.sc').css("display","block");
    //     //  $('.sk').css("display","none");
    //     //  $('.bk').css("display","none");
    //     //   $('.jjj').css("color","#ededed");
    //     //     $('.jj').css("display","none");
    //     //       $('.ll').css("display","block");
    //     //        $('.wo').css("color","#ededed");
      
    // }else{

    //    $('.bk').css("display","block");
    //   $('.jj').css("display","none");
    //    $('.sc').css("display","none");
    //   $('.ll').css("display","block");
    //   $('.wo').css("color","#bcbcbc");
    //    $('.jjj').css("color","#4ab6b5");
    //     $('.wo1').css("color","#bcbcbc");
    //       $('.sk').css("display","block");
    // }
//     if(window.location.hash=="#/About"){
//    $('.ll').css("display","none");
//       $('.jj').css("display","block");
//       $('.bk').css("display","none");
//       $('.wo').css("color","#4ab6b5");
//       $('.jjj').css("color","#bcbcbc");
//       $('.wo1').css("color","#bcbcbc");
//         $('.sc').css("display","none");
//           $('.sk').css("display","block");
// }else{
//    $('.bk').css("display","block");
//       $('.jj').css("display","none");
//        $('.sc').css("display","none");
//       $('.ll').css("display","block");
//       $('.wo').css("color","#bcbcbc");
//        $('.jjj').css("color","#4ab6b5");
//         $('.wo1').css("color","#bcbcbc");
//           $('.sk').css("display","block");
// }
// if(window.location.hash=="#/Page"){
//     $('.wo1').css("color","#4ab6b5");
//         $('.sc').css("display","block");
//          $('.sk').css("display","none");
//          $('.bk').css("display","none");
//           $('.jjj').css("color","#bcbcbc");
//             $('.jj').css("display","none");
//               $('.ll').css("display","block");
//                $('.wo').css("color","#bcbcbc");
// }else{
//    $('.bk').css("display","block");
//       $('.jj').css("display","none");
//        $('.sc').css("display","none");
//       $('.ll').css("display","block");
//       $('.wo').css("color","#bcbcbc");
//        $('.jjj').css("color","#4ab6b5");
//         $('.wo1').css("color","#bcbcbc");
//           $('.sk').css("display","block");
// }
if (window.location.hash=="#/About") {
//alert(1)
    $('.bk').css("display","noene");
      $('.jj').css("display","block");
       $('.sc').css("display","none");
      $('.ll').css("display","none");
      $('.wo').css("color","#bcbcbc");
       $('.jjj').css("color","#4ab6b5");
        $('.wo1').css("color","#bcbcbc");
          $('.sk').css("display","block");
           $('.lk').css("display","block");

    }
  },
  methods:{
    dan(uid){
       var userid = sessionStorage.setItem("uid",uid);
      this.$router.push("/study/dan?index="+0);
    },
    shuang(uid){
       var userid = sessionStorage.setItem("uid",uid);
      this.$router.push("/study/dan?index="+1);
    },
     myClass(uid) {
      var userid = sessionStorage.setItem("uid",uid);
      this.$router.push("/study/dan");
    },
     inint() {
        this.tk = false
      },
      ew(){
        this.$router.push('/Toggle?uu='+8)
         // this.tk = true
//            var sid=localStorage.getItem('xid');
//         this.$http.get(Config.api.ewm,{headers:{'X-SESSION-ID':sid}}).then(
//       function(response){
//        console.log(response.data.data)
//          $(".box").empty().qrcode({
//                         text:response.data.data,
//                         width:200,
//                         height:200
//                     });

// }, function(response){
//     // 响应错误回调
// })
}

        },

 mounted:function () {

   var oBtn=document.querySelector('.top')
   // alert(oBtn)
    oBtn.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
    document.title="个人中心";



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dor{
  float: left;
  color: #fff;
}
.da .bju{
  width: 100%;
  height:  0.55rem;
  position: absolute;
  top:-1.75rem;
}
a{
  display: block;
}
.da .border{
  border-bottom: none;
}
.bj{
  float: right;
  width: 1rem;
  height: 1rem;
  margin-top: 0.6rem;
  margin-right: 1.25rem;
}
.top{
      /* position: fixed; */
    /* top: 0; */
    background: #fff;
    position: fixed;
    width: 100;
    right: 0;
    left: 0;
    z-index: -10;
    position:fixed;
    height: 11.4rem;
}
.top .beij{
  width: 100%; height: 100%;
  position: absolute;top:0;
  left: 0;
  z-index: -888
}
.top .beij1{
  width: 100%; height:0.55rem;
  position: absolute;bottom:0;
  left: 0;
  z-index: -80
}
img{
  vertical-align: middle;
}
.da .di{
  width: 100% ;background: #ededed; border: none;
}
.ceng {
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .ceng>div{

    border: 2px solid #ededed;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
      padding:0.5rem 0.5rem 0.2rem 0.5rem;
    background: #fff;
    border-radius: 5px;
  }
  .box canvas{
    width: 100% !important;
    height: 100% !important;
  }
a{ color:#666666  }
*{ list-style: none; }
.About{ background: #fff; }
.ziliao{
  width: 100%;
  height:7.152rem;
  position: relative;
  overflow: hidden;
}
.ziliao .kuai{
  float:left;
  height: 100%;
  margin-left: 1rem;
}
.img1{
  width: 4.5rem;
  height: 4.5rem;
  border: 2px solid #ededed;
  border-radius: 50%;
box-sizing:border-box;
margin-top: 1.5rem;
margin-left: 1.65rem;
float: left;
}
.name1 {
 margin-top: 2rem;
 font-size: 0.8rem;
 color: #000;

 height: 1rem;
 width: 100%;
 overflow: hidden;
}
.ew .oko{
  border-bottom: none;
}

.typp{
    font-size:0.75rem ;
  color: #fff;
  padding-top: 0.5rem;

}
.typp span{
  padding: 0.28rem 0.5rem 0.18rem 0.5rem;
  background: #24585c;
  border-radius: 0.9rem;
  margin-right: 0.5rem;
}
.ka {



  padding-top: 0.3rem;
}
.ka img{ width:0.8rem; height: 0.8rem;  }
 .zt a{
   width: 100%; height: 100%;
  }
.img3{ position:absolute; left:6.4rem; top:9rem;}
.ka1{ position:absolute; left:7.5rem; top:8.8rem; font-size:0.75rem;color: #666}
.k2{font-size:0.75rem;color: #666}
.zt{ width:100%; height:3.8rem;
  }

  .zt img{
    width: 1rem;
     height: 0.75rem;
  }
  .zt li{
    float: left;
    margin-left: 1.7rem;
    text-align: center
  }
  .zt li span{
     display: block;
     margin-top: 0.3rem;
  }
  .zt li a{
    display: block;
    color: #fff;
  }
.zt ul{     margin: 0 auto;
    width: 17.25rem;
    display: -ms-flexbox;
    /* display: flex; */
    height: 3.2rem;

    border-top: 1px solid rgba(255,255,255,0.5);
    overflow: hidden;
    font-size: 0.68rem;
    padding-top: 0.55rem; }
.zt li{ flex:1; }

.bg{ width: 100%; height:0.2rem; background: #ededed  }
.da{ width: 100%;
    position: absolute;
    top: 11.45rem;
    background: #fff;
}
.da li{ width:17.25rem; margin:0 auto; line-height:3.4rem; font-size:0.65rem; border-bottom: 1px solid #ededed; height:3rem;    }
.da img{
  width: 0.7rem;
    height: 0.7rem;
    float: left;
    margin-top: 1.25rem;}
.da .imgj{
  float: right;
  width:0.4rem; height: 0.6rem;
  margin-top: 1.3rem;
}
.da .icon{
  width: 0.8rem;
  height: 0.7rem;
  margin-top:1.28rem;
}
.da .juk{

  margin-top:1.2rem;
}
.da .oneu{
  width: 0.8rem;
  margin-top:1.3rem;
}
</style>
