<template>
  <div class="h" @touchmove="sho()">
  <div class="cen" v-show="kaij" @click="kaij=false">
    <div class="conent conents" >
 <div id="calendar">
  <div class="month">
  <ul>

   <li class="arrow zou" @click.stop="pickPre(currentYear,currentMonth)"><img src="../../assets/zuo.png"></li>
   <li class="year-month" @click.stop="bg()">
   <span class="choose-year"><b>{{ currentYear }}</b></span>
   <span class="choose-month">{{ currentMonth }}月</span>
   </li>
   <li class="arrow" @click.stop="pickNext(currentYear,currentMonth)"><img src="../../assets/you.png"></li>

   <li class="lo">确定</li>
  </ul>
  </div>
  <ul class="weekdays">
   <li >日</li>
  <li>一</li>
  <li>二</li>
  <li>三</li>
  <li>四</li>
  <li>五</li>
  <li >六</li>

  </ul>
  <ul class="days">

   <li   v-for="(day,index) in days" >

   <span   >{{ day.getDate() }}</span>


  </li>
  </ul>
 </div>
    </div>
  </div>








  <div class="box">
    <div class="top">
    <div class="bg">
      <!-- <img src="../../assets/bg1.png" alt=""/> -->
    </div>
    <img :src="json.bpic+'_w720'" alt=""/>
    <p class="pi">
    <img class="img" :src="json.purl+'_w100'"/>
      <span class="name"><b>{{json.cname}}</b></span>
      <span class="ne">{{json.raname}}</span>
      </p>
      <!-- //<p class="pi2">学无止境，我一直在努力</p> -->
      <p class="pi3" v-html="json.cintro"></p>
    </div>


     <div class="jia">
      <ul class="one">
        <li v-for="val in json.clable">
          {{val.lname}}
        </li>

      </ul>
     </div>
     <div class="qk">
    <p class="pi4"><img class="pimg" src="../../assets/weizhi.png"><span>{{json.rname}}</span> <img class="pimg2" src="../../assets/yuyue.png"> <span class="sss">{{json.creserve}}人预约过</span></p>
    <p class="pi5"> <img class="pimg3" src="../../assets/dui.png"><span>明天</span> <img class="pimg4" src="../../assets/dui.png">
   <span>后天</span> <img class="pimg5" src="../../assets/dui.png"><span>大后天</span></p>
    <p class="p3">
     <span class="us1" @click="houser()" v-if="code=='1' && code!=''">已收藏</span><span class="s1" @click="houser()" v-if="code=='0' && code!=''" >+收藏</span>
   
   
  <span class="s2" @click="kai()"><img class="kk" src="../../assets/yan.png"><span>查看近期预约</span></span>

  </div>
  </div>




  <div class="bg1"></div>
 <div id="box">

    <ul class="ziji">
       <li class="on"><img src="../../assets/kecheng.png" alt=""/>&nbsp;&nbsp;教练简介</li>
      <li><img src="../../assets/yuding.png" alt=""/>&nbsp;&nbsp;&nbsp;&nbsp;预定须知</li>
      <li @click="com()"><img src="../../assets/xueyuan1.png" alt=""/>&nbsp;&nbsp;用户评价</li>
    </ul>
     <p class="zij"></p>
    <div style="display: block;" v-html="ry.glory">

    </div>
    <div class="mist">

  <p class="op ">关于「预订流程」 </p>
  <p class="p">
    选择教练 ☞ 确定预约日期及雪场 ☞ 完成支付 ☞ 生成订单 ☞ 线下教学 ☞ 完成订单
  </p>
  <p class="op po">关于「退订规则」 </p>
  <p class="p">
     课程开始前至少48小时可做退订处理，课程开始与过期则无法完成退订。
退款会在1 - 3个工作日内返还至您的支付账户。
  </p>

  <p class="op po">关于「注意事项」</p>
  <p class="p">1. 为保证教学质量，实行一对一教学制</p>
  <p class="p">2. 仅为滑雪教学及保险费用，其他费用需要自理（如租赁雪具、雪票、午晚餐等）</p>
  <p class="p">3. 请至少提前1天预约（不支持随到随学）</p>
  <p class="p">4. 如有疑问请拨打客服电话400-811-7555（在线时间：8:00 - 18:00）</p>


    </div>

    <div class="most">
      <p style="color:#ccc;font-size:0.7rem;text-align:center;padding-bottom:1rem;" v-show="evaluates.length == 0">
        <div class="comNum" >
          <section class="num-o">
            <img src="../../../static/bgimg/sever.png" alt="">
            <p>{{comments.sscore}}</p>
          </section>
          <section class="num-o">
            <img src="../../../static/bgimg/study.png" alt="">
            <p>{{comments.tscore}}</p>
          </section>
          <section class="num-o">
            <img src="../../../static/bgimg/syn.png" alt="">
            <p>{{comments.mscore}}</p>
          </section>
        </div>
        <section class="userCom">
          暂无用户评价
        </section>
        <div class="userComlist" v-for="val2 in comments.evaluates">
          <div class="userTitle">
            <section class="userImg">
              <img :src="val2.uavatar" alt="">
            </section>
            <p class="username" v-html="val2.unickname"></p>
            <p class="comTime">{{val2.time}}</p>
            <p class="startNum" :value="parseInt(val2.uscore)">
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="pingfen">{{val2.uscore}}</span>
            </p>
          </div>
          <div class="comConent" v-html="val2.content">
            
          </div>
        </div>
      </p>
      <div class="" v-show="evaluates.length != 0">
        <div class="comNum" >
          <section class="num-o">
            <img src="../../../static/bgimg/sever.png" alt="">
            <p>{{comments.sscore}}</p>
          </section>
          <section class="num-o">
            <img src="../../../static/bgimg/study.png" alt="">
            <p>{{comments.tscore}}</p>
          </section>
          <section class="num-o">
            <img src="../../../static/bgimg/syn.png" alt="">
            <p>{{comments.mscore}}</p>
          </section>
        </div>
        <section class="userCom">
          用户评价
        </section>
        <div class="userComlist" v-for="val2 in comments.evaluates">
          <div class="userTitle">
            <section class="userImg">
              <img :src="val2.uavatar" alt="">
            </section>
            <p class="username" v-html="val2.unickname"></p>
            <p class="comTime">{{val2.time}}</p>
            <p class="startNum" :value="parseInt(val2.uscore)">
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="smlstart"><img src="../../../static/bgimg/start.png" alt=""></span>
              <span class="pingfen">{{val2.uscore}}</span>
            </p>
          </div>
          <div class="comConent" v-html="val2.content">
            
          </div>
        </div>
      </div>
    </div>
  </div>
<div class="bg1"></div>
<div class="bg1"></div>
<div class="bg1"></div>
<div class="footer" v-show="box">
<span class="zf">
  ¥{{price}}
</span>
        <span class="zf1" @click="go()">
        <img src="../../assets/tjdan.jpg">
          <span>立即预约</span>
        </span>
</div>
  </div>
</template>

<script>
import Config from '../../config/config.vue'
export default {

  data () {
    return {
      box:false,
      ry:'',
     json:'',
     cid:'',
     times:'',
     src:"/static/img/cuo2.d3353aa.png",
     price:'',
     one:'',
     two:'',
     three:'',
     gid:'',
     useid:'',
     code:'',
     kaij:false,
       currentDay: 1,
   currentMonth: 1,
   currentYear: 1970,
   currentWeek: 1,
   days: [],
    utime:'',
   timenew:'',
   date:[],
    lok:'',
   weekdy:'',
   comments:[],
   evaluates:[],
   startt:'',
   endt:"",
   linshi:''
    }
  },created:function(){


          function getvalue(name)
      {
      var str=window.location.hash;
      if (str.indexOf(name)!=-1)
      {
      var pos_start=str.indexOf(name)+name.length+1;
      var pos_end=str.indexOf("&",pos_start);
      if (pos_end==-1)
      {
      return str.substring(pos_start);
      }
      else
      {
      return str.substring(pos_start,pos_end)
      }
      }
      else
      {
      return "没有这个name值";
      }
      }

      var cid=getvalue("id");
      var gid=getvalue("type");
      this.gid=gid;
      this.cid=cid;
      this.useid=sessionStorage.getItem('xid');
        this.linshi=sessionStorage.getItem('linshi');
//获取到教练基本信息
    this.$http.get(Config.api.cinfo,{params:{coachId:cid}}).then(
      function(response){
      // console.log(response.data.data)
        this.json=response.data.data
         this.price= parseInt(this.json.cprice)*0.01
         this.startt=this.json.begindate;
         this.endt=this.json.enddate
          this.initData(this.startt);
}, function(response){
    // 响应错误回调
})


// 获取用户评价
var commentInfo = Config.api.coachComment;// 用户评价接口
this.$http.get(commentInfo,{params:{coachId:cid}}).then(function (response) {
  if(response.data.code == 0){
    this.comments = this.headImg(response.data.data);
    // 数据转换
    var data = response.data.data.evaluates;

      this.evaluates = this.headImg(data);
  }
},function () {

});
    //查看是否收藏
    if(this.linshi!='111'){

      this.$http.get(Config.api.lookins,{params:{type:0,id:this.cid},

          headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                      this.code=response.data.data.status

                 // console.log(this.code)
                // alert(response.data.code)

                  },

               function(response){
                    // 响应错误回调
                })
    }
    console.log(this.code)
    //教练返回已经预约时间
    //教练返回已经预约时间

    //获取教练荣耀
   // localStorage.getItem('a')
    this.$http.get(Config.api.minfo,{params:{monomerId:gid}}).then(
      function(response){
        //console.log(response.data.data)
       this.ry=response.data.data
      // alert(response.data.data.serviceType)
  localStorage.setItem('ds',response.data.data.serviceType);

}, function(response){
    // 响应错误回调
})



var year = parseInt(new Date().getFullYear());
  var month = new Date().getMonth();

  var times = new Date(year,month,1).getTime();
  this.newd=times
      




console.log(this.code)
  },
   updated:function(){
 //console.log(this.date)
  //  console.log(new Date().getTime())
  $('.days li').eq(0).css("marginLeft",this.lok*2.64+'rem')
 for(var i=0;i<this.date.length;i++){
    if(new Date().getTime()>this.date[i]){


      //console.log(i)
      //console.log($('.days li').length)
       $('.days li').eq(i).addClass("cl")
    }
   }

   this.$http.get(Config.api.time,{params:{coachId:this.cid}}).then(
      function(response){
      // console.log(response.data.data.times)
       this.times=response.data.data.times
       //得到今天明天后天的时间
      // console.log(this.times)
       var newday=[]
       for(let i=0;i<this.times.length;i++){

  newday.push(creativeTime(this.times[i].time))
       }

              function p(s) {
        return s < 10 ? '0' + s: s;
    }
              function GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();
      return y+'-'+p(m)+'-'+p(d);
      }
      //alert(GetDateStr(0))

var arrday=[GetDateStr(1),GetDateStr(2),GetDateStr(3)]
console.log(arrday)

  function creativeTime(time) {
        if (time == '') {
            return false
        }
        let date = new Date(time);
        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        let D = date.getDate() ;
        return Y+'-'+M+'-'+D
    }
       var arr3=[]
       for(var s in arrday){
    for(var x in newday){
        if(arrday[s]===newday[x]){
            arr3.push(s);
        }
    }
  }

      for(var i=0; i<arr3.length;i++){
          $('.pi5 img').eq(arr3[i]).attr("src","./static/bgimg/cuo2.png")
      }
var timeold=response.data.data.times;
        var oldtime=[]
        var utime=[]

        for(var i=0; i<timeold.length;i++){
          oldtime.push(creativeTime(timeold[i].time))
          utime.push(timeold[i].time)
        }
        this.utime=utime
this.oldtime=oldtime
var timenew=[]
console.log(oldtime)
        console.log(utime)
function p(s) {
        return s < 10 ? '0' + s: s;
    }
function creativeTime(time) {
        if (time == '') {
            return false
        }
        let date = new Date(time);
        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        let D = date.getDate() ;
        return Y+'-'+p(M)+'-'+p(D)
    }
for (var i=0; i<this.days.length;i++){
  timenew.push(creativeTime(this.days[i].getTime()))

}
console.log(timenew)
this.timenew=timenew

       var long = oldtime.length<timenew.length? oldtime:timenew;
      var short = oldtime.length<timenew.length?timenew: oldtime;
      var str = ","+long.toString()+",";
      var result=[];
      for(var i in short){
          if(str.indexOf(","+short[i]+",")>=0){
              result.push(i);
          }
      }
      //console.log(result)
      for(var i=0; i<result.length;i++){

          $('.days span').eq(result[i]).addClass("dx")
      }

}, function(response){
    // 响应错误回调
})

    },
 mounted:function () {


  var oBox=document.getElementById('box');
      var aBtn=oBox.getElementsByTagName('li');
      var aDiv=oBox.getElementsByTagName('div');
      for(var i=0;i<aBtn.length;i++){
        // aBtn[i].index=i;
        (function(index){
          aBtn[i].onclick=function(){
          for(var i=0;i<aBtn.length;i++){
            aBtn[i].className='';
            aDiv[i].style.display='none'
          }
          this.className='on';
          aDiv[index].style.display='block';
        }
        })(i)
      }
      $('.box').height($(window).height())
    document.title="教练详情";
     $(document).scrollTop(0,0);
     var xc=$('#box ul').offset().top
    $(window).scroll(function () {
    var distance = $(window).scrollTop();
    if(distance >=xc){
       $('.zij').css('display','block')
      $('#box ul').addClass('add').removeClass('ziji');
    }else{
      $('#box ul').removeClass('add').addClass('ziji');
        $('.zij').css('display','none')
    }
  });
  },methods:{
    sho(){
      this.box=true;
    },
    kai(){
      this.kaij=true;
    },

initData: function(cur) {
function p(s) {
        return s < 10 ? '0' + s: s;
    }
   var date;
   if (cur) {
    date = new Date(cur);
   } else {
    date = new Date();
   }
   this.currentDay =parseFloat(date.getDate());
   this.currentYear = parseFloat(date.getFullYear());
   this.currentMonth =p(date.getMonth() + 1);
   this.currentWeek =date.getDay(); // 1...6,0
    this.weekdy=date.getDay()
   var year = new Date().getFullYear();
  var month = new Date().getMonth();
  var times = new Date(cur).getDay();
  //alert()
  this.lok=times


   var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
   this.days.length = 0;

   function getLastDay(year,month)
{
 var new_year = year;    //取当前的年份
 var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
 if(month>12)            //如果当前大于12月，则年份转到下一年
 {
  new_month -=12;        //月份减
  new_year++;            //年份增
 }
 var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天
 return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
}
 this.date=[]
   for (var i = 0; i <getLastDay(this.currentYear,this.currentMonth); i++) {
    var d = new Date(str);
    d.setDate(d.getDate() + i);
    this.days.push(d);
 this.date.push( new Date(d).getTime())
  }

   },

 formatDate: function(year,month,day){
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
   var y = year;
   var m = month;
   if(m<10) m = "0" + m;
   var d = day;
   if(d<10) d = "0" + d;
   return y+"/"+m+"/"+d
   },
  pickPre: function(year, month) {
    //alert(month)


//alert(1)
   // if(new Date()>new Date(date).getTime()){
   //     // $('.days li').eq(index).addClass("cl")
   //      return false;
   //     }
   //console.log(this.timenew)
   
function p(s) {
        return s < 10 ? '0' + s: s;
    }
   // if(new.Date().getMonth>)
    

  var d = new Date(this.formatDate(year , month , 1));
if(new Date().getMonth()+1>new Date(d).getMonth() && new Date(1509465600000).getFullYear()==new Date(d).getFullYear()){
    return ;
   }
   $('.days li').eq(i).addClass("cl")
    $(".days span").removeClass("dx")
   d.setDate(0);
   this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
  var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);

  var times = new Date(d.getFullYear(),d.getMonth(),1).getDay();
  this.lok=times
  $('.days li').eq(0).css("marginLeft",this.lok*2.64+'rem')
   this.days.length = 0;
     function getLastDay(year,month)
{
 var new_year = year;    //取当前的年份
 var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
 if(month>12)            //如果当前大于12月，则年份转到下一年
 {
  new_month -=12;        //月份减
  new_year++;            //年份增
 }
 var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天
 return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
}
this.date.length=0
// for (var i = this.currentWeek - 1; i >0; i--) {
//     var d = new Date(str.replace(/-/g,'/'));
//     d.setDate(d.getDate() - i);
//    // console.log("y:" + d.getDate());
//     this.days.push(d);
//    }
   //console.log()


  //console.log(times)
   for (var i = 0; i <getLastDay(this.currentYear,this.currentMonth)  ; i++) {
    var d = new Date(str);
    d.setDate(d.getDate() + i);
   // this.days=[]
    this.days.push(d);

    this.date.push( new Date(d).getTime())

    //
   }


   for(var i=0;i<this.date.length+10;i++){
    if(new Date().getTime()>this.date[i]){
       $('.days li').eq(i).addClass("cl")
    }
   }


   var timenew=[]
function creativeTime(time) {
        if (time == '') {
            return false
        }
        let date = new Date(time);
        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        let D = date.getDate() ;
        return Y+'-'+p(M)+'-'+p(D)
    }
for (var i=0; i<this.days.length;i++){
  timenew.push(creativeTime(this.days[i].getTime()))

}
var utime=[]
for (var i=0; i<this.utime.length;i++){
  utime.push(creativeTime(this.utime[i]))

}

      var arr3=[]
       for(var s in utime){
    for(var x in timenew){
        if(utime[s]===timenew[x]){
            arr3.push(x);
        }
    }
  }
       if(arr3.length>0){
      for(var i=0; i<arr3.length;i++){

          $('.days span').eq(arr3[i]).addClass("dx")


      }}else{
          $(".days span").removeClass("dx")
      }

       var long = this.two.length<timenew.length?this.two:timenew;
      var short = this.two.length<timenew.length?timenew:this.two;
      var str = ","+long.toString()+",";
      var result=[];
      for(var i in short){
          if(str.indexOf(","+short[i]+",")>=0){
              result.push(i);
          }
      }
      //console.log(result)

        $('.days li').removeClass("cg")
       if(result.length>0){
      for(var i=0; i<result.length;i++){

          $('.days li').eq(result[i]).addClass("cg")


      }}

   },
   pickNext: function(year, month) {
  //   this.newd=''
  //     var times = new Date(year,month,1).getTime();
  // this.newd=times
  // console.log(times)
  //1519833600

    function p(s) {
        return s < 10 ? '0' + s: s;
    }
     //$('.days li').removeClass("cg")
     
     // $('.arrow').css("background","#fff")
     var d = new Date(this.formatDate(year , month , 1));
     // alert(d)
     //  console.log(new Date(1519833600000).getMonth()+1)
  //console.log(new Date(d).getMonth())
     if(new Date(this.endt).getMonth()<new Date(d).getMonth()+1 && new Date(this.endt).getFullYear()==new Date(d).getFullYear()){
    return ;
   }
    $(".days span").removeClass("dx")
       $('.days li').removeClass("cl")
   d.setDate(35);
   this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
      var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
   //console.log("today:" + str + "," + this.currentWeek);
   this.days.length = 0;
   var times = new Date(d.getFullYear(),d.getMonth(),1).getDay();
  this.lok=times
  $('.days li').eq(0).css("marginLeft",this.lok*2.64+'rem')
     function getLastDay(year,month)
{
 var new_year = year;    //取当前的年份
 var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
 if(month>12)            //如果当前大于12月，则年份转到下一年
 {
  new_month -=12;        //月份减
  new_year++;            //年份增
 }
 var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天
 return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
}
  this.date=[]
   for (var i = 0; i <getLastDay(this.currentYear,this.currentMonth)  ; i++) {
    var d = new Date(str);
    d.setDate(d.getDate() + i);
    //this.days=[]
    this.days.push(d);
    this.date.push( new Date(d).getTime())
    //console.log(this.days)
   }
   //console.log( this.date)
   for(var i=0;i<this.date.length;i++){
    if(new Date().getTime()>this.date[i]){
       $('.days li').eq(i).addClass("cl")
    }
   }
   var timenew=[]
function creativeTime(time) {
        if (time == '') {
            return false
        }
        let date = new Date(time);
        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        let D = date.getDate() ;
        return Y+'-'+p(M)+'-'+p(D)
    }
for (var i=0; i<this.days.length;i++){
  timenew.push(creativeTime(this.days[i].getTime()))

}
var utime=[]
for (var i=0; i<this.utime.length;i++){
  utime.push(creativeTime(this.utime[i]))

}
 //console.log(timenew)
 //console.log(this.utime)
         var arr3=[]
       for(var s in utime){
    for(var x in timenew){
        if(utime[s]===timenew[x]){
            arr3.push(x);
        }
    }
  }
       if(arr3.length>0){
      for(var i=0; i<arr3.length;i++){

          $('.days span').eq(arr3[i]).addClass("dx")


      }}else{
          $(".days span").removeClass("dx")
      }
  var long = this.two.length<timenew.length?this.two:timenew;
      var short = this.two.length<timenew.length?timenew:this.two;
      var str = ","+long.toString()+",";
      var result=[];
      for(var i in short){
          if(str.indexOf(","+short[i]+",")>=0){
              result.push(i);
          }
      }

        $('.days li').removeClass("cg")
       if(result.length>0){
      for(var i=0; i<result.length;i++){

          $('.days li').eq(result[i]).addClass("cg")


      }}else{

      }

   },




    go(){
       var cidr=this.cid
      
      if(this.linshi=='111'){
      
         this.$router.replace("/Kcall");
      }else{
          localStorage.setItem('jlid',this.gid)
               this.$router.push('/Zfu?id='+cidr+'&bbxx='+this.gid);
                localStorage.removeItem('html');
                 sessionStorage.removeItem("key")
      }
       // this.$http.get(Config.api.callon,{params:{},headers:{'X-SESSION-ID':this.useid}}).then(function(response){
              
       //       if(response.data.code==0){//判断是否绑定手机号
       //         //跳转订单预定页面把教练id传过去
       //         localStorage.setItem('jlid',this.gid)
       //         this.$router.push('/Zfu?id='+cidr+'&bbxx='+this.gid);
       //          localStorage.removeItem('html');
       //           sessionStorage.removeItem("key")
       //       }else{
       //        alert("亲您好没绑定手机号，先去绑定一下")
       //          this.$router.push('/Call?id='+this.cid+'&type='+this.gid+'&text='+1);
       //       }
           
       //  }, function(response){
       //      // 响应错误回调
       //  })
      // var cidr=this.cid
      //  this.$http.get(Config.api.callon,{params:{},headers:{'X-SESSION-ID':this.useid}}).then(function(response){
              
      //        if(response.data.code==0){//判断是否绑定手机号
      //          //跳转订单预定页面把教练id传过去
      //          this.$router.push('/Zfu?id='+cidr+'&bb='+this.gid);
      //           localStorage.removeItem('html')
      //        }else{
      //         alert("亲您好没绑定手机号，先去绑定一下")
      //           this.$router.push('/Call?id='+this.cid+'&type='+this.gid);
      //        }
           
      //   }, function(response){
      //       // 响应错误回调
      //   })
      // var cidr=this.cid//跳转订单预定页面把教练id传过去
      // this.$router.push('/Zfu?id='+cidr);
      // localStorage.removeItem('html')
    },
    houser(){//代表为收藏
      if(this.code=='0'){
        this.$http.post(Config.api.houser,{
          type:0,id:this.cid
          },{headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                        if(response.data.code=='0'){
                      
                          this.$http.get(Config.api.lookins,{params:{type:0,id:this.cid},

          headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){ 

                      this.code=response.data.data.status
                      console.log(this.code)
                  },

               function(response){
                    // 响应错误回调
                })

                        }

                  },

               function(response){
                    // 响应错误回调
                })
      }
      if (this.code=='1') {//已收藏
        this.$http.post(Config.api.lins,{
          type:0,id:this.cid
          },{headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                        if(response.data.code=='0'){
                       
                          this.$http.get(Config.api.lookins,{params:{type:0,id:this.cid},

          headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                      this.code=response.data.data.status

                  
                // alert(response.data.code)

                  },

               function(response){
                    // 响应错误回调
                })
              }
            },
               function(response){
                    // 响应错误回调
                })
      }

    },
    com() {
      // 显示星星
      $('.userComlist .startNum').each(function (index,value) {
        var startnum = $(value).attr('value')/2;
       
       // console.log(startnum);
        $(value).find('span img').each(function (index2,value2) {
          for(let i= 0; i<startnum; i++){
            if(index2 == i){
            $(this).attr("src",'./static/bgimg/redStart.png')
            }
          }
        });
      });
    }
  }
}

</script>
<style scoped>
#box .zij{
  width: 100%;
  height: 2.3rem;

}
.cen{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 100;
}
.arrow{
    width: 2rem;
  }
 .arrow img{
    width: 0.55rem;
    height: 0.7rem;
   margin-bottom: -0.1rem;
   margin-left: 0.5rem;
   }
 .conent {
    position:absolute;
    bottom: 0;
    width: 100%;
    height: 14rem;
    background: #fff;
    z-index: 100;
  }
   #calendar{
  width:100%;
  margin: 0 auto;

  }
.conents{
height: 17rem;
height: 19.2rem;
} #calendar{
    border: none;
   }
 .calendar-title-box .s {
    font-size: 0.5rem;
    left: 3rem;
    width: 1.375rem;
    height: 1rem;
    background: #e4474d;
    color: #fff;
    left: 10rem;
    padding: 0.15rem 0.35rem
  }
 .month .lo{
  float: right;
  font-size: 0.7rem
}
.month {
width: 100%;
  }
.month ul {
      margin: 0;
    padding: 0;
    display: -ms-flexbox;
    /* display: flex; */
    height: 2.15rem;
    line-height: 2.15rem;
    overflow: hidden;
    width: 17.25rem;
    margin: 0 auto;
    border-bottom: 1px solid #ededed;

  }

.month .lo{
    line-height: 2.4rem
   }

 .month ul li {
 color: #4ab6b5;
    /* text-transform: uppercase; */
    /* letter-spacing: 3px; */
    /* float: left; */
    float: left
  }
.month ul .zou{
    margin-left: 4.6rem;
    margin-right: -0.1rem;
    margin-top:-0.03rem;

   }

    .month ul .left img{
      width: 0.425rem;
      height: 0.426rem;

    }
.weekdays {
  margin: 0;
  padding: 0.2rem 0;
  background-color: #4ab6b5;
  flex-wrap: wrap;
  color: #FFFFFF;
  display: flex;
  }

.weekdays li {
  display: inline-block;

  text-align: center;
  flex: 1;
  font-size: 0.8rem;
  }
.year-month {
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  }
 .choose-year {
  padding-left:0.5rem;
  font-size: 0.75rem;
  }

  .choose-month {
  text-align: center;
  padding-right:0.5rem;
  font-size: 0.65rem;
  }
.days {
  padding: 0; */
    background: #FFFFFF;
    margin: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    /* justify-content: space-around; */
    /* position: absolute; */
    color: #000;
    bottom: 0;

    margin: 0 auto;

  }

  .days li {
  list-style-type: none;
    /* display: inline-block; */
    width: 14.24%;

    height: 2.6rem;
    text-align: center;
    /* padding-bottom: 0.57rem; */
    /* padding-top: 0.56rem; */
    font-size: 0.7rem;


  line-height: 2.56rem;

  }

  .days li .active {
  color: #000;
  }

  .days li .other-month {
  padding: 5px;
  color: gainsboro;
  }

  .cg {
   border-radius: 50%;
  color: #fff;
  border: 1px solid #4ab6b5;
  display: block;
  color: #4ab6b5
  }



.box{
  background: #fff;
}

.add{
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;

}
#box .most{
  font-size: 0.7rem;
  height: 28rem;
}
#box .mist{
  padding-top: 2rem;
  font-size: 0.7rem;
  height: 28rem;
}
#box .op{
  font-size: 0.7rem;
  color: #666;
  margin-bottom: 0.2rem
}
 #box  .p{
  font-size: 0.6rem;
  line-height: 1.5rem;
  color: #bcbcbc;
}
.ni{
  font-size:0.75rem;
  color: #666 ;
  padding-bottom: 0.4rem;
}

.p3 {
  text-align: center;
}
.p3 img{
  width: 1rem;
    height: 0.65rem;
    margin-right: 0.4rem;
    vertical-align: middle;
    margin-top: -0.08rem;
}
.pi5{
  text-align: center;
    font-size: 0.6rem;
    margin-bottom: 1rem;

}
.pi5 span{
  padding-left: 0.3rem;

  padding-right: 0.5rem;
}
.pi5 img{
width: 0.68rem;
    height: 0.68rem;


    /* height: 1.72rem; */
    vertical-align: middle;
   margin-top: -0.1rem;
}

.pi5 .pimg3{
margin-left: 0;
}


.pi4{
  height: 3rem;
  line-height: 3rem;
  font-size: 0.65rem;
  text-align: center;
}
.pimg{
  vertical-align: middle;
    width: 0.6rem;
    height: 0.75rem;
    margin-right: 0.5rem;
    /* margin-top: 0.1rem; */
    /* margin-top: -0.2rem; */
    margin-top: -0.5vw;
}

.pimg2{
  width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.3rem;
    margin-left: 1rem;
    margin-top: -1.1vw;
    vertical-align: middle;
}
.pi{
  position: absolute;
  top: 2.2rem;
left: 50%;
margin-left: -2rem;  /*此处的负值是宽度的一半*/
}
.pi span{
  display: block;
  text-align: center;
}
.p1 .sss{
  padding-left: 1.8rem
}
.pi2{
  position: absolute;
bottom: 3.4rem;
color: #fff ;
width: 100%;
font-size:0.7rem;
text-align: center;
font-weight: 900;
}
.pi5 .tom{
  padding-left: 0.2rem;
}
.pi3{
position: absolute;
width: 100%;
text-align: center;
top: 14rem;
color: #fff;
font-size: 0.65rem;
height: 3rem;
overflow: hidden;
}
#box ul li img{
  width:0.75rem;
  height: 0.75rem ;
  margin-top: -0.2rem;

}
#box>p{
  font-size:0.75rem;

  line-height: 1.75rem;
}
#box {
  background: #fff;
  width: 100%;
 
}

#box ul{
  transition: all 0.2s;
  margin: 0 auto;
  border-bottom: 1px solid #ededed;
  display: flex;
  font-size:0.6rem ;
  color: #ddd;
  z-index: 10

}
#box ul li img{
  vertical-align: middle;
  margin-top: -0.1rem;
  width:0.75rem;
  height: 0.75rem ;
}
#box ul li{
  flex: 1;
  height: 2rem;
  text-align: center;
  line-height: 2rem;

}
 #box .dd{ width: 100%; height:11.5rem; margin:0;  }
#box>div{  display: none; width:17.25rem; margin:0 auto; overflow: hidden; margin-top:1rem;  }
.comNum{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2rem;
}
.comNum>section{
  position: relative;
  width: 3.15rem;
  height: 3.15rem;
}
.comNum>section img{
  width: 100%;
  height: 100%;
}
.comNum>section p{
  text-align: center;
  font-size: 0.7rem;
  color: #fff;
  width: 100%;
  position: absolute;
  top: 1.3rem;
  z-index: 5;
}
.userCom{
  font-size: 0.7rem;
  color: #484848;
}
 .userComlist:last-of-type{
  border-bottom: none;
  padding-bottom: 2rem;
}
.userComlist{
  padding-bottom: 1rem;
  border-bottom: 1px solid #dedede;
  margin-top: 0.6rem;
}
.userTitle{
  height: 2.15rem;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
}
.userImg{
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  float: left;
}
.userImg img{
  width: 100%;
  height: 100%;
}
.username{
  margin-top: 0.2rem;
  color: #484848;
}
.comTime{
  color: #c0c0c0;
}
.username,.comTime{
  display: inline-block;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.7rem;
  float: left;
  width: 70%;
  margin-left: 0.3rem;
      width: 7.3rem;
    height: 1.2rem;
    overflow: hidden;
}
.comConent{
  margin-left: 0.1rem;
}
.startNum{
  position: absolute;
  right: 0px;
  top: 0.6rem;
  height: 1rem;
  line-height: 1rem;
}
.startNum .smlstart{
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.2rem;
  position: relative;
  transition: all 0.5s;
  float: left;
}
.startNum .smlstart img{
  width: 100%;
  height: 100%;
}
.pingfen{
  font-size: 0.7rem;
  color: #484848;
  float: left;
  margin-left: 0.4rem;
}
#box .on{color: #4ab6b5}
li{ list-style: none; }
   .top{
    width: 100%; height:60%;
    position: relative;
   }
   .top img{ width: 100%; height:100% }
.bg{ position: absolute; width: 100%; height: 100%;opacity: 0.2; background:#000; }
.h .img{
  border-radius: 50%;
  top: 1.6rem;
  left: 7.3rem;
  width: 4rem;
  height: 4rem;
}
.name{  font-size:0.75rem;  color: #fff;  }
.ne{ font-size: 0.6rem ; font-size:0.75rem; color: #fff; }
.ming{ position: absolute; font-size:0.75rem; color: #fff;  }
.b{  font-size:0.6rem; color: #fff; width: 89%; }
.jia{
  width: 100%;
  background: #fff;
  color: #c4c4c4;
  text-align: center;

}
.jia .one{  padding-top: 0.3rem;

overflow: hidden;

padding-bottom: 0.2rem;
}
.one li{
      border: 1px solid #bcbcbc;
    /* height: 1.125rem; */
    /* line-height: 1.125rem; */
    border-radius: 1.125rem;

    font-size: 0.7rem;
    /* padding: 0.7vw 0.5rem 0.6vw 0.5rem; */
    margin: 0.53rem 0.25rem 0 0.25rem;
   display: inline-block;
    height: 1.3rem;
    line-height: 1.4rem;
    padding: 0px 0.8rem;

     }

   .jia .two{ width:75%; height:3.125rem; margin-left:4rem;}
.qk{
  width: 100%; height:7.5rem;
  background: #fff;
}

.p1 span{
 padding: 1rem;
 font-size: 0.75rem;
 color: #666;
}
.p2 span{
 padding: 1rem;
 font-size: 0.75rem;
 color: #666;
}
.s1{ width:3.25rem; line-height: 1.75rem  }
.s2{ width:5.625rem  }
.m,.m1,.m2,.m3,.m4,.m5{

  position: absolute;
}
.m{width:0.75rem;
  height: 1rem;
  left:4.4rem;
  top:22.5rem;
}
.m1{
  width:0.75rem;
  height: 0.75rem;
  left:12rem;
  top:22.5rem;
}
.m2{
  width:0.75rem;
  height: 0.75rem;
  left:4.4rem;
  top:24.2rem;
}
.m3{
  width:0.75rem;
  height: 0.75rem;
  left:8.2rem;
  top:24.26rem;
}
.m4{
  width:0.75rem;
  height: 0.75rem;
  left:11.6rem;
  top:24.3rem;
}
.m5{
  width:1rem;
  height: 0.6rem;
  left:9.2rem;
  top:26.26rem;
}
.s1,.s2{
  font-size: 0.7rem;
  padding: 0.6rem 0.6rem 0.53rem 0.6rem;
  background:#4ab6b5 ;
  color: #fff;
}
.us1{
  font-size: 0.7rem;
  padding: 0.6rem 0.6rem 0.53rem 0.6rem;
  background:#ededed ;
  color: #fff;
}
.bg1{
  width: 100%; height: 1.25rem;
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0;
  height:2.5rem;
  line-height: 2.5rem;
  background: #fff;
  z-index: 99;
  border-top: 1px solid #ededed;
    box-sizing: border-box;
}
.footer span{

}
.zf{

  font-size: 0.75rem;
  color: #fc5c62;
  font-weight: bold;
  margin-left: 1.5rem;
}
.footer .zf1{
  width: 6rem;
  height:2rem;
  float:right;
  margin-right: 0.75rem;

  font-size: 0.75rem;
  border-radius: 5px ;
  text-align: center;
  margin-top: 0.2rem;

  color: #fff;
  position: relative;

}
.zf1 img{
  width: 100%;
  height: 100%
}
.po{
  margin-top: 1rem;
}
.zf1 span{
position: absolute;
top: 0;
left: 0;
width: 100%; height: 100%;
text-align: center;
line-height: 2.2rem;
}
.cl{
  color: #bcbcbc
}
.dx{

  color: #bcbcbc;
}
</style>
