<template>
<div class="start">
  <div class="classInfo">
    <div class="listInfo">
      <p class="p1"> <span>订单信息</span>   <span class="price"></span><span class="zhifu">已支付</span></p>
      <p class="p2"><span>教学场地：</span>  <span class="wen status1">{{info.reserveSite}}</span></p>
      <p class="p3"><span>教学项目：</span>  <span class="wen status1"> {{info.reserveType | stateFilter}}  {{info.serviceTypes}} </span></p>
      <p class="p4"><span>教学时间：</span>  <span class="wen time1"> {{info.reserveTime}}</span> </p>
      <div class="div1">
          <span class="markman">预约人：</span>
        <p class="p5">

          <span class="name wen" v-html="info.nickname"></span>
          <span class="wen phone"> {{info.phone}}</span>
        </p>

      </div>
       <p class="p6" v-if="info.reserveType==2">
      
      </p>
      <p class="p6" v-else>
        <span>备注：</span>
        <span class="wen tip">{{info.reserveRemark}}</span>
      </p>
    </div>
  </div>


  <div class="footer">
    <span class="sure" @click="begin(info.recerveId,info.reserveType)">确定上课</span>
  </div>
</div>
</template>

<script>
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../../libs/sessid.js'
export default {
  data() {
    return{
      info:[],
      beginUrl:"",
      userId:"",
      sessionId:""
    }
  },filters:{
        stateFilter(value){
            let res='';
            switch(value){
                case "0":
                    res="单体";
                    break;
                case "1":
                    res="集训营";
                    break;
                     case "2":
                    res="季卡预约";
                    break;
                default:
                    res=''
                }
            return res;
        }
    },
  created:function () {
    let classInfo = AjaxConfig.api.severInfo; // 开始上课界面上面的订单信息
    this.beginUrl = AjaxConfig.api.suresever;  // 确定上课按钮接口

    document.title="确定上课"
        var idType = sessionStorage.getItem('idType');
         
        idType = idType.split(',');
        var id = idType[0];
        this.id = id;
        var type = idType[1];
      // 获取到sessionid
      var sessionId = localStorage.getItem("json");
      sessid();
      this.sessionId = sessionId;
      this.$http.post(classInfo,{"recerveId":id,"type":type},{
        headers :{"X-SESSION-ID":sessionId,'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
         emulateJSON: true
      }).then(function (response) {
        if(response.data.code == 0){
          var res = response.data.data;
          this.info = this.headImg(res);
        }else{
          alert("未查找到今天预约的信息");
          this.$router.push("/About");
        }
      },function () {
        alert("请检查网络");
      });

  },
  mounted:function () {

  },
  methods:{
    begin(recerveId,type) {
      var self = this
      self.$http.post(self.beginUrl,{"reserveType":type,"recerveId":recerveId},{headers:{
        "X-SESSION-ID":self.sessionId
      }}).then(function (response) {
        if(response.data.code == 0){

          alert("开始上课");
          // 确认开始以后跳转页面
          self.$router.push("/About");
        }
      },function () {
        alert("请检查网络连接");
      });

    }
  }
}
</script>

<style scoped>
.classInfo{
  margin-top: 0.5rem;
  background-color: #fff;
  padding-bottom: 1rem;
}
.listInfo{
  width: 92%;
  margin: auto;
}
.listInfo>p,.div1{
  margin-bottom: 0.5rem;
  font-size: 0.6rem;
  color: #000;
}
.div1 .markman{
  float: left;
}
.div1>p{
  margin-left: 3.2rem;
  margin-bottom: 0.5rem;
}
.wen {
  color: #666666;
}
.tip{
  margin-left: 1.2rem;
}
.p1{
  padding-top: 0.8rem;
  color: #000;
  font-size: 0.65rem !important;
  font-weight: bold;
}
.p1 .zhifu,.p1 .price{
  float: right;
}
.p1 .zhifu{
  font-size: 0.5rem;
  color: #666666;
  font-weight: normal;
}
.p1 .price{
  color: #fc5c62;
  font-size: 0.7rem;
  margin-right: 0.5rem;
}

.footer{
  width: 100%;
  height: 2.45rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
}
.footer .sure{
  display: inline-block;
  width: 100%;
  height: 2.45rem;
  line-height: 2.45rem;
  background-color:#6cc3ab!important;
  color: #fff;
  font-size: 0.8rem;
  text-align: center;
}
</style>
