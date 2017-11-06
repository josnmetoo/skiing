<template>
  <div class="studyVideo">
    <div class="container">
      <section class="vidoList" v-for="value in list">
        <div class="Info" :value="value.coachId">
          <span class="coachImg"><img :src="value.coachUrl" alt=""></span>
          <p class="infop1"><span class="coachName">{{value.coachName}}</span><span class="project">{{value.archivesName}}</span></p>
          <p class="infop2"><span class="time">{{value.createTime | formatDate}}</span>

          <span class="status" style="color:#4ab6b5;" v-show="value.archivesStatus == 0">通过</span>
          <span class="status" style="color:#fc5c62" v-show="value.archivesStatus == 1">未通过</span>
          </p>
        </div>
        <div class="">
          <p class="judge">{{value.archivesCommon}}</p>
        </div>
        <div class="mov">
          <video :src="value.archivesVideo" poster="./static/bgimg/play.png" id="movie" preload="meta" controls>

          </video>
        </div>


      </section>
    </div>

  </div>
</template>

<script>
import Config from '../../config/config.vue'
import {formatDate} from '../../libs/data.js'
export default {
  data() {
    return{
      list:[],
    }
  },
  created:function () {
    document.title = "历史视频";
      var userid = sessionStorage.getItem("uid");
    var aid = sessionStorage.getItem("aid");
    var sessionId = sessionStorage.getItem('xid');
    var studyList = Config.api.myStudy;
    this.$http.get(studyList,{params:{"aid":aid,memberId:userid},headers:{
      "X-SESSION-ID":sessionId
    }}).then(function (respone) {
      var res = respone.data;
      if(res.code == 0){
        var data = res.data;
        console.log(data);
        this.list = data;

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

  }
}
</script>

<style scoped>
.container{
  width: 92%;
  margin: auto;
}
.vidoList{
  margin-bottom: 0.6rem;
}
.Info{
  overflow: hidden;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.3rem;
}
.coachImg{
  display: inline-block;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
.coachImg img{
  width: 100%;
  height: 100%;
}
.infop1,.infop2{
  float: left;
  width: 80%;
  overflow: hidden;
  margin-left: 0.6rem;
  height: 1rem;
  line-height: 1rem;
}
.infop1{
  font-size: 0.65rem;
  color: #000;
}
.project{
  float: right;
}
.time{
  font-size: 0.6rem;
  color: #666666;
  float: left;
}
.status{
  float: right;
  font-size: 0.6rem;
}
.judge{
  color: #687171;
  font-size: 0.65rem;
  text-indent: 4.1em;
  padding-bottom: 0.5rem;
}
.mov{
  width: 17.25rem;
  height: 11.45rem;
  padding-top: 0.2rem;
}
#movie{
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit:fill;
}


</style>
