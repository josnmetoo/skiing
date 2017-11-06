  <template>
    <div class="hello">
      <!--雪场弹框-->
      <div class="ceng" v-show="tk" @click="inint"></div>
      <div class="conent" v-show="tk">
        <p class="come">请选择您想去的雪场</p>
        <ul class="sonws">
          <li v-for="(val,index) in ju" @click="iscur=index;change($event,val.sid,val.endtime,val.starttime)" :class="{bba:iscur==index}">{{val.sname}}</li>

        </ul>
      </div>
      <!--备注弹框-->
      <div class="ceng" v-show="t" @click="inin"></div>
      <div class="conent" v-show="t">
        <p class="come bdr">
          <span class="sd">请填写备注</span>
          <span class="sd2" @click="tex"> 确定</span>
        </p>

        <textarea class="txt" name="textarea" placeholder="有什么想法就说出来吧..." ref="textarea" v-model="bzhu"></textarea>
      </div>
      <!--日期弹框-->
      <div class="ceng" v-show="ss" @click="ini"></div>
      <div class="conent conents" v-show="ss">
   <div id="calendar">
    <div class="month">
    <ul>

     <li class="arrow zou" @click.stop="pickPre(currentYear,currentMonth)"><img src="../../assets/zuo.png"></li>
     <li class="year-month" @click.stop="bg()">
     <span class="choose-year"><b>{{ currentYear }}</b></span>
     <span class="choose-month">{{ currentMonth }}月</span>
     </li>
     <li class="arrow" @click.stop="pickNext(currentYear,currentMonth)"><img src="../../assets/you.png"></li>

     <li class="lo" @click="ss=false">确定</li>
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

     <li   v-for="(day,index) in days" @click="pick(day,index)">
    
     <span   >{{ day.getDate() }}</span>

    
    </li>
    </ul>
   </div>
      </div>

      <div class="bg"></div>
      <ul class="w">
        <li >
          <span class="sp1">教学项目</span>
        
          <span class="sp2 mmm"></span>
        </li>
        <li @click="tkt" class="liu">
          <span class="sp1">教学场地</span>
          <img class="img" src="../../assets/jiantou.png">
          <span class="sp2 cd"> <span class="rt"></span></span>
        </li>
        <li @click="zz()" class="lui">
          <span class="sp1">教学时间</span>
          <img class="img" src="../../assets/jiantou.png">
          <span class="sp2 dde" v-for="val in two">{{val}}</span>
        </li>
      </ul>
      <div class="bg"></div>
      <ul class="w">
        <li class="yuyue" @click="info()">
          <span class="sp1">预约人</span>
          <img class="img" src="../../assets/jiantou.png">

          <span class="sp2" v-html="uarr.nickname"></span>
          <span class="sp2">{{uarr.phone}}</span>
        </li>
      </ul>
      <section class="sec">
        <span>意外险:滑雪是高危运动，请您投保。</span>
        <span class="red">免费</span>
        <p class="switch" @touchend.stop.prevent="kai()" :kai="flag"><span></span></p>
      </section>
      <ul class="touba">
        <li>
          <span>投保人</span>
           <input type="text" class="in1"  placeholder="投保人姓名":value="uarr.name" ></input>
          <input class="in" type="text" placeholder="证件号码":value="uarr.identification"></input>
        </li>
        </li>
        </ul>
      <p class="vao">本保险费有郝世花学校承担，无需消费者额外支出。选择即为默认同意
        《<span>保险须知</span>》与《<span>保险条款</span>》。</p>
      <div class="bg"></div>
      <ul class="w">
        <li class="li kuo" @click="tka" >
          <span class="sp1">备注:</span>
          <span class="ss"></span>
          <img class="img" src="../../assets/jiantou.png">
        </li>
      </ul>
      <div class="bg"></div>
      <div class="footer">
        <span class="zi">待支付：</span>
        
  <span v-if="two.length==0" class="zf">¥{{pric}}
  </span>
  <span v-else class="zf">¥{{pric*two.length}}
  </span>

        <span class="zf1" @click="submet()">
          提交订单
          </span>
      </div>
  <div class="bg"></div>
  <div class="bg"></div>
  <div class="bg"></div>
    </div>

  </template>

  <script>
    import Config from '../../config/config.vue';


    export default {
     // name: 'hello',
      data() {
        return {
         x:'',
          iscur: -1,
          "tk": false,
          "flag": false,
          "t": false,
          "ss": false,
          ot: '',
          ju: '',
          sid:'',
          currentDay: 1,
     currentMonth: 1,
     currentYear: 1970,
     currentWeek: 1,
     days: [],
     tw:[],
     two:[],
     bid:'',
     uarr:'',
     bzhu:'',
     auto:'',
     name:'',
     numb:'',
     hhd:'',
     dd:[],
     price:'',
     oldtime:'',
     cuo:false,
     utime:'',
     timenew:'',
     date:[],
     uids:'',
     pric:'',
     newd:'',
     lok:'',
     weekdy:'',
     bbui:'',
     fid:'',
     kt:'',
     jt:'',
     uok:''
        }
      },

    created: function () {
      console.log(sessionStorage.getItem("key"))
        if(sessionStorage.getItem("key")==null){
           this.iscur=-1;
        }else{
          this.iscur=sessionStorage.getItem("key")
        }
        console.log(sessionStorage.getItem("site"))
        if(sessionStorage.getItem("site")==null){

        }else{
          
          this.kt=parseInt(sessionStorage.getItem("site1"))
          
          this.jt=parseInt(sessionStorage.getItem("site"))
          
        }
        if(sessionStorage.getItem("sit")==null){

        }else{
          
          this.uok=parseInt(sessionStorage.getItem("sit"))
          
        }
       // console.log(this.two)
         function getvalue(name) {
          var str = window.location.hash;
          if (str.indexOf(name) != -1) {
            var pos_start = str.indexOf(name) + name.length + 1;
            var pos_end = str.indexOf("&", pos_start);
            if (pos_end == -1) {
              return str.substring(pos_start);
            }
            else {
              return str.substring(pos_start, pos_end)
            }
          }
          else {
            return "";
          }
        }


        var gig = getvalue("id");
            this.hhd=gig
         var uids = getvalue("type");
         this.bbui=getvalue("bbxx")
      //alert(this.bbui)
          var cid= sessionStorage.getItem('xid');
           this.fid= localStorage.setItem('bu',this.bbui);
        
  //         this.$http.get(Config.api.time,{params:{coachId:gig}}).then(
  //       function(response){
        
  //         var timeold=response.data.data.times;
  //         var oldtime=[]
  //         var utime=[]
  //         for(var i=0; i<timeold.length;i++){
  //           oldtime.push(creativeTime(timeold[i].time))
  //           utime.push(timeold[i].time)
  //         }
        
  //         this.utime=utime
  // this.oldtime=oldtime
  // var timenew=[]
  // function p(s) {
  //         return s < 10 ? '0' + s: s;
  //     }
  // function creativeTime(time) {
  //         if (time == '') {
  //             return false
  //         }
  //         let date = new Date(time);
  //         let Y = date.getFullYear();
  //         let M = date.getMonth()+1;
  //         let D = date.getDate() ;
  //         return Y+'-'+p(M)+'-'+p(D) 
  //     }
  // for (var i=0; i<this.days.length;i++){
  //   timenew.push(creativeTime(this.days[i].getTime()))

  // }
  // this.timenew=timenew
   
       
  //        var long = oldtime.length<timenew.length? oldtime:timenew;
  //       var short = oldtime.length<timenew.length?timenew: oldtime;
  //       var str = ","+long.toString()+",";
  //       var result=[];
  //       for(var i in short){
  //           if(str.indexOf(","+short[i]+",")>=0){
  //               result.push(i);
  //           }
  //       }
  //       for(var i=0; i<result.length;i++){
         
  //           $('.days span').eq(result[i]).addClass("dx")

          
  //       }
       
  // }, function(response){
  //     // 响应错误回调
  // })    
          this.uids=uids
          if(uids!==''){
           this.$http.get(Config.api.userone,{params:{'X-SESSION-ID':cid,memberid:uids},headers:{'X-SESSION-ID':cid}}).then(
        function(response){
        this.uarr=this.headImg(response.data.data);
  }, function(response){
      // 响应错误回调
  })
         }
        this.bid=gig
  //获取价格
   if (this.bbui=='') {
    this.$http.get(Config.api.one, {params: {aloneId: gig}}).then(
          function (response) {
            this.ot = response.data.data
              this.pric= parseInt(this.ot.cprice)*0.01
          }, function (response) {
            // 响应错误回调
          });
   }else{
    this.$http.get(Config.api.cinfo, {params: {coachId: gig}}).then(
          function (response) {
            this.ot = response.data.data
              this.pric= parseInt(this.ot.cprice)*0.01
          }, function (response) {
            // 响应错误回调
          });
   }
        
       
                  //获取可选择雪区
                  if (this.bbui=='') {
                      this.$http.get(Config.api.onesnow, {params: {aloneId: gig}}).then(
                    function (response) {
                    // console.log(response.data)
                    //alert(1)
                      this.ju = response.data.data
                    }, function (response) {
                      // 响应错误回调
                    })
                  }else{
                    this.$http.get(Config.api.sonw, {params: {coachId: gig}}).then(
                    function (response) {
                    // console.log(response.data)
                      this.ju = response.data.data
                    }, function (response) {
                      // 响应错误回调
                    })
                  }
                  
                  var year = parseInt(new Date().getFullYear());
    var month = new Date().getMonth();

    var times = new Date(year,month,1).getTime();
    this.newd=times
           this.initData(this.kt);
      },

      mounted: function () {

         var op=JSON.parse(localStorage.getItem("html"))
        // console.log(op)
         if(!op==''){
           $('.liu').html(op.we)
           $('.ss').html(op.wz)
            this.sid=op.sidn
            //alert(this.sid)
         this.two=op.wt
       
        }
         //console.log(op)
       var ds=localStorage.getItem('ds')
      // alert(ds)
       if(ds==0){
        $('.mmm').html('单板教练')
       }else{
         $('.mmm').html('双板')
       }

        document.title = "提交订单";

      },
      updated:function(){
    
    $('.days li').eq(0).css("marginLeft",this.lok*2.64+'rem')
   for(var i=0;i<this.date.length;i++){
      if(this.uok>this.date[i]||new Date().getTime()>this.date[i]){
       
         $('.days li').eq(i).addClass("cl")
      }
     }
      if(this.bbui==''){
           this.$http.get(Config.api.onetiem,{params:{aloneId:this.hhd}}).then(
        function(response){
        
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
        for(var i=0; i<result.length;i++){
         
            $('.days span').eq(result[i]).addClass("dx")

          
        }
       
  }, function(response){
      // 响应错误回调
  }) 
      }else{
         this.$http.get(Config.api.time,{params:{coachId:this.hhd}}).then(
        function(response){
        
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
        for(var i=0; i<result.length;i++){
         
            $('.days span').eq(result[i]).addClass("dx")

          
        }
       
  }, function(response){
      // 响应错误回调
  }) 
      }
         
      },
      methods: {
    
       info(){
     sessionStorage.setItem("key", this.iscur)
          var bid=this.bid
         // var u=$('.iil').html()
         var wz=$('.ss').html()
          var we =$('.liu').html()
         var wt =this.two
         var obj={}
         obj.we=we;
         obj.wt=wt;
         obj.wz=wz
         obj.sidn=this.sid;
        var ob=JSON.stringify(obj)
         localStorage.setItem('html',ob)
             this.$router.push('/Toggle?id='+bid+'&bbxx='+this.bbui);     
      },
        //提交订单
          submet(){
           // alert(this.uids)
           // alert('雪季尚未开始，线上预定敬请期待！')
           // return false;


            if( this.uids=="kk"){
          alert('请完添加个人信息');
          
         }else{

           localStorage.removeItem('html')
             var a=$('.rt').html();//雪场
             var b=$('.dde').html();
                if(a==''|| b==''){
                  alert('请完善你的信息')
                }else{
                  var fid=localStorage.getItem('fid');
             var type=localStorage.getItem('type');
             var arrt=[];
             var obj={};
             obj.phone= this.uarr.cphone
             obj.pname=this.uarr.uname;
             obj.pidcard=this.uarr.cnum;
             obj.pidname=this.uarr.cname;
          
             arrt.push(this.uids)
             //console.log(arrt)
             var uarr=[]
             if(this.two.length>0){
              for(var i=0;i<this.two.length;i++){
                uarr.push(new Date(this.two[i]).getTime())
              }
             }
            var si=sessionStorage.getItem('xid');
           // console.log(uarr)
            this.fid= localStorage.getItem('jlid');
            console.log(this.fid)
             var text=$('.ss').html()
             if(this.bbui==''){

                 this.$http.post(Config.api.oneold,{aloneId:this.hhd,
                                              siteId:this.sid,
                                              monomerId:this.fid,
                                              serviceType:type,
                                              text:text,
                                              recerve:arrt,
                                              times:uarr
            },{headers:{'X-SESSION-ID':si},emulateJSON:false}).then(
                        function(response){
                   // console.log(response)
                   // alert(response.data.code)
                    if(response.data.code==2011){
                            alert("请选择你的预约时间")
                          }
                     if(response.data.code==2023){
                            alert("未支付订单已达到上线")
                          }
                     if(response.data.code==2007){
                            alert("手机号已预约过该场次")
                          }
                          if(response.data.code==2018)
                          {
                            alert("所选场地已截止报名")
                          }
                           if(response.data.code==2012)
                          {
                            alert("手机号错误")
                          }
                    if (response.data.code==0) {
                       this.hdk=response.data.data;
                    //console.log()
                    this.$router.push('/Qian?id='+this.hdk.oid+'&type='+this.hdk.type);
                    }
                    if (response.data.code==2007) {
                      alert('该手机号已经预约该场地');
                    }
                  }, function(response){
                      // 响应错误回调
                  })
             }else{
                 this.$http.post(Config.api.submet,{coachId:this.hhd,
                                              siteId:this.sid,
                                              monomerId:this.fid,
                                              serviceType:type,
                                              text:text,
                                              recerve:arrt,
                                              times:uarr
            },{headers:{'X-SESSION-ID':si},emulateJSON:false}).then(
                        function(response){
                   // console.log(response)
                   // alert(response.data.code)
                    if(response.data.code==2011){
                            alert("请选择你的预约时间")
                          }
                     if(response.data.code==2023){
                            alert("未支付订单已达到上线")
                          }
                     if(response.data.code==2007){
                            alert("手机号已预约过该场次")
                          }
                          if(response.data.code==2018)
                          {
                            alert("所选场地已截止报名")
                          }
                           if(response.data.code==2012)
                          {
                            alert("手机号错误")
                          }
                    if (response.data.code==0) {
                       this.hdk=response.data.data;
                    //console.log()
                    this.$router.push('/Qian?id='+this.hdk.oid+'&type='+this.hdk.type);
                    }
                    if (response.data.code==2007) {
                      alert('该手机号已经预约该场地');
                    }
                  }, function(response){
                      // 响应错误回调
                  })
             }
         
           
                }
         }
           
            
          },
          
           lkl1(){
       $('.arrow').css("background","#fff")
     },
        lkl(){
            $('.arrow').css("background","#fff")
        },
  bg(){
    $('.year-month').css("background","#fff")
  },


        tex() {
          $('.ss').html($('.txt').val())
          this.t = false
        },
        tka() {
          this.t = true
        },
        ijk(){
           this.ss = false
        },
        inin() {
          this.t = false
        },
        change(ev,sid,jt,kt) {
         
          sessionStorage.removeItem("key")
           sessionStorage.setItem("sit",kt)
          this.uok=kt
            this.sid=sid;
          var thisObj = ev.currentTarget;
          $('.rt').html(thisObj.innerHTML)
          this.tk=false
          var date=new Date(kt);
          this.jt=jt;
          console.log(jt)
          this.kt=date.setDate(1);
           sessionStorage.setItem("site1",this.kt)
          sessionStorage.setItem("site",jt)
           this.initData(this.kt);
           this.two=[];
              $(".days span").removeClass("dx");
              $('.days li').removeClass("cg");
              $('.days li').removeClass("cl");
        },
        tkt() {
          this.tk = true
        },
        inint() {
          this.tk = false
        },
        ini() {
          this.ss = false
        },
        zz() {
          if(this.iscur==-1){
            alert('请先选择你想去的雪场')
          return false;
          }
          
          this.initData(this.kt);
        
         
  console.log(this.timenew)
  if(this.bbui==''){

     this.$http.get(Config.api.onetiem,{params:{aloneId:this.hhd}}).then(
        function(response){
        
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
        for(var i=0; i<result.length;i++){
         
            $('.days span').eq(result[i]).addClass("dx")

          
        }
        $('.days li').removeClass("cg")
         var arr3=[]
         for(var s in this.two){
      for(var x in this.timenew){
          if(this.two[s]===this.timenew[x]){
              arr3.push(x);
          }
      }
    }
    console.log(this.timenew)
         if(arr3.length>0){
        for(var i=0; i<arr3.length;i++){
         //alert(1)
            $('.days li').eq(arr3[i]).addClass("cg")

         
        }}
        console.log(this.two)
  }, function(response){
      // 响应错误回调
  }) 
  }else{
     this.$http.get(Config.api.time,{params:{coachId:this.hhd}}).then(
        function(response){
        
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
        for(var i=0; i<result.length;i++){
         
            $('.days span').eq(result[i]).addClass("dx")

          
        }
        $('.days li').removeClass("cg")
         var arr3=[]
         for(var s in this.two){
      for(var x in this.timenew){
          if(this.two[s]===this.timenew[x]){
              arr3.push(x);
          }
      }
    }
    console.log(this.timenew)
         if(arr3.length>0){
        for(var i=0; i<arr3.length;i++){
         //alert(1)
            $('.days li').eq(arr3[i]).addClass("cg")

         
        }}
        console.log(this.two)
  }, function(response){
      // 响应错误回调
  }) 
  }


     
     
          this.ss = true
        },
        kai() {
          if (this.flag == false) {
            $('.switch span').css({"transform": "translateX(0.95rem)", "transition": " 0.5s"});
            $('.switch').css({"backgroundColor": "rgba(123,210,186,0.5)"});
            this.flag = true;
            $('.con ul li').addClass('checked');
            $('.touba').css({"display": "none"})
          } else if (this.flag == true) {
            $('.switch span').css({"transform": "translateX(0rem)", "transition": " 0.5s"});
            this.flag = false;
            $('.switch').css({"backgroundColor": "#ededed"});
            $('.con ul li').removeClass('checked');
            $('.touba').css({"display": "block"})
          }
        },
          initData: function(cur) {
           function p(s) {
          return s < 10 ? '0' + s: s;
      }
     var date;
     console.log(cur)
     if (cur) {
      date = new Date(cur);
     } else {
      date = new Date();
     }
     this.currentDay =parseFloat(date.getDate());
     this.currentYear = parseFloat(date.getFullYear());
     this.currentMonth =p(date.getMonth() + 1) ;
     this.currentWeek =date.getDay(); // 1...6,0
      this.weekdy=date.getDay()
     var year = new Date(cur).getFullYear();
    var month = new Date(cur).getMonth();
    var times = new Date(year,month,1).getDay();
    this.lok=times
   

     var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
    // console.log("today:" + str + "," + this.currentWeek);
   // alert(str)
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
      console.log(str)
      this.days.push(d);
   this.date.push( new Date(d).getTime())
    }
   

     },
      pick: function(date,index) {
        //alert(index)
        function p(s) {
          return s < 10 ? '0' + s: s;
      }
         //alert(index)
        // alert(new Date(date).getTime())
         if(this.uok>new Date(date).getTime()||new Date().getTime()>new Date(date).getTime()){
         // $('.days li').eq(index).addClass("cl");

          return false;
         }
        function creativeTim(time) {
          function add0(m){return m<10?'0'+m:m }
          if (time == '') {
              return false
          }
          let date = new Date(time);
          let Y = date.getFullYear();
          let M = date.getMonth()+1;
          let D = date.getDate() ;
          return Y+'/'+p(M)+'/'+p(D)
      }
    
       $('.days li').eq(index).addClass("cg")
      var timeArr = [];
    

  for(var i=0;i<this.utime.length;i++){
    if (this.formatDate( date.getFullYear() , date.getMonth() + 1, date.getDate())==creativeTim(this.utime[i])) {
      alert('这有人预约过了')
      $('.days li').eq(index).removeClass("cg")
      return false
    }
    console.log(date.getFullYear() , date.getMonth() + 1, date.getDate())
     if ( new Date(date).getTime()>this.jt) {
      alert('对不起，已经超过雪场开放时间')
      $('.days li').eq(index).removeClass("cg")
      return false
    }
     if ( new Date(date).getTime()<this.kt) {
      alert('对不起，请选择'+format(this.kt)+'之后的日期')
      $('.days li').eq(index).removeClass("cg")
      return false
    }
  }
      timeArr.push(this.formatDate( date.getFullYear() , date.getMonth()+1, date.getDate()));
      timeArr = timeArr.join('-');

   var sc=new Date(timeArr).getTime()
     
        //alert(new Date().getTime())
        if(parseFloat(sc)>=new Date(new Date().toLocaleDateString()).getTime()){
        
           //console.log(unique5(this.dd))
           function add0(m){return m<10?'0'+m:m }
  function format(shijianchuo)
  {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+p(m)+'-'+p(d);
  }   
     if($.inArray(format(sc), this.two)==-1){
        this.dd.push()
        this.two.push(format(sc))
        if(this.two.length>5){
           $('.days li').eq(index).removeClass("cg")
          this.two.length=5
        }   
      }else{
      var con = confirm("是否取消当前预约日期");
        if(con == true)
          {
              $('.days li').eq(index).removeClass("cg")
           this.dd.splice($.inArray(format(sc), this.dd),1)

         
          this.two.splice($.inArray(format(sc), this.two),1)
         // alert(this.two.length)
            
          }
       
      }
      this.price=this.two.length*this.pric
       
       function unique5(array){ 
  var r = []; 
  for(var i = 0, l = array.length; i < l; i++) { 
   for(var j = i + 1; j < l; j++) 
    if (array[i] === array[j]) j = ++i; 
   r.push(array[i]); 
   } 
   return r; 
  }
        }else{ 
        }  
     },
     pickPre: function(year, month) { 
    
  function p(s) {
          return s < 10 ? '0' + s: s;
      }
     
        var d = new Date(this.formatDate(year , month , 1));
  if(new Date(this.kt).getMonth()+1>new Date(d).getMonth() && new Date(this.kt).getFullYear()==new Date(d).getFullYear()){
      return false;
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
          $('.days li').removeClass("cg")
         if(result.length>0){
        for(var i=0; i<result.length;i++){
              $('.days li').eq(result[i]).addClass("cg")

          
        }}

    
     },
     pickNext: function(year, month) {
    
      function p(s) {
          return s < 10 ? '0' + s: s;
      }
     
       var d = new Date(this.formatDate(year , month , 1));
       if(new Date(this.jt).getMonth()<new Date(d).getMonth()+1 && new Date(this.jt).getFullYear()==new Date(d).getFullYear()){
      return false;
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
     pickYear: function(year, month) {
    
     },
      
     // 返回 类似 2016-01-02 格式的字符串
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

      }

    }
  </script>

  <style scoped>
  .days li:nth-child(1){
    margin-left: 10rem
  }
  .cl{
    color: #bcbcbc
  }
  .dx{
   
    color: #bcbcbc;
  }
   .month .lo{
    float: right;
    font-size: 0.7rem
  }
   * {
    box-sizing: border-box;
    }
     
    ul {
    list-style-type: none;
    }
     
    body {
    font-family: Verdana, sans-serif;
    background: #E8F0F3;
    }
    #calendar{
    width:100%;
    margin: 0 auto;
   
    }
    .month {
    width: 100%;
    }
    .arrow{
      width: 2rem;
    }
     .arrow img{
      width: 0.55rem;
      height: 0.7rem;
      margin-bottom: -0.08rem;
      margin-left: 0.5rem;
     }
    .month ul {
      margin: 0;
      padding: 0;
      display: -ms-flexbox;
     
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
    .year-month {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    }
     
   /* .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
    }*/

    .choose-year {
    padding-left:0.5rem;
    font-size: 0.8rem;
    }
     
    .choose-month {
    text-align: center;
    padding-right:0.5rem;
    font-size: 0.65rem;
    }
     
   
    /*.arrow:hover {
    background: rgba(100, 2, 12, 0.1);
    }*/
     
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
     #calendar{
      border: none;
     }
    .days {
    padding: 0; 
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

   .sonws .bba {
      background: #4ab6b5;
      border: none;
      color: #fff
    }

    .ss {
      margin-left: 3rem;
      font-size: 0.7rem;
    }

    .txt {
      width: 16.7rem;
      height: 8.875rem;
      background: #ededed;
      margin-left: 0.75rem;
      padding-left: 0.6rem;
      border: none;
      padding-top: 0.6rem;
      position: absolute;
      /* margin-left: 50%; */
      left: 50%;
      top: 50%;
      margin-left: -8.3rem;
      margin-top: -4rem;
    }

    .conent .bdr {
      border: none;
    }

    .sd {
      float: left;
    }

    .sd2 {
      float: right;
      margin-right: 0.5rem;
    }

    .on1 {
      background: #69c4ab;
    }

    .bgr {
      background: #69c4ab;

    }

    .sonws .list {
      margin-right: 0;
    }

    .come {
      width: 17.375rem;
      height: 2.375rem;
      margin: 0 auto;
      border-bottom: 1px solid #ededed;
      line-height: 2.5rem;
      font-size: 0.75rem;
      color: #4ab6b5
    }

    .sonws {
      width: 17.375rem;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 1rem;
      font-size: 0.75rem;
          text-align: center
    }

    .sonws li {
     display: inline-block;
      width: 3.75rem;
      height: 1.75rem;
      line-height: 1.75rem;
      text-align: center;
      margin-right: 0.7rem;
         border: 1px solid #bcbcbc;
             margin-bottom: 0.5rem
    }

    .conent {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 14rem;
      background: #fff;
      z-index: 1;
    }

    .ceng {
      background: #000;
      position: fixed;
      top: 0;
      width: 100%;
      height: 21.875rem;
      opacity: 0.3;
      z-index: 1;
    }

    .red {
         padding: 0.1rem 0.15rem 0.07rem 0.15rem;
      background: #e4474d;
      font-size: 0.5rem;
      color: #fff;
    }

   .in1{
    margin-left:0.1rem ;border-radius: 0px; }
  .in{ margin-left: 2.34rem; border-radius: 0px; }

    .w1 {
      height: 7.5rem;
    }

    .w .li {
      border-bottom: none;
    }

    .footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      height: 2.5rem;
      line-height: 2.5rem;
      background: #fff;
    }

    .footer .zi {
      margin-left: 2rem;
      font-size: 0.75rem;
      color: #666;
    }

    .footer .yuan {

      font-size: 0.65rem;
      color: #666;
      text-decoration: line-through;
      margin-left: 0.2rem
    }

    .footer span {
      float: left;
    }

    .zf {

      font-size: 0.75rem;
      color: #fc5c62;
      font-weight: bold;

    }

    .footer .zf1 {
      width: 6rem;
      height: 2rem;
      float: right;
      margin-right: 0.75rem;
      background: #fc5c62;
      font-size: 0.75rem;
      border-radius: 5px;
      text-align: center;
      margin-top: 0.2rem;
      line-height: 2.18rem;
      color: #fff;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #000;
      opacity: 0.1;

    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #000;
      opacity: 0.1;
    }

    input:-ms-input-placeholder {
      color: #000;
      opacity: 0.1;
    }

    input::-webkit-input-placeholder {
      color: #000;
      opacity: 0.1;
    }

    .touba {
      font-size: 0.7rem;
      width: 100%;
      background: #fff;
    }

    .touba li {
      width: 17.25rem;
      height: 3.8rem;
      margin: 0 auto;
    }

    .touba span {
      line-height: 1.875rem;
      color: #666
    }

    .touba input {
      height: 1.1rem;
      width: 14.1rem;
      border-bottom: 1px solid #ededed;
      font-size: 0.7rem;
    }

    input {

      outline: none;

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

    .sec {
      height: 2.5rem;
      background-color: #fff;
      margin-top: 0.5rem;
      line-height: 2.5rem;
      padding-left: 0.6rem;
      font-size: 0.6rem;
    }

    .switch {
      float: right;
      width: 1.8rem;
      height: 0.9rem;
      border-radius: 10px;
      background-color: #ededed;
    
      margin-top: 0.8rem;
      margin-right: 0.6rem;
      position: relative;
    }

    .switch span {
      position: absolute;
      left: 0px;
      top: 0px;
      border-radius: 50%;
      height: 0.85rem;
      width: 0.85rem;
      background-color: #4ab6b5;
      border: 1px solid #4ab6b5;
      top: 0.025rem
    }

    * {
      list-style: none;
      overflow: hidden;
    }

    .hello {
      width: 100%;
      height: 100%;
    }

    .bg {
      width: 100%;
      height: 0.75rem;
    }

    .w {
      width: 100%;
      background: #fff;
    }

    .w li {
      width: 17.25rem;
      margin: 0 auto;
      border-bottom: 1px solid #ededed

    }
    .w li .dde{
         height: 1.8rem;

      float: none;
      display: block;
      text-align: right;
    
          width: 4rem;
      float: right;
    }

    .w li span {
      line-height: 2.5rem;
    }

    .sp1 {
      float: left;
      font-size: 0.75rem;
      color: #000;
    }

    .sp2, .img {
      float: right;
      font-size: 0.65rem;
      color: #666;
    }

    .sp2 {
      margin-right: 0.6rem;
      line-height: 0.65rem
    }

    .img {
      width: 0.4rem;
      height: 0.6rem;
      margin-top: 0.95rem;
    }

    .img2 {
      width: 0.9rem;
      height: 0.9rem;
      margin-top: 0.85rem
    }

    .yuyue {
      border-bottom: 1px solid #ededed
    }

    .vao {
           padding-left: 2.34rem;
      font-size: 0.55rem;
      color: #666;
      background: #fff;
      /* height: 2rem; */
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-right: 0.5rem;
    }

    .vao span {
      color: #4ab6b5;
    }
  .left {
      position: relative;
      z-index: 2;
      float: left;
      max-width: 70%;
      font-size: 0.7rem;
      /* width: 50%; */
      margin-left: 0.7rem;
      background: #fff;
      /* border-radius: 5px; */
      line-height: 1rem;
      font-size: 0.7rem;
      /* padding: 0.4rem; */
      margin-bottom: 0.5rem;
      color: #fff;
      margin-top: 0.35rem;
  }
    .foo {
      width: 100%;
      background: #fff;
      height: 2.2rem;
    }
  .conents{
  height: 17rem;
  height: 19.2rem;
  }
  .w .kuo{
    height: 2.5rem;
    overflow: hidden;
  }
  </style>

