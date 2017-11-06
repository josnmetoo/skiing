<template>

<div class="studyProject">
  <span class="leftLine"></span>

  <div v-for="(value,index) in arr" class="leveList clear" :id="index" >
    <p class="lievP">
      <span class="level">Level {{value.livgrade}}</span>
      <img src="../../../static/bgimg/arrow.png" alt="" class="arrow">
      <span class="lveTitle">{{value.livname}}</span>
    </p>
    <div class="projectList clear" >
      <p class="projectP" v-for="value2 in value.content">
        <span class="levtype" v-if="value2.astatus == '0'" style="color:rgb(74, 182, 181); border-color:rgb(74, 182, 181)">{{value2.atype}}</span>
            <span class="levtype" v-else style="color:rgb(188, 188, 188); border-color:rgb(188, 188, 188)">{{value2.atype}}</span>
            <span class="name" style="color: rgb(188, 188, 188);" v-if="value2.astatus == '1'">{{value2.aname}}</span>
            <span class="name" style="color:rgb(74, 182, 181)" v-if="value2.astatus == '0'">{{value2.aname}}</span>
            <span class="name" style="color:rgb(188,188,188)" v-if="value2.astatus == ''" >{{value2.aname}}</span>
        <!-- <span class="levtype" v-show="value2.astatus == '0'" style="color:rgb(74, 182, 181); border-color:rgb(74, 182, 181)">{{value2.atype}}</span>
        <span class="levtype" v-show="value2.astatus == '1' || value2.astatus ==  " style="color:rgb(188, 188, 188);border-color:rgba(188,188,188,0.8)">{{value2.atype}}</span> -->
        <!-- 这是没有上课的状态 -->
        <!-- <span class="name" style="
        color: rgb(188, 188, 188);" v-show="value2.astatus == null" :value="value2.aid"  @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span> -->
        <!-- 下面这是已通过 -->
        <!-- <span class="name" style="color:rgb(74, 182, 181);" v-show="value2.astatus == 0"  @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span> -->
        <!-- 下面这是未通过 -->
        <!-- <span class="name" style="color:rgb(188,188,188);" v-show="value2.astatus == 1" @click="upload(value2.aid,value2.astatus)">{{value2.aname}}</span> -->
        <!-- 图片 -->
        <span class="videoList" @click="myVideo(value2.aid)" v-if="value2.astatus == '0'"><img src="../../../static/bgimg/shipin.png" alt=""></span>
        <span class="videoList" @click="myVideo(value2.aid)" v-if="value2.astatus == '1'"><img src="../../../static/bgimg/shipin2.png" alt=""></span>
        <span class="time"  v-show="value2.astatus == '0'">已通过</span>
         <span class="returnUp" v-show="value2.astatus == '1'">继续预约</span>
       </p>

    </div>

  </div>


</div>

</template>

<script>
import Config from '../../config/config.vue'
export default {
  data() {
    return{
      // null 未定义 0 已通过  1未通过
      // 这里定义的 0是未上课  1是已通过  2是 未通过
      arr:[],
      type:"",
      userId:"",
      // arr:[
      //   {
      //     level:'1',
      //     list:[
      //       {
      //         aid:'1.0',
      //       astatus:"0",
      //       time:"2017-09-09",
      //       aname:"基础发力"
      //     },
      //     {
      //       aid:'1.1',
      //     astatus:"1",
      //     time:"2017-09-09",
      //     aname:"螺旋腿"
      //     }
      //   ]
      //   },
      //   {
      //     level:'2',
      //     list:[
      //       {
      //         aid:"2.1",
      //       astatus:null,
      //       time:"2017-09-09",
      //       aname:"单腿旋转"
      //     },
      //     {
      //       aid:"2.2",
      //     astatus:null,
      //     time:"2017-09-09",
      //     aname:"双腿旋转"
      //     }
      //   ]
      //   },
      // ],


    }
  },
  created:function () {
    document.title = "双板学习档案";
    var userid = sessionStorage.getItem("uid");
    var sessionId = sessionStorage.getItem('xid');
    var process = Config.api.studyProcess;
    this.$http.get(process,{params:{"memberId":userid,"type":1},headers:{
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
    myVideo(aid) {
      var aid = sessionStorage.setItem('aid',aid);
      this.$router.push('/study/studyVideo');
    }

  }
}
</script>

<style scoped>
@import "/static/animate.css";
.studyProject{
  width: 92%;
  margin: auto;
  position: relative;
  background-color: #fff;
}
.lveTitle{
  font-size: 0.5rem;
  color: #4ab6b5;
  display: inline-block;
  position: absolute;
  top: 1rem;
  left: 0rem;
  width: 2.6rem;
  height: 1rem;
}
.levtype{
  float: left;
  font-size: 0.35rem;
  border: 1px solid rgba(188,188,188,0.8);
  border-radius: 4px;
  margin-right: 0.5rem;
  display: inline-block;
  margin-top: 0.17rem;
  padding:0px 0.2rem;
}

.leveList{
  position: relative;
  height: auto;
  overflow: hidden;

}
.level{
  font-size: 0.65rem;
}
.projectList{
  float: left;
  margin-left: 3.9rem;
  margin-top: 1rem;
  width: 77%;
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
  width: 0.85rem;
  height: 0.7rem;
  position: absolute;
  top: 0.1rem;
  left: 2.45rem;
}
.videoList{

}
.videoList img{
  width: 0.9rem;
  height: 0.7rem;
  float: left;
  margin-top: 0.1rem;
}
.leftLine{
  display: inline-block;
  height: 100%;
  width: 1px;
  background-color: #4ab6b5;
  position: absolute;
  left: 2.8rem;
  top: 1rem;
}
.projectP{
  padding-bottom: 0.3rem;
  overflow: hidden;
  height: 1.75rem;
  /*line-height: 1.75rem;*/
}
.projectP .name{
  font-size: 0.7rem;
  float: left;
  margin-right: 0.6rem;
}
.projectP .time,.projectP .returnUp{
  float: right;
  font-size: 0.7rem;
}
.projectP .time{
  color: rgb(74, 182, 181);
  padding-right: 0.2rem;
}
.projectP .returnUp{
  color: #fc5c62;
}
.projectList{
  border-bottom: 1px solid #f9f9f9;
}
</style>
