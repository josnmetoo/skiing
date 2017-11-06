<template>

<div class="Pcontainer">
  <div class="studyProject">
    <span class="leftLine"></span>

    <div v-for="(value,index) in arr" class="leveList clear" :id="index" >
      <p class="lievP">
        <span class="level">Lv {{value.livgrade}}</span>
        <span class="leve2">{{value.livname}}</span>
        <img src="../../assets/arrow.png" alt="" class="arrow">
      </p>
      <div class="projectList clear" >
        <p class="projectP" v-for="value2 in value.content">
          <span class="levtype" v-if="value2.astatus == '0'" style="color:rgb(74, 182, 181); border-color:rgb(74, 182, 181)">{{value2.atype}}</span>
            <span class="levtype" v-else style="color:rgb(188, 188, 188); border-color:rgb(188, 188, 188)">{{value2.atype}}</span>
            <!-- <span class="levtype" v-show="value2.astatus == 0" style="color:rgb(74, 182, 181); border-color:rgb(74, 182, 181)">{{value2.atype}}</span>
            <span class="levtype" v-show='value2.astatus == 1 || value2.astatus == null' style="color:rgb(188, 188, 188);border-color:rgba(188,188,188,0.8)">{{value2.atype}}</span> -->

            <span class="name" style="background-color:#fc5c62;color:#fff;" v-if="value2.astatus == '1'" @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span>
            <span class="name" style="background-color:#4ab6b5;color:#fff;" v-if="value2.astatus == '0'" @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span>
            <span class="name" style="background-color:#ededed;color:#fff;" v-if="value2.astatus == ''" @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span>
          <!-- 这是没有上课的状态 -->
          <!-- <span class="name" style="background-color: #ededed;
          color: #bcbcbc;" v-show='value2.astatus == ""' :value="value2.aid"  @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span> -->
          <!-- 下面这是已通过 -->
          <!-- <span class="name" style="background-color:#4ab6b5;color:#fff;" v-show="value2.astatus == 0"  @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span> -->
          <!-- 下面这是未通过 -->
          <!-- <span class="name" style="background-color:#fc5c62;color:#fff;" v-show="value2.astatus == 1" @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span> -->
           <span class="time"  v-if="value2.astatus == ''"></span>
          <span class="time"  v-if="value2.astatus == '0'">{{value2.ctime | formatDate}}</span>
           
           <span class="returnUp" v-if="value2.astatus == '1'">未通过</span>
         </p>
        <!-- <p class="projectP"><span class="name">基础发力</span> <span class="time"></span> <span class="returnUp">重新上传</span></p> -->
      </div>

    </div>
    <!-- lv2 -->
    <!-- <div class="leveList leveList2">
      <p class="lievP">
        <span class="level">Lv 2</span>
        <img src="../../assets/arrow.png" alt="" class="arrow">
      </p>
      <div class="projectList projectList2">
        <p class="projectP"><span class="name">基础发力</span> <span class="time"></span> <span class="returnUp"></span></p>
        <p class="projectP"><span class="name">基础发力</span> <span class="time"></span> <span class="returnUp"></span></p>
      </div>

    </div> -->

  </div>
</div>

</template>

<script>
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../../libs/sessid.js'
import {formatDate} from '../../libs/data.js'
export default {
  data() {
    return{
      // null 未定义 0 已通过  1未通过
      // 这里定义的 0是未上课  1是已通过  2是 未通过
      arr:[],
      type:"",
      userId:"",
      reserveNumber:"",
      reserveType:"",
      coachStatus:"",
      cochstatus:"1",
      reserveId:"",
      // arr:[
      //   {
      //     level:'1',
      //     list:[
      //       {
      //         id:'1.0',
      //       status:"1",
      //       time:"2017-09-09",
      //       name:"基础发力"
      //     },
      //     {
      //       id:'1.1',
      //     status:"2",
      //     time:"2017-09-09",
      //     name:"螺旋腿"
      //     }
      //   ]
      //   },
      //   {
      //     level:'2',
      //     list:[
      //       {
      //         id:"2.1",
      //       status:"0",
      //       time:"2017-09-09",
      //       name:"单腿旋转"
      //     },
      //     {
      //       id:"2.2",
      //     status:"0",
      //     time:"2017-09-09",
      //     name:"双腿旋转"
      //     }
      //   ]
      //   },
      // ],


    }
  },
  created:function () {
    var studyList = AjaxConfig.api.studyArch;
    var nowCoachStatus = AjaxConfig.api.nowCoachStatus;
    var idType = localStorage.getItem('idType');
    idType = JSON.parse(idType);
    var userId = idType.id;
    this.userId = userId;
    var type = idType.type;
    var reserveType = idType.reserveType;
    var reserveId = idType.reserveId;
    this.reserveId = reserveId;
    this.reserveType = reserveType;
    this.type = type;
    this.reserveNumber = idType.reserveNumber;
    if(type == 0){
        document.title = "单板学习档案";
      }else if (type == 1) {
        document.title = "双板学习档案";
      }

    var sessionId = localStorage.getItem("json");
    sessid();
    // 拿到sessionId
    // 先请求教练状态， 接口成功以后再调用 列表  请求教练状态 用 reserveNumber  reserveType
    this.$http.get(nowCoachStatus,{params:{"reserveNumber":idType.reserveId,"reserveType":reserveType},headers:{
      "X-SESSION-ID":sessionId
    }}).then(function (coachStatus) {
      if(coachStatus.data.code == 0){
        var cochstatus = coachStatus.data.data.status;
        this.cochstatus = cochstatus;

      }
    },function () {
        alert('获取教练当前状态失败');
    });

    this.$http.get(studyList,{params:{"memberId":this.userId,"type":type},headers:{
      "X-SESSION-ID":sessionId
    }}).then(function (respone) {
      var res = respone.data;
      if(res.code == 0){
        var data = res.data;
        this.arr = data;

      }
    },function (error) {
        alert("获取列表失败");
    });



  },
  mounted:function () {

  },
  filters: {
        formatDate(time) {
          var date=new Date(time)
            return formatDate(date, 'yyyy.MM.dd');
        }
  },
  methods:{
    upload(id,status) {
        if(this.cochstatus != 3){
          alert("当前教练状态不能上传档案");
        }else{
          var infoObj = {};
          infoObj.userId =this.userId;
          infoObj.aid = id;
          infoObj.astatus = status;
          infoObj.serviceType = this.type;
          infoObj.reserveType = this.reserveType;
          infoObj.reserveId = this.reserveId;
          infoObj = JSON.stringify(infoObj);
          var uploadInfo = localStorage.setItem("uploadInfo",infoObj);
          this.$router.push("upload");
        }
    }

  }
}
</script>

<style scoped>
.levtype{
  float: left;
  font-size: 0.35rem;
  border: 1px solid rgba(188,188,188,0.8);
  border-radius: 4px;
  margin-right: 0.5rem;
  display: inline-block;
  margin-top: 0.5rem;
  padding:0px 0.2rem;
}
.leve2{
  display: block;
  width: 3rem;
  font-size: 0.6rem;
}
.Pcontainer{
  width: 100%;
  background-color: #fff;
  padding-bottom: 2.3rem;
  margin-top: 3rem;
}
.studyProject{
  width: 92%;
  margin: auto;
  position: relative;
  background-color: #fff;
}

.leveList{
  position: relative;
  height: auto;
  overflow: hidden;
}
.projectList{
  float: left;
  margin-left: 4.5rem;
  margin-top: 2rem;
  width: 72%;
}
.clear:after {
    content: '';
    display: block;
    clear: both;
}
.lievP{
  position: absolute;
  top: 2.45rem;
  left: 0px;
  color: #4ab6b5;
  font-size: 0.7rem;
  font-family:Microsoft Yahei,Hotel Tonight,Ultravisual,Fifa;
}
.arrow{
  width: 0.8rem;
  height: 0.7rem;
  position: absolute;
  top: 0rem;
  left: 3.07rem;
}
.leftLine{
  display: inline-block;
  height: 100%;
  width: 1px;
  background-color: #4ab6b5;
  position: absolute;
  left: 3.4rem;
  top: 1rem;
}
.projectP{
  padding-bottom: 0.3rem;
  overflow: hidden;
  height: 1.75rem;
  /*line-height: 1.75rem;*/
}
.projectP .name{
  padding:0.2rem 0.4rem;
  border-radius: 5px;
  background-color: #ededed;
  color: #bcbcbc;
  font-size: 0.7rem;
}
.projectP .time,.projectP .returnUp{
  float: right;
  font-size: 0.6rem;
}
.projectP .time{
  color: #bcbcbc;
  padding-right: 0.2rem;
}
.projectP .returnUp{
  color: #fc5c62;
}
</style>
