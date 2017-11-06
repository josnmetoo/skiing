<template>
  <div class="upload">
    <div class="fitstDiv">
      <div class="examstatus">
        <p class="examTit">考核状态</p>
        <p class="examBtn" >
          <!--  @click="selectStyle (item, $index) " :class="{'active':item.active,'unactive':!item.active}" -->
          <span class="statusBtn" v-for="(item,$index) in items" :value="item.id"  @click="aaa($event)">{{item.name}}</span>
        </p>
      </div>
    </div>
    <!-- 上传视频 -->
    <div class="secDiv">
      <div class="uploadVideo">
        <p class="examTit">上传视频</p>
        <div class="up">
          <div class="upmv">
            <div class="firstI" @click="upload()" v-show="btn">
              <img src="../../../static/img/jia.png" alt="" class="jia">
              <p class="upmsg">上传视频不能超过30M</p>
            </div>

          </div>
          <div class="loding" v-show="load">
            <img src="../../../static/img/loading.gif" alt="" class="jia">
            <p class="upmsg2">{{pecent}}</p>
          </div>
          <input type="file" name="file" value="上传视频" accept="video/*"  id="file" hidden="hidden">
          <input type="file" name="file" value="" class="danImg" style="display:none">
            <span class="close" @click="closeVid($event)" v-show="mv"><img src="../../../static/img/close.png" alt=""></span>
          <div class="vidCon" v-show="mv" v-if="mv" v-html="vidArr">
            <!-- v-if="mv" v-for="value in vidArr" v-html="value" -->
            <!-- 这里加删除按钮 -->

          </div>
        </div>
      </div>
    </div>

    <!-- 教学评价 -->
    <div class="thirdDiv">
      <div class="takemsg">
        <p class="examTit">教学评价</p>
        <div class="setMsg">
          <textarea name="name" rows="" cols="" placeholder="说说您对该学员此次课程的评价" ref="common"></textarea>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <p>{{timeAjax}}</p>
    <div class="sureCon">
      <div class="sure" @click="sure()">
        完成
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../../libs/sessid.js'
export default {
  data() {
    return{
      active: false,
      mv:false,
      btn:true,
      dan:"",
      load:false,
      Vid:'',
      vidArr:"",
      serviceType:"",
      aid:"",
      astatus:"",
      userId:"",
      sessionId:"",
      reserveId:"",
      reserveType:"",
      code:"",
      items:[
        {id:"0",name:"通过"},
        {id:"1",name:"未通过"},
      ],
      LENGTH:204800,
      start:0,
      end:"",
      blob:"",
      pecent:"",
      pecentNum:"",
      ansy:false,
      timeAjax:"",
      pppurl:''
    }
  },
  created:function () {
    document.title = "上传学习档案";

    var sessionId = localStorage.getItem("json");
    sessid();
    this.sessionId = sessionId;
    // 拿到sessionId
    var uploadInfo = localStorage.getItem("uploadInfo");
    uploadInfo = JSON.parse(uploadInfo);

    console.log(uploadInfo);
    this.aid = uploadInfo.aid;
    this.astatus = uploadInfo.astatus;
    this.serviceType = uploadInfo.serviceType;
    this.userId = uploadInfo.userId;
    this.reserveId = uploadInfo.reserveId;
    this.reserveType = uploadInfo.reserveType;


  },
  mounted:function () {
    var _this=this
    const self = this;
    if(self.astatus == 0){
      $('.examBtn span:first-of-type').addClass("active");
      $('.examBtn span:last-of-type').removeClass("active");
    }else if (self.astatus == 1) {
      $('.examBtn span:first-of-type').removeClass("active");
      $('.examBtn span:last-of-type').addClass("active");
    }

  var code = 0;
    var dan ;
    var start;
   var end;
   var blob;
   var pecent;
   var filename;
   var stop;
   var LENGTH = 204800; // 200KB
    function up(formdata,i,all,name) {
      $.ajax({
        url:'/api/common/upload/video?key='+name+'&chunk='+i+'&chunks='+all+'',
        type:'POST',
        data:formdata,
        processData:false,
        contentType:false,
        async:false,
        success:function(json){

          if(json.code == 0){
            dan = json.data.url;
            if(dan == undefined || dan == null){

            }else{
              var time = setInterval(function () {
                dan = dan+'?'+new Date().getTime()
                $.ajax({
                 url: dan,
                 type: 'GET',
                 async:false,
                 complete: function(response){
                  if(response.status == 404){
                      $('.msg').html('转码中...');
                       var msg = "转码中...";
                                _this.pecent = msg;
                               _this.load = true;
                              _this.mv = false;
                              _this.btn = false;
                    // 动画，解码中
                 }else if(response.status == 200){

                    window.clearInterval(time);
                    alert("上传成功");
                     var video = '<video src='+dan+' controls class="vid" id="video" poster="./static/img/play.png"></video>'
                                  _this.pppurl=json.data.url;
                                  _this.vidArr = video;

                                   _this.btn = false;
                                   _this.load = false;
                                   _this.mv = true;
                   $('.vid').attr("src",dan);
                 }else{
                   alert("上传失败");
                 }
                 }
                });
              },2000);
            }
          }else{

            // up(nowFormdata,nowNum,allDuan,nowName)
          }
          code = json.code;
          // console.log(code);
        }
      });
    }

  var nowNum,nowFormdata,nowName,allDuan;

    function uploadEdieFile(file){
      var formdata = new FormData();
      var filesize = file.size;
      console.log("文件大小："+filesize);
      var name = new Date().getTime()+parseInt(Math.random()*1000);
      var duan = filesize / LENGTH;
      duan = Math.ceil(duan);
      allDuan = duan;
      start=0;
      end=LENGTH+start;
    //   blob=file.slice(start,end);
    //   formdata.append('file',blob);
    //  formdata.append('test',file.name);
    //   up(name,1,duan,formdata);
    //   nowName = name;
    //   nowFormdata = formdata;
    //   nowNum = 1;
    //  console.log(formdata);

      for(var i= 1; i<= duan; i++){
        nowNum = i;
        var formdata = new FormData();

        end=LENGTH+start;
        console.log(start,end);
          blob=file.slice(start,end);
          formdata.append('file',blob);
          // formdata.append("key",name);
          // formdata.append("chunks",allDuan);
          // formdata.append("chunk",i);
          console.log(blob,i,allDuan,name);
          nowFormdata = formdata;
          // console.log(code);
         if(code == 0){
           start = LENGTH+start;
           if(i<= duan){
             var nowprent = i / duan *100+"%";
              $(".upmsg").html(nowprent);
            up(formdata,i,allDuan,name);
           }
         }else {
           break;
         }

        }

      $('.msg').html('上传中...');
    
    }

$("#file").change(function(){
   var fileSize = 0;
               
                fileSize = this.files[0].size;
                var size = fileSize / 1024 / 1024;
                 if (size > 30) {
                  alert("文件不能大于30M");
                }else{

                  var file = $('#file')[0].files[0];
                      uploadEdieFile(file);
                }
});
    function fileChange(target){
              
            }

            function uploadEdieFile2(file){
             





             
            }
            var file1 = document.querySelector('.danImg');
        file1.onchange = function (e) {
              var fileUploadControl = file1.files[0];
              if (file1.files.length > 0) {
                var file = file1.files[0];

                    uploadEdieFile2(file);
              }
          }

  },
  methods:{
    selectStyle (item, index) {
　　　　　　this.$nextTick(function () {
　　　　　　　　this.items.forEach(function (item) {
　　　　　　　　　　Vue.set(item,'active',false);
　　　　　　　　});
　　　　　　　　Vue.set(item,'active',true);
　　　　　　});
　　　　},
    upload() {
      $('#file').click();
    },
   

        //上传视频的方法 ↑
        closeVid(e){
          // 删除视频
          var closeBtn = e.currentTarget;
          $(closeBtn).fadeOut(100);
          $('.vidCon').find('video').remove();
          this.mv = false;
          this.load = false;
          this.btn = true;
          this.pppurl = "";
        },
        sure(){
          var uploadStudy = AjaxConfig.api.uploadStudy;
          var msg = this.$refs.common.value;
          var status;

          $('.examBtn span').each(function (index,value) {
            if($(value).hasClass('active')){
               status =  $(this).attr('value')
            }
          });
          var aid = this.aid;
          if(status == "" || status == null || status == undefined){
            alert("请选择学员是否通过");
          }else if (this.pppurl == null || this.pppurl == "" || this.pppurl== undefined) {
            alert("请先上传视频");
          }else{
            this.$http.post(uploadStudy,{
                "memberId":this.userId,
                "videoUrl":this.pppurl,
                "common":msg,
                "aid":aid,
                "astatus":status,
                
                "reserveNumber":this.reserveId,
                "type":this.reserveType
            },{
               headers: {"X-SESSION-ID":this.sessionId},
               emulateJSON: false
            }).then(function (respone) {
              var res = respone.data;
              if(res.code == 0){
                // token 未失效，直接跳转页面
                alert("填写成功");
                this.$router.push("/study/studyProject");
              }else{
                alert("添加失败");
              }
            },function () {
                alert("请检查网络连接");
            });
          }


        },
        aaa(e) {
            $('.examBtn span').removeClass("active");
            var thisSpan = e.currentTarget;
            $(thisSpan).addClass("active");
          }
        }


}
</script>

<style>
.active{
  background-color: #4ab6b5 !important;
  color: #fff !important;
}
.loading{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.fitstDiv{
  background-color: #fff;
  height: 5.5rem;
  width: 100%;
  margin-top: 0.5rem;
}
.examstatus{
  width: 92%;
  margin: auto;

  margin-bottom: 0.75rem;
}
.examTit{
  padding-top: 0.8rem;
  color: #000;
  font-size: 0.65rem;
  padding-bottom: 0.35rem;
}
.examBtn{
  height: 2rem;
  line-height: 2rem;
  margin-top: 0.4rem;
}
.examBtn .statusBtn{
  display: inline-block;
  width: 4.2rem;
  height: 1.75rem;
  text-align: center;
  line-height: 1.75rem;
  border-radius: 5px;
  background-color:#ededed ;
  color: #bcbcbc;
  font-size: 0.7rem;
  margin-right: 1rem;
}
.secDiv{
  margin-top: 0.5rem;
  height: 11.5rem;
  background-color: #fff;
}
.uploadVideo{
  width: 92%;
  margin: auto;
}
.up{
  width: 100%;
  height: 9.4rem;
  text-align: center;
  position: relative;
}
.upmv{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 2;
}
.jia{
  width: 3.1rem;
  height: 3.1rem;
  padding-bottom: 0.6rem;
  padding-top: 2rem;
}
.upmsg{
  font-size: 0.6rem;
  color: #c9c9c9;
  font-weight: lighter;
}
.upmsg2{
  font-size: 0.8rem;
  color: #c9c9c9;
}
.up .vidCon{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 100;
}
.up .close{
  position: absolute;
  right: 0rem;
  top: -1.5rem;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 1000;
}
.up .close img{
  width: 100%;
  height: 100%;
}
.up .vidCon video{
  width: 100%;
  height: 100%;
  object-fit:fill;
}

.thirdDiv{
  margin-top: 0.5rem;
  background-color: #fff;
  padding-bottom: 2rem;
}
.takemsg{
  width: 92%;
  margin: auto;
}
.setMsg{
  width: 95%;
  height: 5.5rem;
  background-color: #ededed;
  padding:0.2rem 0.5rem;
}
.setMsg textarea{
  background-color: #ededed;
  width: 100%;
  height: 100%;
  color: #c9c9c9;
  border: none;
  outline: none;
  font-size: 0.7rem;
  resize:none;
}
::-webkit-input-placeholder { /* WebKit browsers */
color: #c9c9c9;
}
.sure{
  /*position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;*/
  width: 92%;
  margin: auto;
  height: 2.5rem;
  z-index: 10;
  background-color: #4ab6b5;
  color: #fff;
  text-align: center;
  line-height: 2.5rem;
  font-size: 0.7rem;
  border-bottom: 1rem solid #fff;
}
.sureCon{
  width: 100%;
  background-color: #fff;
}
</style>
