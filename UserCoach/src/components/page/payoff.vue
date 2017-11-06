
<template>
	<div class="hello">
		<div class="bg"></div>
		<div class="kng">
			<p class="p1">支付剩余时间</p>
			<p class="p2"><span id="MM"></span>:<span id="SS"></p>
			<p class="p3"><span class="s1">订单金额:</span><span class="s2">¥{{arr.price*arr.count}}</span></p>
			<div class="bg"></div>

		</div>
		<div class="xq">
			<p class="top"> 订单详情</p>
			<p> <span class="left1">使用场地</span><span class="right1" v-for="val in arr.sitenames">{{val}}</span></p>
			<p> <span class="left1">使用时间</span><span class="right1">{{arr.useday}}天</span></p>
			<p> <span class="left1">卡片类型</span><span class="right1">{{arr.cardtype}} {{arr.cardname}}</span></p>
			<p v-if="arr.cardpeopletype==0"> <span class="left1" >版型类别</span><span class="right1">{{arr.skateboardtype}}
</span></p>
			<p v-else> <span class="left1" >版型类别</span><span class="right1">儿童{{arr.skateboardtypechild}} 成人{{arr.skateboardtypeadult}}</span></p>
			<p> <span class="left1">购买张数</span><span class="right1">{{arr.count}}张</span></p>
		</div>
		<div class="bg"></div>
		<div class="xq">
			<p class="top"> 购买须知</p>
			<p> <span class="left1">1.该产品售出后可转赠其他用户；</span></p>
			<p> <span class="left1">2.产品售出后不支持退换操作；</span></p>
			<p> <span class="left1">3.卡片最迟激活日期为2017-12-01日；</span></p>
			<p> <span class="left1">4.激活卡片时需要实名登记；</span></p>
			<p> <span class="left1">5.本产品的最终解释权归《学滑雪》所有。</span></p>
		</div>
		<!--   <div class="footer" @click="pass()"><img src="../../assets/tijiaokuang.png" class="tij">确认支付</div> -->
		<div class="footer" @click="pass()">
		<img src="../../assets/bai.png">
		<span>微信支付</span></div>
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
				time:'',
				oid:'',
				xid:''
			}

		},created:function(){
			clearInterval(this.time)
			 this.xid= sessionStorage.getItem('xid');
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
      this.oid=getvalue("oid")
			this.$http.get(Config.api.cardmiss,{params:{orderid:this.oid},headers:{'X-SESSION-ID':this.xid}}).then(
      function(response){
      	this.arr=response.data.data
      	   var res = JSON.stringify(this.arr)
	        localStorage.setItem('succe',res);
      	 var endtime=this.arr.createtime
	                this.endtime=endtime
	                console.log(this.endtime)
	                

	            var currentDate = new Date();
	         
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
}, function(response){
    // 响应错误回调
})
	
	      var  URL = window.location.href;
	            URL = URL.split("#")[0];
	      let jsdk=Config.api.jsdk;
	      this.$http.get(jsdk,{params:{url:URL}}). then(function(response){
	                       console.log(response.data.data)
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

	     


	  },  mounted: function () {


	  },
	  methods:{
	  		
	        pass(){
	           var xid= sessionStorage.getItem('xid');
	           if(this.bx<0){alert("超过了支付时间请重新下单")}else{
	             this.$http.post(Config.api.pay,{
	              oid:this.oid,
	              type:3,
	              paytype:0,
	              url:"http://xhx.flowerski.com/api/wechat/pay/payment"
	},{headers:{'X-SESSION-ID':xid}}).
	                  then(function(response){
	                       console.log(response.data.data)

	                       if(response.data.code==0){
	                        var res=response.data.data
	                         var  vm = this;
	                         wx.chooseWXPay({
	                        timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	                        nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
	                        package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	                        signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	                        paySign: res.signature, // 支付签名
	                        success: function (res) {
	                            // 支付成功后的回调函数
	                            vm.$router.replace("/Susses")

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
 .xq .top{
	font-size: 0.75rem;
	color: #333;
	line-height: 1.5rem;
	padding-top: 0.3rem;
}
.xq{
	background: #fff;
	padding-bottom: 0.3rem;
}
.xq p{
	
	border: none;
	margin: 0;
	padding: 0;
width: 93%;
margin: 0 auto;
overflow: hidden;
}
.xq .left1{
	float: left;
	font-size: 0.6rem;
	color: #bcbcbc;
	line-height: 1.4rem;
}
.xq .right1{
	float: right;
	font-size: 0.6rem;
	color: #333;
}
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
	
	.footer img{
		vertical-align: middle;
		width: 0.7rem;
		height: 0.7rem;
		margin-top: -0.12rem;
	}
	.footer{
		width: 100%;
		text-align: center;
		line-height:2.6rem;
		position: fixed;
		bottom: 0rem;
		left:0rem; 
		background: #3bb463;
		color: #fff;
		font-size:0.75rem;

	}
	.bg{
		background: #ededed;
		width: 100%;
		height: 0.5rem;
	}
	

</style>
