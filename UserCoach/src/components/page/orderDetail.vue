<template>
  <div class="detail">
    <div class="info">

    <section class="orderInfo" v-if="detail.type==2">
        <span>服务项目：</span>
        <span class="teachType" v-show="payType==0">{{detail. types}}</span>
        <span class="teachType" v-show="payType==1">{{detail.scon}}</span>
      </section>
      <section class="orderInfo" v-if="detail.type==3">
        <span>服务项目：</span>
        <span class="teachType" v-show="payType==0">{{detail.name}}</span>
        <span class="teachType" v-show="payType==1">{{detail.name}}</span>
      </section>
      <section class="orderInfo" v-if="detail.type!=='2' && detail.type!=='3'">
        <span>教学项目：</span>
        <span class="teachType" v-show="payType==0">{{detail.scon}}</span>
        <span class="teachType" v-show="payType==1">{{detail.stype}}</span>
      </section>
        <section class="orderInfo" v-if="detail.type==2">
        <span>教学场地：</span>
        <span class="teachType" v-show="payType==0">{{detail.siteName}}</span>
        <span class="teachType" v-show="payType==1">{{detail.rname}} {{detail.sname}}</span>
      </section>
       <section class="orderInfo" v-if="detail.type==3">
        <span>教学场地：</span>
        <span class="teachType" v-show="payType==0">{{detail.siteName}}</span>
        <span class="teachType" v-show="payType==1">{{detail.siteName}}</span>
      </section>
      <section class="orderInfo" v-if="detail.type!=='2' &&detail.type!=='3'">
        <span>教学场地：</span>
        <span class="teachType" v-show="payType==0">{{detail.rname}} {{detail.sname}}</span>
        <span class="teachType" v-show="payType==1">{{detail.rname}} {{detail.sname}}</span>
      </section>
        <section class="ordertime" v-if="detail.type==2">
        <span >教学时间：</span>
        <span class="teachType" v-show="payType==0 && type == 0 ">{{detail.stime | formatDate}} </span>
         <span class="teachType" v-show="payType==0 && type == 2">{{detail.ctime | formatDate}} </span>
        <span class="teachType" v-show="payType==0 && type == 1">{{detail.stime | formatDate}} - {{detail.etime | formatDate}}</span>

        <span class="teachType" v-show="payType==1" v-for="timeVal in detail.times">{{timeVal.stime | formatDate}}</span>
      </section>
       <section class="ordertime" v-if="detail.type==3">
        <span v-if="detail.type==3">购买时间：</span>
        <span class="teachType" v-show="payType==0 && type == 0 ">{{detail.stime | formatDate}} </span>
         <span class="teachType" v-show="payType==0 && type == 2">{{detail.ctime | formatDate}} </span>
           <span class="teachType" v-show="payType==0 && type == 3">{{detail.ctime | formatDate}} </span>
        <span class="teachType" v-show="payType==0 && type == 1">{{detail.stime | formatDate}} - {{detail.etime | formatDate}}</span>
        
        <span class="teachType" v-show="payType==1" >{{detail.ctime | formatDate}}</span>
      </section>
      <section class="ordertime" v-if="detail.type!=='2' && detail.type!=='3'">
        <span>教学时间：</span>
         <span class="teachType" v-show="payType==1 && (type == 0 || type==4)"  v-for="timeVal in detail.times">{{timeVal.stime | formatDate}} </span>
        <span class="teachType" v-show="payType==0 && (type == 0 || type==4)">{{detail.stime | formatDate}} </span>
       
         <span class="teachType" v-show="payType==1 && type == 1" v-for="timeVal in detail.times">{{timeVal.stime | formatDate}} - {{timeVal.etime | formatDate}}</span>
        <span class="teachType" v-show="payType==0 && type == 1 " >{{detail.stime | formatDate}} - {{detail.etime | formatDate}}</span>
      </section>
    </div>

    <div class="info-t">
     <section class=""  v-if="detail.type==3">
      
      </section>
     <section class="orderInfo"  v-if="detail.type==2">
        <span>预约人：</span>
        <span class="teachType" v-show="payType==0">{{detail.name}} {{detail.phone}}</span>
        <span class="teachType" v-show="payType==1" v-for="val2 in poper">{{val2.name}} {{val2.phone}}</span>
      </section>
      <section class="orderInfo" v-if="detail.type!=='2' && detail.type!=='3'">
        <span>预约人：</span>
        <span class="teachType" v-show="payType==0">{{detail.name}} {{detail.phone}}</span>
        <span class="teachType" v-show="payType==1" v-for="val2 in poper">{{val2.name}} {{val2.phone}}</span>
      </section>
      <section class="orderInfo-t" v-if="detail.type==2">
        
      </section>
       <section class="orderInfo-t" v-else>
        <p class="remark"><span>备注：</span> <span v-show="payType==0">{{detail.remark}}</span>
          <span v-show="payType==1">{{detail.text}}</span>
        </p>
        <p class="payMoney"><span v-show="payType!==1">已支付：</span> 
        <span class="number" v-show="payType==0" v-if="detail.count==undefined">¥{{detail.price}}</span>
          <span class="number" v-show="payType==0" v-else>¥{{detail.totalPrice}}</span>  
        <span class="number" v-show="payType==1" v-if="detail.count==undefined">¥{{detail.price}}</span>
          <span class="number" v-show="payType==1" v-else>¥{{detail.totalPrice}}</span>  </p>
      </section>
    </div>
    <div class="setMsg" v-if="detail.type==3">
      
    </div>
    <div v-else class="setMsg" >
      <p><span>退订</span>   开课前48小时内，不可进行退订操作。频繁退订将影响您的 个人信誉度。</p>
      <p><span>迟到</span>   若开课后2小时后，多次与客户无法取得联系我们将视为放弃 (全天课程放弃半天）</p>
    </div>
    <div class="code" v-show="ustatus == 4">

    </div>
  </div>
</template>

<script>
import Config from '../../config/config.vue'
import {formatDate} from '../../libs/data.js';
require ('../../libs/jquery.qrcode.min.js')
export default {
  data() {
    return{
      id:"",
      type:"",
      detail:[],
      payType:"",
      peoples:[],
      poper:[],
    }
  },
  created:function () {
    var xid= sessionStorage.getItem('xid'); // sessionid
    var payInfoUrl = Config.api.payListInfo; // 待支付详情接口
    var otherInfoUrl =Config.api.listInfo; // 其他订单的详情接口
    document.title="订单详情";
    var storage = sessionStorage.getItem("orderidT");
    storage = JSON.parse(storage);
    console.log(storage)
    var id = storage.id;
    var type = storage.type;
    var payType = storage.payType;
    this.payType = payType;
    var ustatus = storage.ustatus;
    this.ustatus = ustatus;
    this.id = id;
    this.type = type;

    if(payType =='1'){
      // 走待支付的详情接口
      this.$http.post(payInfoUrl,{"oid":id,"type":type},{headers:{'X-SESSION-ID':xid}}).then(function (response) {
        if(response.data.code == 0){
            this.detail = response.data.data;
            this.peoples = response.data.data.peoples;
            function unique2(array){
                 var n = {}, r = [], len = array.length, val, type;
                 for (var i = 0; i < array.length; i++) {
                 val = array[i];
                 type = typeof val;
                 if (!n[val]) {
                 n[val] = [type];
                 r.push(val);
                 } else if (n[val].indexOf(type) < 0) {
                 n[val].push(type);
                 r.push(val);
                 }
                 }
                 return r;
             }
             console.log(this.peoples!==undefined)
             if (this.peoples!==undefined) {
                this.poper=unique2(this.peoples);
             }
             
        }
      },function () {
          //失败
      });
    }else if(payType =='0'){
      // 走普通的详情接口
      this.$http.get(otherInfoUrl,{params:{"reserveid":id,"serviceType":type},headers:{'X-SESSION-ID':xid}}).then(function (response) {
        if(response.data.code == 0){
          this.detail = response.data.data;
          console.log(this.detail)
        }
      },function () {
          // 错误
      });
    }

  },
  mounted:function () {
    console.log(this.id+','+this.type)
    $(".code").empty().qrcode({
           text:this.id+","+this.type,
       });
  },
  filters: {
        formatDate(time) {
          var date=new Date(time)
            return formatDate(date, 'yyyy.MM.dd');
        }
  },
  methods:{

  }
}
</script>

<style >
.detail{
  margin-top: 0.5rem;
  padding-bottom: 1.3rem;
}
.info{
  width: 100%;
  margin-bottom: 0.5rem;
  background-color: #fff;

}
.ordertime{
  width: 92%;
  margin: auto;
  border-bottom: 1px solid #dedede;
  line-height: 2.5rem;
  color: #666666;
  font-size: 0.7rem;
  overflow: hidden;
}
.teachType{
  margin-left: 0.3rem;
}
.orderInfo{
  height: 2.5rem;
  width: 92%;
  margin: auto;
  border-bottom: 1px solid #dedede;
  line-height: 2.5rem;
  color: #666666;
  font-size: 0.7rem;
}
.info .orderInfo:last-of-type{
  border-bottom: none !important;
}
.teachType{
  color: #484848 !important;
  float: right;
}
.info-t{
  width: 100%;
  background-color: #fff;

}
.orderInfo-t{
  width: 92%;
  margin: auto;
  overflow: hidden;
}
.orderInfo-t p{
  line-height: 1.3rem;
}
.remark{
  width: 100%;
  font-size: 0.7rem;
  color: #666666;
}
.payMoney{
  float: right;
  color: #fc5c62;
  font-size: 0.7rem;
}
.number{
  font-weight: bold;
  font-size: 1rem;
}
.setMsg{
  font-size: 0.7rem;
  width: 92%;
  margin: auto;
  margin-bottom: 1.5rem;
}
.setMsg p{
  margin-top: 0.6rem;
  line-height: 1.3rem;
}
.setMsg p span{
  font-weight: bold;
  color: #484848;
}
.code{
 width: 7rem;
    height: 7rem;
    margin: auto;
    background: #fff;
    padding: 0.5rem;
    border-radius: 5px;
}
.code canvas{
  width: 100% !important;
  height: 100% !important;
}
</style>
