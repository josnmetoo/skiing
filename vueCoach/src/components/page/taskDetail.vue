<template>
  <div class="taskDetail">
    <div class="info">
      <section>
        <img src="../../assets/rili.png" alt="">
        <span>{{ list.reserveTime }}</span>
      </section>
      <section>
        <img src="../../assets/local.png" alt="">
        <span>{{ list.reserveSite }}</span>
      </section>
      <section>
        <img src="../../assets/yuding.png" alt="">
        <span>{{ list.reserveName }}</span>
      </section>
    </div>
    <div class="students">
        <div class="list" v-for="value in list2" :id="value.userId">
          <section class="sec">
            <div class="headImg">
              <img v-if="value.memberPicture == null" src="../../../static/img/mohead.png" alt="">
              <img  alt="" v-else :src="value.memberPicture" >
            </div>
            <span class="name" v-html="value.nickname"></span>
            <span class="sex">{{value.sex}}</span>
            <span class="number">{{value.age}}岁</span>
            <span class="status">{{value.userStatus}}</span>
          </section>
          <section class="sec sec2">
            <a href="javascript:;" class="callphone" @click="callphone($event ,value.phone)">
              <div class="gongneng phone" :phone="value.phone">
                <img src="../../assets/phone.png" alt="" >
                <span class="msg">通话</span>
              </div>
            </a>
            <a href="javascript:;" class="sendmsg" @click="sendmsg($event ,value.phone)">
              <div class="gongneng callMsg" :phone="value.phone">
                <img src="../../assets/msg.png" alt="">
                <span class="msg">信息</span>
              </div>
            </a>
            <a href="javascript:;"  @click="studyfiles($event,value.memberId,list.serviceType,list.reserveNumber,list.reserveType,value.reserveId)"><div class="gongneng">
              <img src="../../assets/dangan.png" alt="">
              <span class="msg">档案</span>
            </div></a>
          </section>
        </div>
        <!-- <div class="list">
          <section class="sec">
            <div class="headImg">
              <img src="../../assets/tou.png" alt="">
            </div>
            <span class="name">李元龙</span>
            <span class="sex">男</span>
            <span class="number">25岁</span>
            <span class="status active">已签到</span>
          </section>
          <section class="sec">
            <div class="gongneng">
              <img src="../../assets/phone.png" alt="">
              <span>通话</span>
            </div>
            <div class="gongneng">
              <img src="../../assets/msg.png" alt="">
              <span>信息</span>
            </div>
            <div class="gongneng">
              <img src="../../assets/dangan.png" alt="">
              <span>档案</span>
            </div>
          </section>
        </div> -->


    </div>

  </div>
</template>

<script>
// 状态： 1是未签到，2是已签到 （这是自定的，到时候看接口定义状态字段）
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {formatDate} from '../../libs/data.js';
import {sessid} from '../../libs/sessid.js'
export default {
  data() {
    return{
      list:[],
      list2:[]
    }
  },
  created:function () {
    document.title="任务详情";
    var newId,type;
    var urlHash = window.location.hash;
    if(urlHash.length>20){
      var id = urlHash.split("?")[1];
      var newId = id.split("&")[0]; // 这里就拿到了当前的ID
      var type = id.split("&")[1];

      newId =newId.split("=")[1];
       type = type.split("=")[1];
       
    }
    console.log(newId,type);
    var sessionId = localStorage.getItem("json");
    sessid();

    // 拿到了请求数据所需要的一切东西  id  reserverNumber  status  sessionid
    let detail = AjaxConfig.api.severDetail;
    this.$http.get(detail,{params:{"reserveNumber":newId,"reserveType":type},headers:{
      "X-SESSION-ID":sessionId
    }}).then(function (response) {

      if(response.data.code ==0){
        var res = response.data.data;
        this.list2 = this.headImg(res.reserveDetails);

        this.list = res;


      }
    },function () {
        alert("请检查网络");
    });


  },
  mounted:function () {

  },
  methods:{
    callphone(e,phone) {
      var _this = e.currentTarget;
      $(_this).attr("href","tel:"+phone);
    },
    sendmsg(e,phone) {
      var _this = e.currentTarget;
      $(_this).attr("href","sms:"+phone);
    },
    studyfiles(e,id,type,number,typeT,reserveId) {
      
        var obj = {};
        obj.id = id;
        obj.type = type;
        obj.reserveNumber = number;
        obj.reserveType = typeT;
        obj.reserveId = reserveId;
        obj = JSON.stringify(obj);
        console.log(obj);
        var idType = localStorage.setItem('idType',obj);
        this.$router.push("/study/studyProject");
      

    }

  }
}
</script>

<style scoped>
.study{
  height: 2rem;
  line-height: 2rem;
  font-size: 0.7rem;
  width: 92%;
  margin: auto;
  border-top: 1px solid #dedede;
}
.info{
  margin-top: 0.5rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
}
.info>section{
  width: 92%;
  margin:auto;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 0.75rem;
}
.info>section img{
  width: 0.8rem;
  height:0.8rem;
  margin-right: 0.6rem;
}
.students{
  width: 100%;
}

.list{

  background-color: #fff;
  margin-bottom: 0.2rem;
}
.list>section{
  width: 92%;
  margin:auto;
  height: 2.85rem;
  line-height: 2.85rem;

}
.list>section:first-of-type{
  border-bottom: 1px solid #dedede;
}
.headImg{
  display: inline-block;
  width: 1.95rem;
  height: 1.95rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
  margin-top: 0.275rem;
  margin-right: 0.6rem;
}
.headImg img{
  width: 100%;
  height: 100%;
}
.sec span{
  display: inline-block;

}
.name{
  font-size: 0.8rem;
  color: #333;
  margin-right: 0.6rem;
  height: 2.85rem;
  line-height: 2.85rem;
  float: left;
}
.sex,.number{
  font-size: 0.75rem;
  color: #666;
  margin-right: 0.3rem;
  height: 2.85rem;
  line-height: 2.85rem;
  float: left;
}
.status{
  float: right;
  border-radius: 10px;
  height: 1.1rem;
  line-height: 1.1rem;
  padding:0rem 0.5rem;
  font-size: 0.75rem;
  margin-top: 0.9rem;
  background-color: #ededed;
  color: #8f8f8f;
}
.sec2{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.sec .gongneng,.sec2 a{
  width: 32%;
  color: #7f7f7f;
}
.sec2 a .gongneng{
  width: 87%;
  height: 50%;
  margin-top: 0.7rem;
}
.sec2 a:first-of-type .gongneng,.sec2 a:nth-of-type(2) .gongneng{
  border-right: 1px solid #dedede;
}
.phone,.callMsg{
  border-right: 1px solid #dedede;
}
.sec .gongneng img{
  width: 1.6rem;
  height: 1.6rem;
  float: left;
  /*margin-top: 0.55rem;*/
  margin-right: 0.6rem;
}
.sec .gang{
  display: none;
  float: left;
  width: 1px;
  height: 1.2rem;
  margin-top: 0.7rem;
  background-color: #dedede;
  margin-right: 0.6rem;
  margin-left: 0.6rem;
}
.sec2 .gongneng span{
  font-size: 0.75rem;
  margin-left: 0rem;
  float: left;
  width: 37%;
  line-height: 1.6rem;
}
.active{
  color: #fff !important;
  background-color: #6cc3ab !important;
}
.info>section:last-of-type{
  border: none;
}
.sec{
  border-bottom: none !important;
}
</style>
