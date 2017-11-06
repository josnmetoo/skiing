<template>
  <div class="calendar">
    <section class="sec">
      <span @touchend="kai()">是否关闭全部课程</span>
      <p class="switch" @touchend="kai()" :kai="flag"><span></span></p>
    </section>
    <section class="sec2">
      <span class="status1">6</span>
      <span>已关闭课程</span>
      <span class="status2">8<span></span></span>
      <span>用户已预约</span>
    </section>
    <div class="week" style="background-color:#fff;">
      <div class="" >
        <p>日</p>
        <p>一</p>
        <p>二</p>
        <p>三</p>
        <p>四</p>
        <p>五</p>
        <p>六</p>
      </div>
    </div>

    <div class="content">


      <!-- <div class="con">
        <ul>
          <p class="time"><span>2017</span> 7月</p>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div> -->
    </div>
    <!-- <section class="sec3">
      历史状态
    </section> -->
    <!-- <div class="content2">

      <div class="con">
        <ul>
          <p class="time"><span>2017</span> 7月</p>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div> -->

  </div>
</template>
<!-- @click="selectStyle (item, $index)" :class="{'active':item.active,'unactive':!item.active}" -->
<script>
// 加载外部css js 的问题， 引入jQ的问题
//按需引入mint-ui 弹窗
import Vue from 'vue';
import { MessageBox } from 'mint-ui';
Vue.component(MessageBox.name, MessageBox);
import AjaxConfig from "../../ajaxConfig/ajaxConfig.vue"
import {sessid} from '../../libs/sessid.js'
export default {
  data() {
    return{
      "flag":true,
      list:[],
      "sessionId":""
    }
  },
  created:function () {
    document.title="个人排课";
  },
  mounted:function () {

    $(window).scroll(function () {
    var distance = $(window).scrollTop();
    if(distance >= 162){
      $('.week').addClass('fixedTop');
    }else{
      $('.week').removeClass('fixedTop');
    }
  });

var obj = $('.calendar')[0].dataset;
var dataVarr = [];
  for (let dataV in obj) {
      dataVarr.push(dataV);
    }
    var data_v = 'data-'+dataVarr[0];
    // 生命周期，未挂载之前
    var date = new Date();
    var month = date.getMonth()+1;// 得到当前的月份判断是否是历史状态
    var year = date.getFullYear(); // 当前年份
    var day = date.getDate();
    var nextYear = year + 1; // 下一年份
     
    var date = new Date(year,11,0); // 当前年份的11月
    var date2 = new Date(year,12,0); // 当前年份的12月
    var date3 = new Date(nextYear,1,0); // 下一年1月
    var date4 = new Date(nextYear,2,0);
    var date5 = new Date(nextYear,3,0);
   
     var dateMon = date.getMonth()+1;
    var date2Mon = date2.getMonth()+1; // 计算出当前的月份， 用来做判断，如果大于就显示为历史记录
    var date3Mon = date3.getMonth()+1;
    var date4Mon = date4.getMonth()+1+12;
    var date5Mon = date5.getMonth()+1+12;
  
   

    // 计算出当前的年份
     var dateYear = date.getFullYear();
    var date2Year = date2.getFullYear();
    var date3Year = date3.getFullYear();
    var date4Year = date4.getFullYear();
    var date5Year = date5.getFullYear();

   
    if(month<= 12){
      month = month;
    }else {
      month = month+12;
    }
    if(month <= dateMon+1){
      // 当前月份小于现在的，那么历史任务里面是没有内容的
      $('.content').empty();
      for(var i = 0; i<5;i++){
      var Day = dateMon++;
      if(Day>12){
        Day = Day - 12;
      }
        $('.content').append(`<div class="con con${i}" ${data_v}> <ul ${data_v}><p ${data_v} class="time"><span ${data_v}></span>&nbsp;<span>${Day}</span>月</p></ul></div>`);
      }
    }else if(month > date2Mon){
      var numlength = month - date2Mon;
      // 当前月份大于了11 月份， 能够得到大于了多少， 就能在历史任务中添加几个
    }
    
    $('.con0 .time span:first-of-type').html(2017);
    $('.con1 .time span:first-of-type').html(2017);
    $('.con2 .time span:first-of-type').html(2018);
    $('.con3 .time span:first-of-type').html(2018);
    $('.con4 .time span:first-of-type').html(2018);
  
     var dateDay = date.getDate();
    var date2Day = date2.getDate();// 获取到了当前年份11 月的天数
    var date3Day = date3.getDate();// 获取到了当前年份12 月的天数
    var date4Day = date4.getDate();// 获取到了下一年1 月的天数
    var date5Day = date5.getDate();// 获取到了下一年2 月的天数
  // 获取到了下一年3 月的天数
   
    // 月份是每年的11月到4月

    // 遍历生成天数结构的方法
    function rili(num,className) {
        for(var i = 1; i<= num;i++){
         //  console.log(i);
         // 这里调用6次方法添加6次

         var timeYear = parseFloat($('.'+ className).find('.time span:first-of-type').html());
         var timeMonth = parseFloat($('.'+ className).find('.time span:last-of-type').html());
         var timeDate = new Date(timeYear,timeMonth-1,i);
         var timeMiao = timeDate.getTime();
         $('.'+className).find('ul').append(`<li ${data_v} value="${timeMiao}" status="" class="li">${i} <span ${data_v}></span></li>`);
        }
   }
   rili(dateDay,'con0');
    rili(date2Day,'con1');
    rili(date3Day,'con2');
    rili(date4Day,'con3');
    rili(date5Day,'con4');
  
    
    //让已经过去的天数变灰
    var date = new Date();
    // 得到当前日期的周几，让表头对应的变色
    var titleDay = date.getDay();
    $('.week div p').each(function (index,value) {
      if(index == titleDay){
        $(this).addClass("weekDay");
      }
    });

    // 遍历全部日历，让第一天对应自己的周
    $('.content .con').each(function (index,value) {
      var year1 = $(value).find('.time span:first-of-type').html();
      var month = $(value).find('.time span:last-of-type').html();
      var lilength = $(value).find('li').length;

      year1 = parseFloat(year1);
      month = parseFloat(month)-1;
      var getMonth = month+1;
      var darili = new Date(year1,month,1);
      var week = darili.getDay();// 得到对应的周天数
      var endWidth = week*2.2;
      $(value).find('ul li:first-of-type').css({"marginLeft":endWidth+"rem"});

      var nowYear = date.getFullYear();//得到当前年份
      var nowMonth = date.getMonth()+1;// 得到当前的月份
      var nowDay = date.getDate(); // 得到当前的天数
      var ul = $(value).find('ul li');
      // console.log(nowMonth);
      // 差别的年份
      var chayear = nowYear - year1;
      var chamonth;

      if(year1<nowYear){
        chamonth = Math.abs(chayear)+12;
      }else if (year1 = nowYear) {
        chamonth = nowMonth;
      }
      var chaDay = chamonth - getMonth;
      chaDay = chaDay*lilength +nowDay;
      var year1 = $(value).find('.time span:first-of-type').html();
      year1 = parseFloat(year1);

      $.each(ul,function (liindex,livalue) {
        var linum = $(livalue).html();
        linum = parseFloat(linum);
        if(year1<=nowYear && getMonth<= chamonth && linum<chaDay){
          $(this).addClass('formTime')
        }
      })
    });
    // 判断当前是什么时间，已经过去的了要变色 添加 expire2



    // 获取sessionId
    var sessionId = localStorage.getItem("json");
    sessid();
    let classInfo = AjaxConfig.api.coachClass;
    var thisVue = this;
    this.sessionId = sessionId;
    var _this = this;
    let oneClass = AjaxConfig.api.oneClass; // 单点操作的时的接口
    $('.content').on('click','.con ul .li',function () {
      var __this = this;
      var timeChuo = parseFloat($(this).attr('value'));
      var periodStatus = $(this).attr('status');
      if(periodStatus == 2){
        alert("该天已经被预约，无法关闭");
        // $(__this).removeClass('li');
      }
      else {
      MessageBox.confirm('确定关闭该天课程?').then(action => {
          // if(periodStatus == undefined){
          //   periodStatus = 0;
          // }else{
          //   periodStatus = periodStatus;
          // }
          _this.$http.post(oneClass,{"X-SESSION-ID":sessionId,"periodTime":timeChuo,"periodStatus":0},{
             headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',"X-SESSION-ID":sessionId},
             emulateJSON: true
          }).then(function (response) {
              var data = response.data;

              if(data.code == 0){
                $(__this).attr('status',0);
                  $(__this).removeClass('li').addClass('expire');

                  // 改变状态重新请求列表
                    //ajaxList();

              }
            },function () {

            });
      });
        }
    });
    // 取消关闭课程
    $('.content').on('click','.con ul .expire',function () {
      var periodStatus = $(this).attr('status');
      var __this = this;
      var timeChuo = parseFloat($(this).attr('value'));
      if(periodStatus == 0){
        MessageBox.confirm('确定打开该天课程?').then(action => {
          _this.$http.post(oneClass,{"X-SESSION-ID":sessionId,"periodTime":timeChuo,"periodStatus":1},{
             headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',"X-SESSION-ID":sessionId,},
             emulateJSON: true
          }).then(function (response) {
              var data = response.data;
              if(data.code == 0){
                $(__this).removeClass('expire').removeClass('checked').addClass('li');
                 $(__this).attr('status',1);


                 // 改变状态 重新请求列表接口
                  ajaxList();


              }
            },function () {

            });

        });
      }

    })



    // 刚进入的时候请求列表
    var self2 = this;
    function ajaxList() {
      self2.$http.get(classInfo,{params:{"X-SESSION-ID":sessionId},headers:{
        "X-SESSION-ID":sessionId
      }}).then(function (response) {
        if(response.data.code == 0){
          console.log(response.data.data);
          var data = response.data.data.time;
          if(response.data.data.statusText=="关闭"){
            //alert(1)
               $('.switch').css({"backgroundColor":"rgba(123,210,186,0.5)","transition":" 0.5s"});
                $('.switch span').css({"transform":"translateX(1rem)","transition":" 0.5s"});
                 thisVue.flag = true;
          }else{
             $('.switch span').css({"transform":"translateX(0rem)","transition":" 0.5s"});
           thisVue.flag = false;
            $('.switch').css({"backgroundColor":"#ededed","transition":" 0.5s"});
          }
         // console.log(data)
          // 遍历结构， 遍历数据中的时间戳， 如果相等
          // 找到对应的时间戳， 把状态赋值给当前的li
          var statusArr = []; // 存储状态的数组
          $('.content .con ul li').each(function (index,value) {
                  var alltime = $(value).attr('value');
                  var valueStatus = $(value).attr('status');
                //  console.log(valueStatus);
                  statusArr.push(valueStatus);

                  $.each(data,function (index2,val2) {
                        //console.log(val2.stime)
                    if(val2.stime == alltime){
                      $(this).attr('status',val2.periodStatus);

                    }
                  })
              });
        $.each(data,function (index2,val2) {
              $('.content .con ul li').each(function (index,value) {
                var alltime = $(value).attr('value');
                if(val2.stime == alltime){

                  $(this).attr('status',val2.periodStatus);
                }
            });

          });




        $('.content .con ul li').each(function (index3,value3) {
          if($(value3).attr('status') == ''){
            $(value3).attr('status',1);
          }else if($(value3).attr('status') == 0){
            // 0 已关闭  2 已预约  1打开
            $(this).addClass('expire');

          }else if ($(value3).attr('status') == 2) {
            //alert(1)
            $(this).addClass('appointment');
              $(this).find("span").addClass('appointmentSpan');
            $(this).removeClass('expire');
          }
          var valueStatus = $(value3).attr('status');
          statusArr.push(valueStatus);

        });
console.log(statusArr);
        //遍历状态数组， 如果全部为0 那么就把开关关掉
        // for(var j=0; j < statusArr.length; j++){
        //   if($.inArray('1',statusArr) > -1){
        //     // 这里是全开

        //     $('.switch span').css({"transform":"translateX(0rem)","transition":" 0.5s"});
        //     thisVue.flag = false;
        //     $('.switch').css({"backgroundColor":"#ededed","transition":" 0.5s"});
        //     // $('.con ul li').removeClass("expire");
        //   }else {
        //     // 这里是全关
        //     $('.switch span').css({"transform":"translateX(1rem)","transition":" 0.5s"});
        //     $('.switch').css({"backgroundColor":"rgba(123,210,186,0.5)","transition":" 0.5s"});
        //     thisVue.flag = true;
        //     $('.con ul li').each(function (index,value) {
        //       if($(value).attr('status')==2){
        //         $(this).addClass('appointment');
        //         $(this).find("span").addClass('appointmentSpan');
        //         $(this).removeClass('expire');
        //       }else{
        //             $(this).removeClass('appointment');
        //             $(this).find("span").removeClass('appointmentSpan');
        //             $(this).removeClass('expire');
        //       }
        //     });
        //   }
        // }
        }else{

        }
      },function () {
          alert("网络连接错误");
      });
    }
    ajaxList();


  },
  methods:{
    kai(){
      let allClass = AjaxConfig.api.allClass; // 全开全关的操作接口
      const self = this;

      if(self.flag == false){
        // 0 全关 2全开
        var con = confirm("是否关闭全部课程？");
        // MessageBox.confirm('是否关闭全部课程?').then(action => {
        if(con == true){
          // 关闭全部课程
          self.$http.post(allClass,{"X-SESSION-ID":self.sessionId,"periodStatus":0},{
             headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',"X-SESSION-ID":self.sessionId},
             emulateJSON: true
          }).then(function (res) {
            console.log(res.data);
            // 成功后改变样式
            if(res.data.code == 0){
              $('.switch span').css({"transform":"translateX(1rem)","transition":" 0.5s"});
              $('.switch').css({"backgroundColor":"rgba(123,210,186,0.5)","transition":" 0.5s"});
              self.flag = true;
              $('.con ul li').each(function (index,value) {
                if($(value).hasClass('appointment')){
                  $(this).removeClass('checked');
                }else{
                  $(this).addClass('checked');
                }
              });

            }
          },function () {
            alert("请检查网络连接");
          });
        }


        // });
      }else if(self.flag == true){
        var con2 = confirm("是否打开全部课程？");
        // MessageBox.confirm('是否打开全部课程?').then(action => {
        if (con2 == true){
          // 打开全部课程
          self.$http.post(allClass,{"X-SESSION-ID":self.sessionId,"periodStatus":1},{
             headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',"X-SESSION-ID":self.sessionId},
             emulateJSON: true
          }).then(function (res) {
            console.log(res.data);
            // 成功后改变样式
            if(res.data.code == 0){
              $('.switch span').css({"transform":"translateX(0rem)","transition":" 0.5s"});
              self.flag = false;
              $('.switch').css({"backgroundColor":"#ededed","transition":" 0.5s"});
              $('.con ul li').removeClass('checked');
              $('.con ul li').removeClass('expire');
            }
          },function () {
            alert("请检查网络连接");
          });
        }


        
      }
    }
  }
}
</script>

<style scoped>
.mint-msgbox-confirm{
  color: #7bd2ba !important;
}
.calendar{
  font-size: 0.65rem;
  color: #666666;
}
.sec{
  height: 2.7rem;
  background-color: #fff;
  line-height: 2.7rem;
  padding-left: 0.6rem;
  margin-top: 0.7rem;
  font-size: 0.7rem;
}
.sec2{
  height: 2.5rem;
  /*line-height: 2.5rem;*/
}


.switch{
  float: right;
  width: 2rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: #ededed;
  border: 1px solid #dedede;
  margin-top: 0.68rem;
  margin-right: 0.6rem;
  position: relative;
}
.switch span{
  position: absolute;
  left: 0px;
  top: 0rem;
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
  background-color: #7bd2ba;
}
.sec2 span{
  display: inline-block;
  float: left;
}
.sec2 .status1{
  display: inline-block;
  width: 0.95rem;
  height: 0.95rem;
 
  text-align: center;
  line-height: 1rem;
  margin-top: 0.7rem;
  margin-left: 1rem;
  margin-right: 0.6rem;
  color: #bbbbbb;
  border-radius: 50%;
}
.sec2 .status2{
  display: inline-block;
  width: 0.95rem;
  height: 0.95rem;
  text-align: center;
  line-height: 0.95rem;
  margin-top: 0.7rem;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  color: #bbbbbb;
  position: relative;
}
.sec2 .status2 span{
  position: absolute;
  top: 40%;
  left: 6%;
  display: inline-block;
  width: 90%;
  height: 1px;
  background-color: #bbb;
  transform: rotate(-45deg);
  -ms-transform:rotate(-45deg); /* Internet Explorer */
-moz-transform:rotate(-45deg); /* Firefox */
-webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
-o-transform:rotate(-45deg); /* Opera */
}
.sec2 span:nth-of-type(2),.sec2 span:nth-of-type(4){
  display: inline-block;
  height: 2.5rem;
  line-height: 2.5rem;
}
.content{
  padding-bottom: 1rem;
}
.con{
  background-color: #fff;
  margin-bottom: 0.6rem;
  padding-bottom: 0.9rem;
}
.con ul {
  list-style: none;
  overflow: hidden;
  width: 87%;
  margin:auto;
}
.con ul  li{
  float: left;
  width: 2.2rem;
  height: 2.2rem;
  line-height: 2.2rem;
  text-align: center;
  box-sizing: border-box;
  margin-right: 0.05rem;
  margin-bottom: 0.05rem;
  font-family: myFirstFont;
  font-size: 0.75rem;
  color: #000;
  position: relative;
}
.con ul  li span{
  display: inline-block;
  width: 50%;
  height: 1px;
  background-color: #bbbbbb;
  position: absolute;
  top: 50%;
  z-index: 10;
  left: 27%;
  transform: rotate(-45deg);
  -ms-transform:rotate(-45deg); /* Internet Explorer */
-moz-transform:rotate(-45deg); /* Firefox */
-webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
-o-transform:rotate(-45deg); /* Opera */
  display: none;
}
.time{
  height: 1.8rem;
  color: #7bd2ba;
  line-height: 1.8rem;
  padding-top: 0.7rem;
  font-size: 0.7rem;
}
.time span{
  font-size: 1.2rem;
  font-weight: bold;
}
.sec3{
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  border-bottom: 1px solid #dedede;
  margin-bottom: 0.6rem;
}
.content2{
  padding-bottom: 2.2rem;
}
/*已关闭课程*/
.checked{
 
  color: #bbb !important;
  border-radius: 50%;
}
/*表头对应的天数变色*/
.weekDay{
  color: #7bd2ba;
}
/*关闭状态*/
.expire{

  color: #bbb !important;
  border-radius: 50%;
}
/*过期了，只是单纯的字体变色*/
.expire2{
color: #bbbbbb;
}
/*用户已预约*/
.appointment{
  color: #bbbbbb !important;
  display: inline-block !important;
}
.appointmentSpan{
  display: inline-block !important;
}


.week{
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  transition: all 0.5s;
}
.week div{
  width: 87%;
  margin: auto;
  display: flex;
  /*justify-content: space-around;
  align-items: center;*/
  height: 2.5rem;
}
.week div p{
  float: left;
width: 2.2rem;
height: 2.2rem;
line-height: 2.2rem;
text-align: center;
box-sizing: border-box;
margin-right: 0.05rem;
margin-bottom: 0.05rem;
margin-top: 0.2rem;
font-size: 0.75rem;
}
.fixedTop{
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  z-index: 20;
}
.formTime{
  color: #ededed !important;
}
</style>
