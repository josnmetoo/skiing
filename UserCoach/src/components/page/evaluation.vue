<template>
  <div class="evaluation">
    <!-- 这里星星评价，是点击当前的获取前面的兄弟节点，改变图片src,获取后面的兄弟节点，改变成灰色星星 不然，假如点击了后面，再点前面， 后面的不会变回去了 ，这里给前面span 添加一个选中的class 给后面的兄弟节点添加一个没有选中的class -->
    <section class="titCon">
        教练预约： <span>{{scon}}</span>
    </section>
    <div class="setStart">
      <section class="start-o">
        <span>教学打分</span>
        <p class="start-c start-f">
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
        </p>
      </section>
      <section class="start-o">
        <span>服务打分</span>
        <p class="start-c start-s">
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
          <span><img src="../../../static/bgimg/start.png" alt=""></span>
        </p>
      </section>
    </div>

    <!-- 点击确定按钮的时候，判断拥有class 的length 就能得到评分是几 -->
    <div class="comment">
      <div class="conmment-text">
        <textarea name="name" class="comm-text" placeholder="有什么想说的.." ref="sendMsg"></textarea>
      </div>

    </div>
    <p class="eventAfter">评论后我们会及时向您反馈消息。</p>
    <div class="btn" @click="sendComment()">
      发布
    </div>
  </div>
</template>

<script>
import Config from '../../config/config.vue'
export default {
  data(){
    return{
      id:"",
      type:"",
    }
  },
  created:function () {
    var storage = sessionStorage.getItem("orderidT");
    storage = JSON.parse(storage);
    var id = storage.id;
    var type = storage.type;
    this.id = id;
    this.type = type;
    this.scon = storage.scon;
  },
  mounted:function () {
    $('.start-c span').on('click',function () {
      $(this).prevAll().addClass('checked').removeClass('nocheck');
      $(this).addClass('checked').removeClass('nocheck');
      $(this).nextAll().addClass('nocheck').removeClass('checked');
      $(this).find('img').attr('src','./static/bgimg/redStart.png');
      $(this).prevAll().find('img').attr('src','./static/bgimg/redStart.png');
      $(this).nextAll().find('img').attr('src','./static/bgimg/start.png');
    });
  },
  methods:{
    sendComment() {
      var commentUrl = Config.api.userComment;
      var arr1 = [];
      var arr2 = [];
      var id = this.id;
      var type = this.type;
      var value = this.$refs.sendMsg.value; // 备注信息
      $('.start-f span').each(function (index,value) {
        if($(value).hasClass('checked')){
          arr1.push($(this));
        }
      });
      $('.start-s span').each(function (index,value) {
        if($(value).hasClass('checked')){
          arr2.push($(this));
        }
      });
      var pingfen1 = arr1.length*2;
      var pingfen2 = arr2.length*2;
      console.log(pingfen1,pingfen2,value);
      if(pingfen1<= 0 || pingfen2 <=0){
        alert("请给教练评分");
      }else if(value == "" || value.length>400){
        alert("请输入200字以内的教练评价");
      }else{
        // 走接口
        var sid=sessionStorage.getItem('xid');
        this.$http.post(commentUrl,{"sid":id,"stype":type,"tscore":pingfen1,"sscore":pingfen2,"content":value},{
               headers: {"X-SESSION-ID":sid},
               emulateJSON: true
            }).then(function (response) {
              if(response.data.code == 0){
                alert("评论成功");
                this.$router.push("/Paid");
              }
            },function (error) {

            });
      }

    }

  }
}
</script>

<style scoped>
.titCon{
  text-align: center;
  font-size: 0.7rem;
  height: 2.5rem;
  line-height: 2.5rem;
}
.setStart{
  width: 100%;
  height: 4.5rem;
  background: #fff;
  margin-bottom: 0.5rem;
}
.start-o{
  width: 92%;
  margin: auto;
  overflow: hidden;
  font-size: 0.7rem;
  height: 2.25rem;
  line-height: 2.25rem;
}
.start-o .start-c{
  float: right;
}
.start-c span{
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.1rem;
  position: relative;
  transition: all 0.5s;
}
.start-c span img{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  transition: all 0.5s;
}
.comment{
  width: 100%;
  height: 7.5rem;
  background-color: #fff;
  margin-bottom: 1rem;
}
.conmment-text{
  width: 92%;
  margin: auto;
  height: 100%;
}
.conmment-text textarea{
  width: 100%;
  height: 94%;
  border: none;
  outline: none;
  resize: none;
  margin-top: 2%;
  color: #484848;
}
.conmment-text textarea::placeholder{
  color: #dedede;
}
.eventAfter{
  text-align: center;
  font-size: 0.65rem;
  color: #484848;
}
.btn{
  width: 82%;
  height: 2.25rem;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  line-height: 2.25rem;
  background-color: #fc5c62;
  margin: 1rem auto 0;
  border-radius: 5px;
}
</style>
