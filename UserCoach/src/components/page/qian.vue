<template>
  <div class="hello">
  <div class="bg"></div>
  <div class="kng">
    <p class="p1">支付剩余时间</p>
    <p class="p2"><span id="MM">- -</span>:<span id="SS">- -</span></p>
    <p class="p3"><span class="s1">订单金额:</span><span class="s2">¥{{arr.price}}</span></p>
     <div class="bg"></div>
    <p class="p4">
      <img class="img" src="../../assets/wx.png" alt="" />
      <span>微信支付</span>
      <img class="yes" src="../../assets/yes.png" alt="" />
    </p>
  </div>
 
  <div class="footer" @click="pass()"><img src="../../assets/tijiaokuang.png" class="tij">确认支付</div>
  
  </div>
</template>

<script>
import Config from '../../config/config.vue'
export default {
  name: 'hello',
  data () {
    return {
      arr:'',
      id:'',
      type:'',
      arr2:'',
       endtime:'',
       bx:'',
       time:''
    }

  },created:function(){
 clearInterval(this.time)
       var xid= sessionStorage.getItem('xid');
         this.$http.get(Config.api.goo,{headers:{'X-SESSION-ID':xid}}).then(
              function(response){
                this.arr2=response.data.data
                  
              // console.log(this.arr2)
              
        }, function(response){
            // 响应错误回调
        })

       function getvalue(name) {
        var str = window.location.hash;
        if (str.indexOf(name) != -1) {
          var pos_start = str.indexOf(name) + name.length + 1;
          var pos_end = str.indexOf("&", pos_start);
          if (pos_end == -1) {
            return str.substring(pos_start);
          }
          else {
            return str.substring(pos_start, pos_end)
          }
        }
        else {
          return "";
        }
      }
      var  URL = window.location.href;
            URL = URL.split("#")[0];
      let jsdk=Config.api.jsdk;
      this.$http.get(jsdk,{params:{url:URL}}). then(function(response){
                      // console.log(response.data.data)
                       if(response.data.code == 0){
                        var res = response.data.data;
                        wx.config({
                      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                      appId: res.appid, // 必填，公众号的唯一标识
                      timestamp: res.timestamp, // 必填，生成签名的时间戳
                      nonceStr: res.noncestr, // 必填，生成签名的随机串
                      signature: res.signature,// 必填，签名，见附录1
                      jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    })
                   }   
                 
                }, function(response){
                    // 响应错误回调
                    alert(response.data.data)
                })

      var id = getvalue("id");
         this.id=id
       var type = getvalue("type");
       this.type=type
        this.$http.post(Config.api.gott,{type:type,oid:id},{headers:{'X-SESSION-ID':xid}}).then(
                function(response){
                 //console.log(response.data.data)
                 var re=response.data.data
                 var endtime=re.ctime
                this.endtime=endtime
                //console.log(this.endtime)
                //alert( this.endtime)
                  
           
            var currentDate = new Date();
            //alert(this.endtime+600)
            var days= (this.endtime+600000)-currentDate ; 
            var EndTimeMsg = parseInt(days / 1000);//精确到秒
              function add0(m){return m<10?'0'+m:m }
            function show() {
             var h = Math.floor(EndTimeMsg / 60 / 60);
            var  m = Math.floor((EndTimeMsg - h * 60 * 60) / 60);
            var  s = Math.floor((EndTimeMsg - h * 60 * 60 - m * 60));
             
             var Omm= document.getElementById("MM");
             var Oss= document.getElementById("SS");
             if( Omm==null || Omm==""){
              clearInterval(time)
              return;
             }
           Omm.innerHTML = add0(m);
            Oss.innerHTML = add0(s);
              EndTimeMsg--;
             // this.bx=  EndTimeMsg
              if (EndTimeMsg < 0)
              {
                  
                 Omm.innerHTML = "00";
                  Oss.innerHTML = "00";
                   clearInterval(time)
              }
            }
            show(EndTimeMsg)
           var time= setInterval(function(){show(EndTimeMsg)}, 1000)
                // console.log(re)
                 this.arr=re
                var res = JSON.stringify(re)
                   localStorage.setItem('res',res);
                  // obj.rname=
          }, function(response){
              // 响应错误回调
          })
        
        
      },  mounted: function () {

       
      },
  methods:{
      
        pass(){
           var xid= sessionStorage.getItem('xid');
           if(this.bx<0){alert("超过了支付时间请重新下单")}else{
             this.$http.post(Config.api.pay,{
              oid:this.id,
              type:this.type,
              paytype:0,
              url:"http://xhx.flowerski.com/api/wechat/pay/payment"
},{headers:{'X-SESSION-ID':xid}}).
                  then(function(response){
                      // console.log(response.data.data)
           
                       if(response.data.code==0){
                        var res=response.data.data
                         var  vm = this;
                         wx.chooseWXPay({
                      timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                          nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                          package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                          signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                          paySign: res.signature, // 支付签名/ 支付签名
                        success: function (res) {
                            // 支付成功后的回调函数
                            vm.$router.replace("/Pold")
                              
                        }
                    });
                       }
                 
                }, function(response){
                    // 响应错误回调
                })
         
           }
            
        }
      }
}
</script>
<style scoped>
.kng{
  background: #fff;
}
.p1,.p2,.p3{
  height: 2.25rem;
  width:17.25rem;
  margin: 0 auto;
  line-height: 2.25rem; 
}
.p1,.p2{
  text-align: center;
}
.p1{
  font-size: 0.6rem;
  padding-top: 0.3rem;
}
.p2{
  font-size: 0.95rem;
  font-weight: bold;
  color: #000;
    line-height: 1rem; 
}
.p3 .s1{ float: left; font-size:0.6rem ; color: #666 }
.p3 .s2{
  float: right; font-size:0.75rem; color: #fc5c62; font-weight: bold;
}
.p4{ width:17.25rem; margin: 0 auto; height: 3rem; }
.p4 .img{ width:1.4rem; height: 1.4rem; float: left; margin-top:0.85rem;   }
.p4 span{
  float: left; margin-top: 1rem; margin-left:0.35rem;
  font-size: 0.75rem; 
}
.p4 .yes{
  float: right; width:1rem; height: 0.625rem; margin-top: 1.1rem;
}
.footer img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10
}
.footer{
  width:15.5rem ;
  height:2.5rem; 
   text-align: center;
  line-height:2.6rem;
  position: fixed;
  bottom: 1.75rem;
  left:1.5rem; 
 
  color: #fff;
  font-size:0.75rem;
  border-radius: 5px;
}
.bg{
	background: #ededed;
	width: 100%;
	height: 0.5rem;
}
	.hello{width: 100%; height: 100%;background: #69c4ab}

</style>
