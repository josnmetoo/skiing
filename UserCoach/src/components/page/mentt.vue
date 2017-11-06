

  <template>
    <div class="h">
      <!-- 日期弹框 -->
      <div class="ceng" v-show="one" @click="one=false">
        <!-- 日历弹框 -->
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
           <li v-for="(day,index) in days" @click.stop="pick(day,index)">
             <span>{{ day.getDate() }}</span>
           </li>
         </ul>
       </div>
     </div>
   </div>
   <!-- 版型弹框 -->
   <div class="cen" v-show="ss"  @click="ss=false">
    <div class="xuo">
      <p class="tattle">雪板类型</p>
      <p class="nue">
       <span class="tme" v-for="(val,index) in time" v-bind:class="{checked:index==nowIndex}" v-on:click.stop="relationClick(index)">{{val}}</span>
     </p>
   </div>
  </div>
  <!-- 动作弹框 -->
  <div class="cen" v-show="flag"  @click="flag=false">
    <div class="xu">
      <p class="tattle">动作级别</p>
      <p class="nu">
       <span class="tme" v-for="(val,index) in timee" v-bind:class="{checked:index==nowI}" v-on:click="rela(index)">Lv{{val.grade}}{{val.name}}</span>
     </p>
   </div>
  </div>
  <p class="bg"></p>
  <p class="p2">
    <img class="img1" src="../../assets/shan2.png" alt="">
    <span class="sp1">{{shan}}</span>
  </p>
  <p class="p2" v-if="sh.skateboardtype=='0'"> 
    <img class="img1 im" src="../../assets/fenlei.png" alt="">
    <span class="sp1">单板</span>
  </p>
  <p class="p2" v-if="sh.skateboardtype=='1'"> 
    <img class="img1 im" src="../../assets/fenlei.png" alt="">
    <span class="sp1">双板</span>
  </p>
  <p class="p2"v-if="sh.skateboardtype=='2'"  @click="ss=true">
    <img class="img1 im" src="../../assets/fenlei.png" alt="">
    <span class="sp1" v-if="nowIndex==-1">请选择雪板类型</span>
    <span class="sp1">{{ping}}</span>
    <img class="rig" src="../../assets/lol.png" alt="">
  </p>
  <p class="p2" @click="pan()">
    <img class="img1 i1" src="../../assets/dongzuo.png" alt="">
    <span class="sp1" v-if="nowI==-1">请选择动作级别</span>
    <span class="sp1">{{pin}}</span>
    <img class="rig" src="../../assets/lolk.png" alt="">
  </p>
  <p class="p3 boder" @click="pind()">
    <img class="img1 i" src="../../assets/riqi2.png" alt="">
    <span class="sp paing" v-if="two.length==0">请选择日期</span>
    <span class="sp paing"  v-for="val in two">{{val}}</span>
    <img class="rig yu" src="../../assets/lolk.png" alt="">
  </p>
  <div class="footers" @click="submit()" > <img src="../../assets/tijiaokuang.png" class="tij">预约</div>
  <img class="lang" src="../../assets/lang.png" alt="">
  </div>
  </template>
  <script>
    import Config from '../../config/config.vue'
    export default {
      data () {
        return {
          sh:'',
          ping:'',
          nowIndex:-1,
          time:["单板","双板"],
          pin:'',
          nowI:-1,
          timee:[],
          arr:'',
          one:false,
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
          cime:1,
          shan:'',
          shanid:'',
          lip:'',
          bantype:'',
          suv:'',
          fffid:'',
          poid:'',
          endt:'',
          startt:'',
          uuid:''
        }
      },
      created:function(){
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
      if (getvalue("uid")=='') {
        var uuid= localStorage.getItem("memberid");
        this.uuid=uuid
      }else{
          var uuid=getvalue("uid")
          this.uuid=uuid
      }
    
      var fffid=sessionStorage.getItem('xid');
      this.fffid=fffid;
      this.$http.get(Config.api.timeno,{params:{memberid:uuid},headers:{'X-SESSION-ID':this.fffid}}).then(
        function(response){
          if(response.data.code==0){

            var timeold=response.data.data.dates;
            var oldtime=[]
            var utime=[]
            for(var i=0; i<timeold.length;i++){
              oldtime.push(creativeTime(parseInt(timeold[i])))
              utime.push(parseInt(timeold[i]))
            }

         //console.log(oldtime)
         console.log(utime)
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
        //console.log(result)
        for(var i=0; i<result.length;i++){

          $('.days span').eq(result[i]).addClass("dx")
 this.initData(this.startt);
          
        }
      }
    }, function(response){
      // 响应错误回调
    })
      this.$http.get(Config.api.userone,{params:{memberid:uuid},headers:{'X-SESSION-ID':fffid}}).then(
        function(response){
         this.suv=response.data.data
         this.lip=response.data.data.usercardid
         this.$http.get(Config.api.usecar,{params:{usercardid:this.lip},headers:{'X-SESSION-ID':fffid}}).then(
          function(response){
                        //得到雪场的id编号
                        this.sh=response.data.data
                        // console.log(response.data.data)
                        this.shan=response.data.data.sites[0].name;
                        this.shanid=response.data.data.sites[0].id;
                        this.endt=response.data.data.enddate;
                        var date=new Date(response.data.data.startdate)
                        this.startt=date.setDate(1)
                        //console.log( this.startt)
                        if(this.sh.skateboardtype=='0'){
                         this.bantype=0
                       }else if(this.sh.skateboardtype=='1'){
                        this.bantype=1
                      }
                                 //能学的级别
                                 this.$http.get(Config.api.bantype,{params:{skateboardType:this.bantype,
                                  memberType:this.sh.cardpeopletype
                                },headers:{'X-SESSION-ID':fffid}}).then(
                                function(response){
                              // console.log(this.lip.levelone)
                              if(this.sh.skateboardtype=='0'){
                               // alert(1)
                               response.data.data.length=parseInt(this.suv.levelone)+parseInt(1);
                               this.timee=response.data.data
                             }else if(this.sh.skateboardtype=='1'){
                                 // alert(2)
                                 response.data.data.length=parseInt(this.suv.leveltwo)+parseInt(1)
                                 this.timee=response.data.data
                               }
                               
                              // console.log(response.data.data)
                             }, function(response){
                    // 响应错误回调
                  })
                              }, function(response){
      // 响应错误回调
    })
       }, function(response){
        // 响应错误回调
      })

           // console.log(this.two)
           // 根据后台给的级别去选择可选的级别
           // this.timee.length=3
           var year = parseInt(new Date().getFullYear());
           var month = new Date().getMonth();
           var times = new Date(year,month,1).getTime();
           this.newd=times
          
         },
         updated:function(){

          $('.days li').eq(0).css("marginLeft",this.lok*2.64+'rem')
          for(var i=0;i<this.date.length;i++){
            if(new Date().getTime()>this.date[i]){
          //console.log(i)
          //console.log($('.days li').length)
          $('.days li').eq(i).addClass("cl")
        }
      }
    },
    mounted:function () {
      document.title="季卡详情";
    },
    methods:{
      pan(){

        //alert(this.sh.skateboardtype)
        if(this.sh.skateboardtype=='2' && this.nowIndex==-1){
          alert("请选择雪板类型")
          return;
        }
        this.flag=true;
      },
      go(){
       this.$router.push('/Jzhifu')//跳转提交页面
     },
     pind(){
       $(".days li").removeClass("cg")
       var year = parseInt(new Date().getFullYear());
  var month = new Date().getMonth();

  var times = new Date(year,month,1).getTime();
  this.newd=times
       this.initData(this.startt);

        
          $('.days li').removeClass("cg")
         var arr3=[]
         for(var s in this.two){
      for(var x in this.timenew){
          if(this.two[s]===this.timenew[x]){
              arr3.push(x);
          }
      }
    }
    //console.log(arr3)
         if(arr3.length>0){
        for(var i=0; i<arr3.length;i++){
         //alert(1)
            $('.days li').eq(arr3[i]).addClass("cg")

          
        }}
       // console.log(this.two)
  //console.log(this.timenew)
   this.$http.get(Config.api.timeno,{params:{memberid:this.uuid},headers:{'X-SESSION-ID':this.fffid}}).then(
        function(response){
        
          var timeold=response.data.data.dates;
          var oldtime=[]
          var utime=[]
          console.log(timeold)
          for(var i=0; i<timeold.length;i++){
            oldtime.push(creativeTime(parseInt(timeold[i])))
            utime.push(parseInt(timeold[i]))
          }
        
          this.utime=utime
          console.log(oldtime)
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
      this.one=true;
    },
      relationClick(index){//选择版型
        //alert(this.timee.length)
        this.$http.get(Config.api.bantype,{params:{skateboardType:index,
          memberType:0
        },headers:{'X-SESSION-ID':this.fffid}}).then(
        function(response){
          if(index==0){
            this.nowI=-1
            response.data.data.length=parseInt(this.suv.levelone)+parseInt(1);
            this.timee=response.data.data
          }else if(index==1){
            this.nowI=-1
            response.data.data.length=parseInt(this.suv.leveltwo)+parseInt(1)
            this.timee=response.data.data
          }
          
        }, function(response){
                    // 响应错误回调
                  })

        this.nowIndex=index;
        this.ping=this. time[index]
      },
      rela(index){//选择级别

        this.poid=this.timee[index].archiveId
        this.nowI=index;
        this.pin='Lv'+this.timee[index].grade+this.timee[index].name
        //console.log(this.nowI)
        
      },
      //日历
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
       this.currentMonth =p(date.getMonth() + 1) ;
       this.currentWeek =date.getDay(); // 1...6,0
       this.weekdy=date.getDay()
       var year = new Date(this.startt).getFullYear();
       var month = new Date(this.startt).getMonth();
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
      this.days.push(d);
      this.date.push( new Date(d).getTime())
    }
  },
  pick: function(date,index) {
          //alert(index)
          function p(s) {
            return s < 10 ? '0' + s: s;
          }
           
          
          if(new Date()>new Date(date).getTime()){
           
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
       // console.log(this.sh.cardtypes)
         if(this.sh.cardtypes=="平日"){
         // console.log(creativeTim(date))
          var bue=['2018/01/01','2018/02/15','2018/02/16','2018/02/19','2018/02/20','2018/02/21','2018/04/05','2018/04/06']
          for(var i=0;i<bue.length;i++){
            if(creativeTim(date)==bue[i]){
        alert("您的卡为平日卡，请选择其他的日期")
        return;
            }
          }
          if(date.getDay()==0||date.getDay()==6){
        alert("您的卡为平日卡，请选择其他的日期")
        return;
      }
         }
          
      $('.days li').eq(index).addClass("cg")
      var timeArr = [];
console.log(this.utime)
      for(var i=0;i<this.utime.length;i++){
      
      if (this.formatDate( date.getFullYear() , date.getMonth() + 1, date.getDate())==creativeTim(this.utime[i])) {
        alert('这天已预约过了')
        $('.days li').eq(index).removeClass("cg")
        return false
      }
       if ( new Date(date).getTime()>this.endt) {
    alert('对不起，已经超过您卡片的预约最晚时间')
    $('.days li').eq(index).removeClass("cg")
    return false
  }
    }
   
    timeArr.push(this.formatDate( date.getFullYear() , date.getMonth()+1, date.getDate()));
    timeArr = timeArr.join('-');
    var sc=new Date(timeArr).getTime()
          
          if(parseFloat(sc)>=new Date(new Date().toLocaleDateString()).getTime()){
             
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
         // if(this.two.length>5){
         //  this.two.length=5;
         //   $('.days li').eq(index).removeClass("cg")
         //  return false
         // }
         function unique5(array){ 
          var r = []; 
          for(var i = 0, l = array.length; i < l; i++) { 
           for(var j = i + 1; j < l; j++) 
            if (array[i] === array[j]) j = ++i; 
          r.push(array[i]); 
        } 
        return r; 
      }
    }
  },
  pickPre: function(year, month) {
 
    function p(s) {
      return s < 10 ? '0' + s: s;
    }
       
      
       var d = new Date(this.formatDate(year , month , 1));
       if(new Date(this.startt).getMonth()+1>new Date(d).getMonth() && new Date(this.startt).getFullYear()==new Date(d).getFullYear()){
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
          //console.log(result)
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
         //$('.days li').removeClass("cg")
        
         // $('.arrow').css("background","#fff")
         var d = new Date(this.formatDate(year , month , 1));
         if(new Date(this.endt).getMonth()<new Date(d).getMonth()+1 && new Date(this.endt).getFullYear()==new Date(d).getFullYear()){
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
      if(new Date(this.endt).getMonth()+1==new Date(d).getMonth()+1 && new Date(this.endt).getFullYear()==new Date(d).getFullYear()){


         for(var i=new Date(this.endt).getDate();i<timenew.length;i++){
            $('.days span').eq(i).addClass("dx")
          }
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
      submit(){
        if(this.nowI==-1){
          alert("请选择你想学的动作");
          return;
        }
        if(this.two.length+this.oldtime.length>5){
      alert("您所有已经预约超过满五天")
      return false;
    }
        if(this.two.length==0){
          alert('请选择你日期');
          return;
        }
        var uarr=[]
        if(this.two.length>0){
          for(var i=0;i<this.two.length;i++){
            uarr.push(new Date(this.two[i]).getTime())
          }
        }
        var str=uarr.join(',')
        var type
        if(this.sh.skateboardtype=='0'){
          type=0
        }else if(this.sh.skateboardtype=='1'){
          type=1
        }else{
          type=this.nowIndex
        }
            this.$http.post(Config.api.yuyue,{   usercardid:this.lip,//用户卡卷
                                             siteid:this.shanid,//雪编号
                                           dates:str,//时间 戳
                                           skateboardtype:type,//滑板编号
                                           archivesid:this.poid
                                         },{headers:{'X-SESSION-ID':this.fffid}}).then(
                                         function(response){
                                            if(response.data.code!=='0'){
                                              alert('预约失败')
                                            }
                                          if(response.data.code=='0'){
                                            alert('预约成功');
                                             this.$router.replace("/Page");
                                          }
                                        }, function(response){
      // 响应错误回调
    })
                                       }

                                     }
                                   }
                                 </script>
                                 <style scoped>
                                  .lang{
                                    position: fixed;
                                    bottom: 0;
                                    width: 100%;
                                    height:2.75rem; 
                                    left: 0;
                                  }
                                  .tattle{
                                    width: 100%;
                                    text-align: center;
                                    font-size: 0.7rem;
                                    margin-top: 0.75rem;
                                    color: #333;
                                  }
                                  .nue .checked{
                                    background: #44b6b6;
                                    color: #fff;
                                  }
                                  .nue{
                                    overflow: hidden;
                                    margin-left: 0.6rem;
                                    margin-top: 1rem;
                                  }
                                  .nue span{
                                    float: left;
                                    font-size: 0.7rem;
                                    padding:0.42rem 1.3rem 0.38rem 1.3rem;
                                    background: #ededed;
                                    border-radius:1.7rem;
                                    margin: 1.45rem;
                                    color: #ccc;
                                  }
                                  .nu .checked{
                                    background: #44b6b6;
                                    color: #fff;
                                  }
                                  .nu{
                                    overflow: hidden;
                                    margin-left: 0.6rem;
                                    margin-top: 0.2rem;
                                  }
                                  .nu span{
                                    display: block;
                                    font-size: 0.7rem;
                                    padding:0.42rem 1.3rem 0.38rem 1.3rem;
                                    background: #ededed;
                                    border-radius:1.7rem;
                                    width: 65%;
                                    margin: 0 auto;
                                    color: #ccc;
                                    margin-top:0.25rem;
                                    text-align: center;
                                  }
                                  .p3 .sp{
                                    float: left;
                                  }

                                  .p3 .paing{
                                    margin-right: 1rem;
                                  }
                                  li{
                                    list-style: none;
                                  }
                                  .ceng{
                                    width: 100%;
                                    background: rgba(0,0,0,0.5);
                                    height: 100%;
                                    position: fixed;
                                    left: 0;
                                    top: 0;
                                    z-index: 100
                                  }

                                  .h p .rig{
                                    width:0.45rem; 
                                    float: right;
                                  }
                                  .h .boder{
                                    border: none;
                                  }
                                  .bg{
                                    background: #ededed;
                                    width: 100%;
                                    height: 0.5rem;
                                  }
                                  .h{
                                    background: #fff;
                                    overflow: hidden;
                                  }
                                  .p3{
                                    width: 17.25rem;
                                    height: 3rem;
                                    border-bottom: 1px solid #ededed;
                                    position: relative;
                                    margin: 0 auto;
                                  }
                                  .p3 img{
                                    width: 1rem;
                                    height: 0.6rem;

                                    float: left;
                                  }
                                  .p3 span{
                                    font-size: 0.7rem;
                                    line-height: 3rem;
                                    color: #666;
                                  }
                                  .p3 .im{
                                   width: 0.82rem;
                                   height: 0.7rem;
                                   margin: 1.2rem 0.5rem 0 0.1rem;
                                 }
                                 .p3 .i1{
                                  width:0.75rem;
                                  height: 0.85rem; 
                                  margin: 1.15rem 0.5rem 0 0.1rem;
                                }
                                .p3 .i{
                                  width:0.85rem;
                                  height: 0.85rem; 
                                  margin: 1.04rem 0.5rem 0 0.1rem;
                                }
                                .p3 .yu{
                                  float: right;
                                  top: 1.3rem;
                                  right: 0.5rem;
                                  position: absolute;
                                }
                                .p3 .sp:nth-child(5){
                                  margin-top: -1.3rem;
                                  margin-left: 1.45rem;
                                }
                                .p3 .sp:nth-child(6){
                                  margin-top: -1.3rem;

                                }
                                .p2{
                                  width: 17.25rem;
                                  height:3rem;
                                  border-bottom: 1px solid #ededed;
                                  overflow: hidden; 
                                  margin: 0 auto;
                                }
                                .p2 img{
                                  width: 1rem;
                                  height: 0.6rem;
                                  margin: 1.2rem 0.5rem 0 0.1rem;
                                  float: left;
                                }
                                .p2 span{
                                  font-size: 0.7rem;
                                  line-height: 3.2rem;
                                  color: #666;
                                }
                                .p2 .im{
                                  width: 0.82rem;
                                  height: 0.7rem;
                                  margin: 1.2rem 0.5rem 0 0.1rem;
                                }
                                .p2 .i1{
                                  width:0.75rem;
                                  height: 0.85rem; 
                                  margin: 1.15rem 0.5rem 0 0.1rem;
                                }
                                .p2 .i{
                                  width:0.85rem;
                                  height: 0.85rem; 
                                  margin: 1.04rem 0.5rem 0 0.1rem;
                                }
                                .footers img{
                                  position: absolute;
                                  top: 0;
                                  left: 0;
                                  width: 100%;
                                  height: 100%;
                                  z-index: -10
                                }
                                .footers{
                                  width:15.5rem ;
                                  height:2.5rem; 
                                  text-align: center;
                                  line-height:2.5rem;
                                  position: fixed;
                                  top: 14.5rem;
                                  left:1.5rem; 
                                  color: #fff;
                                  font-size:0.75rem;
                                  border-radius: 5px;
                                }
                                .telu{
                                  text-align: center;
                                  color: #333;
                                  font-size: 0.7rem;
                                  padding: 0.5rem;
                                }
                                .cen{
                                  position: fixed;
                                  width: 100%; height: 100%;
                                  background: rgba(0,0,0,0.5);
                                  top: 0;
                                  left: 0;
                                  z-index: 100
                                }
                                .xuo{
                                  position: absolute;
                                  background: #fff;
                                  border-radius: 5px;
                                  width:14.875rem; 
                                  height: 14.375rem;
                                  border: 1px solid #ededed;
                                  left: 50%;/*配合margin-left的负值实现水平居中*/ margin-left: -7.4375rem;/*值的大小等于元素宽度的一半*/ top:50%;/*配合margin-top的负值实现垂直居中*/ margin-top: -8.3rem;

                                }
                                .xu{
                                  position: absolute;
                                  background: #fff;
                                  border-radius: 5px;
                                  width:14.875rem; 
                                  height: 15.5rem;
                                  border: 1px solid #ededed;
                                  left: 50%;/*配合margin-left的负值实现水平居中*/ margin-left: -7.4375rem;/*值的大小等于元素宽度的一半*/ top:50%;/*配合margin-top的负值实现垂直居中*/ margin-top: -8.3rem;

                                }
                                /*日历*/

                                .arrow img{
                                  width: 0.55rem;
                                  height: 0.7rem;
                                  margin-bottom: -0.1rem;
                                   margin-left: 0.5rem;
                                }
                                .arrow{
    width: 2rem;

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
                                  font-size: 0.8rem;
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

                                .days li:nth-child(1){
                                  margin-left: 10rem
                                }
                                .cl{
                                  color: #bcbcbc
                                }
                                .dx{

                                  color: #bcbcbc;
                                }
                                * {
                                  box-sizing: border-box;
                                }

                              </style>
