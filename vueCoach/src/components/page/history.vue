<template>
  <div class="h">
    <div class="listCon">
      <p v-show="articles.length == 0" style="font-size:0.8rem;color:#ccc;text-align:center;margin-top:1rem;">暂无任务</p>
      <div class="list" v-show="articles.length !=0" v-for="(value,$index) in articles" @click="detail(value.reserveNumber,value.reserveType)" :id="value.reserveNumber">
        <!-- -->
        <div class="div1"><img src="../../assets/rili.png" alt=""><span>{{value.reserveTime}}</span></div>
        <div class="div2"><img src="../../assets/local.png" alt=""><span>{{ value.reserveSite }}</span>
          <p class="status" v-show="value.reserveStatus == 0" style="color:#dedede">已完成</p >
            <p class="status" v-show="value.reserveStatus == 3" style="color:#6cc3ab">待处理</p >
              <p class="status" v-show="value.reserveStatus == 1" style="color:#dedede">已取消</p >
                <p class="status" v-show="value.reserveStatus == 2" style="color:#e68888">爽约了</p >
                  <p class="status" v-show="value.reserveStatus == 4" style="color:#6cc3ab">待服务</p>
              </div>
         <div class="div3"><img src="../../assets/yuding.png" alt=""><span :class="" v-if="value.reserveType==2">{{ value.reserveTypes }}</span><span :class="" v-else>{{ value.reserveTypes }}</span></div>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../../libs/sessid.js'
export default {
  data() {
    return {
        articles:[],
    }
  },
  mounted:function () {
    // 获取必要id
    var sessionId = localStorage.getItem("json");
    sessid();
var tarkId = localStorage.setItem("data",sessionId);
    var nav = document.querySelector('.nav ul li:first-of-type a');
    var a = nav.firstChild;
    var img1 = a.firstChild;
    var img2 = a.lastChild;
    var span = nav.lastChild;
    var url = window.location.hash;
      if(url == '#/home/history' || url == "#/home/end"){
        img1.style.display="none";
        img2.style.display="inline-block";
        span.style.color="#6cc3ab";
      }else{
        img1.style.display="inline-block";
        img2.style.display="none";
        span.style.color="#dedede";
      }

      let severList = AjaxConfig.api.severList; // 任务列表接口
      this.$http.get(severList,{params:{"X-SESSION-ID":sessionId,"type":1},headers:{
        "X-SESSION-ID":sessionId
      }}).then(function (response) {
          var res = response.data;
          if(res.code == 0){
            var data = res.data;
            this.articles = data.coachReserve;
            // console.log(data);
          }
      },function (response) {
        alert("请检查网路连接");
      });
  },
  filters:{

      stateFilter(value){
          let res='';
          switch(value){
              case "3":
                  res="已查看";
                  break;
              case "4":
                  res="未查看";
                  break;
              default:
                  res=''
              }
          return res;
      }
  },
  methods:{
    detail(id,type) {
      // 这个id 就是当前列表点击获取到他的 id
      const self = this;
      self.$router.push('/taskDetail?id='+id+'&type='+type);
      localStorage.setItem('id',id);
    },
  }

}
</script>
<style scoped>
.listCon{
  padding-bottom: 2rem;
}
.active{
  color: #e68888 !important;
}
.list{
  width: 92%;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  height: 5.4rem;
  margin-top: 0.6rem;
}
.list div img{
  width: 0.7rem;
  height: 0.7rem;
  float: left;
  margin:0.5rem 0.6rem 0px 0.75rem;
}
.list div span{
  float: left;
}

.list div{
  font-size: 0.7rem;
  color: #666666;
  overflow: hidden;
  height: 1.7rem;
  line-height: 1.7rem;
}
.status{
  margin-right: 1.6rem;
  float: right;
  color:#6cc3ab;
}
</style>
