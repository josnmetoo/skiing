<template>
  <div class="videocontainer">
    <div class="studyVideo">
      <div class="container">
        <section class="vidoList" v-for="value in list">
          <div class="Info" :value="value.coachid">
            <span class="coachImg"><img :src="value.curl" alt=""></span>
            <p class="infop1"><span class="coachName">{{value.cname}}</span><span class="project">{{value.aname}}</span></p>
            <p class="infop2"><span class="time">{{value.ctime | formatDate}}</span>

            <span class="status" style="color:#4ab6b5;" v-show="value.astatus == 0">通过</span>
            <span class="status" style="color:#fc5c62" v-show="value.astatus == 1">未通过</span>
            </p>
          </div>
          <div class="">
            <p class="judge">{{value.acommon}}</p>
          </div>
          <div class="mov">
            <video :src="value.avideo" poster="./static/img/play.png" id="movie" preload="meta" controls>

            </video>
          </div>
          <!-- poster="http://otf8fbdly.bkt.clouddn.com/9c98208937694faba7f72274cd538c63"  -->

        </section>
      </div>
      <p style="text-align:center;color:#dedede;font-size:0.9rem;margin-top:1rem;background-color:#f5f5f5;" v-show="this.list.length == 0">暂无数据</p>

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
      list:[],
    }
  },
  created:function () {
    document.title = "历史视频";
    var historyTime = AjaxConfig.api.historyTime;
    var sessionId = localStorage.getItem("json");
    sessid();
    var idType = localStorage.getItem('idType');
    idType = JSON.parse(idType);
    var userId = idType.id;
    var type = idType.type;
    this.$http.get(historyTime,{params:{"memberId":userId,"type":type},headers:{
      "X-SESSION-ID":sessionId
    }}).then(function (respone) {
      var res = respone.data;
      if(res.code == 0){
        var data = res.data;

        this.list = this.headImg(data);

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
.videocontainer{
  padding-bottom: 2rem;
  margin-top: 3rem;
}
.studyVideo{
  background-color: #fff;

}
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
