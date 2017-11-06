  <template>
    <div class="hello">
   <!--备注弹框-->
    <div class="ceng" v-show="t" @click="inin"></div>
   <div class="conent" v-show="t">
     <p class="come bdr">
     <span class="sd">请填写备注</span>
    <span class="sd2" @click="tex"> 确定</span>
      </p>

      <textarea class="txt"  v-model="bzhu" name="textarea" placeholder="有什么想法就说出来吧..." ref="textarea"></textarea>
   </div>

    <div class="bg"></div>
    <ul class="w">
      <li>
        <span class="sp1">教学项目</span>

        <span class="sp2">{{arr.gname}}</span>
      </li>
      <li @click="tkt">
        <span class="sp1">教学场地</span>

        <span class="sp2 cd">{{arr.rname}} {{bod.sname}}</span>
      </li>
      <li @click="zz">
        <span class="sp1">教学时间</span>

         <span class="sp2">{{bod.stime | formatDate}}-{{bod.etime | formatDate}}期</span>
      </li>
    </ul>
    <div class="bg"></div>
    <ul class="w">
      <li class="yuyue" @click="infof()">
        <span class="sp1">预约人</span>
        <img class="img" src="../../assets/jiantou.png">


         <span class="sp2">{{uarr.phone}}</span>

         <span class="sp2" v-html="uarr.nickname"> </span>
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
          <input type="text" class="in1" placeholder="投保人姓名"  :value="uarr.name"></input>
          <input class="in" type="text" placeholder="证件号码" :value="uarr.identification"></input>
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
      <div class="bg" ></div>
      <div class="footer">
      <span class="zi">待支付：</span>
  <span class="zf">
    ¥{{arr.gprice*0.01}}
  </span>

         <span class="zf1" @click="submet()">
          提交订单
          </span>
  </div>

    </div>

  </template>

  <script>
  import {formatDate} from '../../libs/data.js';
  import Config from '../../config/config.vue'
  export default {
    name: 'hello',
    data () {
      return {
        "tk":false,
         "flag":false,
         "t":false,
         "ss":false,
         arr:'',
         ban:'',
         bzhu:'',
         auto:'',
         name:'',
        numb:'',
        hdk:'',
        hh:'',
        dd:'',
        uarr:'',
        bod:'',
         key:'',
         uids:''
        }
    },
    filters: {
          formatDate(time) {
            var date=new Date(time)
              return formatDate(date, 'MM.dd');
          }
      },created:function(){
          function getvalue(name)
        {
        var str=window.location.hash;
        if (str.indexOf(name)!=-1)
        {
        var pos_start=str.indexOf(name)+name.length+1;
        var pos_end=str.indexOf("&",pos_start);
        if (pos_end==-1){
         return str.substring(pos_start);
        }else{
        return str.substring(pos_start,pos_end)
        }
        }
        else
        {
        return "";
        }
        }
        var gid=getvalue("id")
        this.dd=getvalue("type")
          this.key=getvalue("key")
        this.$http.get(Config.api.gday,{params:{groupId :gid}}).then(
        function(response){
        console.log(response.data.data)
        this.bod=response.data.data[this.key]


    // 响应成功回调
  }, function(response){
      // 响应错误回调
  })
         var uids = getvalue("page");
         this.uids=uids;
          var cid= sessionStorage.getItem('xid');
          if(uids!==''){
           this.$http.get(Config.api.userone,{params:{'X-SESSION-ID':cid,memberid:uids},headers:{'X-SESSION-ID':cid}}).then(
        function(response){
         console.log(response.data.data)

          this.uarr=this.headImg(response.data.data);


  }, function(response){
      // 响应错误回调
  })
     }
        //alert(gid)
        this.hh=gid
         if(!this.hh==''){
   this.$http.get(Config.api.gropfo,{params:{groupId :gid}}).then(
        function(response){
      console.log(response.data.data)
     this.arr=response.data.data

      console.log(this.arr)// 响应成功回调
  }, function(response){
      // 响应错误回调
  })
  }
   this.ban=localStorage.getItem('a');
     var sid= sessionStorage.getItem('xid');
          this.$http.get(Config.api.info,{params:{'X-SESSION-ID':sid},
                      headers:{'X-SESSION-ID':sid}}).then(
                  function(response){
                   console.log(response.data.data)
                   this.auto= this.headImg(response.data.data);
            }, function(response){
                // 响应错误回调
            })
    },
   mounted:function () {
      document.title="提交订单";

    },
    methods:{

      submet(){
         

        //alert(this.uids)
         if( this.uids==""){
          alert('请完添加个人信息');

         }else{
           var nid=[];
        var kk=[];
        kk.push(this.bod.gagenda)
       nid.push(localStorage.getItem('nid'))
          var si=sessionStorage.getItem('xid');
          var buk=[];
          var bbk={};
          bbk.phone=this.uarr.cphone;
          bbk.pname=this.uarr.uname;
          bbk.pidcard=this.uarr.cname;
          bbk.pidname=this.uarr.cnum;
          buk.push(this.uids)
                     this.$http.post(Config.api.tsubmet,{
                                                text:this.bzhu,
                                                agendaId:kk,
                                                recerve:buk

            },{headers:{'X-SESSION-ID':si},emulateJSON:false}).then(

                        function(response){
                          if(response.data.code==2007){
                            alert("手机号已预约过该场次")
                          }
                          if(response.data.code==2018)
                          {
                            alert("所选场地已截止报名")
                          }
                           if(response.data.code==2012)
                          {
                            alert("手机格式有误")
                          }
                           if (response.data.code==0) {

                       this.hdk=response.data.data;
                    console.log()
                  this.$router.push('/Qian?id='+this.hdk.oid+'&type='+this.hdk.type+'&dd='+this.dd);
                  localStorage.removeItem('a')
                    }else{
                         alert('此订单提交失败');
                    }
                  }, function(response){
                      // 响应错误回调
                  })
         }

      },
        infof(){
           var bid=this.hh;
             this.$router.push('/Toggle?id='+bid+'&type='+this.dd+'&key='+this.key);
        },
      tex(){
       $('.ss').html($('.txt').val())
        this.t=false
      },
       tka(){
        this.t=true
      },
      inin(){
        this.t=false
      },
      change(ev){
        var thisObj=ev.currentTarget;
        $('.sonws li').removeClass('on1')
       thisObj.classList.add('on1');
       $('.cd').html(thisObj.innerHTML)
      },
      tkt(){
        this.tk=true
      },
      inint(){
        this.tk=false
      },
      ini(){
        this.ss=false
      },
      zz(){
        this.ss=true
      },
       kai(){
        if(this.flag == false){
          $('.switch span').css({"transform":"translateX(0.9rem)","transition":" 0.5s"});
          $('.switch').css({"backgroundColor":"rgba(123,210,186,0.5)"});
          this.flag = true;
          $('.con ul li').addClass('checked');
          $('.touba').css({"display":"none"})
        }else if(this.flag == true){
          $('.switch span').css({"transform":"translateX(0rem)","transition":" 0.5s"});
          this.flag = false;
          $('.switch').css({"backgroundColor":"#ededed"});
          $('.con ul li').removeClass('checked');
           $('.touba').css({"display":"block"})
        }
      }

    }

  }
  </script>

  <style scoped>
  .ss{
    margin-left: 3rem;
    font-size: 0.7rem;
  }
  .txt{
    width:16.7rem; height:8.875rem;
    background: #ededed;
    margin-left: 0.75rem;
    padding-left: 0.6rem;
    border: none;
    padding-top: 0.6rem
  }
  .conent .bdr{ border: none;}
   .sd{ float: left; }
  .sd2{float: right; margin-right: 0.5rem; }
  .on1{
    background: #4ab6b5;
  }
  .bgr{
    background: #4ab6b5
  }
  .sonws .list{
    margin-right: 0;
  }
  .come{
    width: 17.375rem;
    height: 2.375rem;
    margin: 0 auto;
    border-bottom: 1px solid #ededed;
    line-height: 2.5rem;
    font-size: 0.75rem;
    color: #4ab6b5
  }
  .sonws{
    width: 17.375rem;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 1rem;
    font-size: 0.75rem;
  }
  .sonws li{
    float: left;
    width: 3.75rem;
    height: 1.75rem;
    line-height: 1.75rem;
    text-align: center;
    margin-right: 0.7rem;
  }
  .conent{
    position: fixed; bottom: 0;
    width: 100%;
    height:14rem;
    background: #fff;
  z-index: 1;
  }
  .ceng{
    background: #000; position: fixed;
    top: 0; width: 100%; height: 21.875rem;
    opacity: 0.3;
    z-index: 1;
  }
  .red{
    padding: 0.1rem 0.2rem;
    background: #e4474d;
     font-size: 0.3rem;
     color: #fff;
  }
  .in1{
    margin-left:0.1rem ;border-radius: 0px; 
  }
  .in{ margin-left: 2.34rem; border-radius: 0px; }
  .w1{ height: 7.5rem; }
  .w .li{ border-bottom: none; }
  .footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    height:2.5rem;
    line-height: 2.5rem;
    background: #fff;
  }
  .footer .zi{
    margin-left: 2rem;
    font-size: 0.75rem;
    color: #666;
  }
  .footer .yuan{

    font-size: 0.65rem;
    color: #666;
    text-decoration:line-through;
    margin-left: 0.2rem
  }
  .footer span{
    float: left;
  }
  .zf{

    font-size: 0.75rem;
    color: #fc5c62;
    font-weight: bold;

  }
  .footer .zf1{
    width: 6rem;
    height:2rem;
    float:right;
    margin-right: 0.75rem;
    background: #fc5c62;
    font-size: 0.75rem;
    border-radius: 5px ;
    text-align: center;
    margin-top: 0.2rem;
    line-height: 2.18rem;
    color: #fff;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #000; opacity:0.1;

  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #000;opacity:0.1;
  }

  input:-ms-input-placeholder{
      color: #000;opacity:0.1;
  }

  input::-webkit-input-placeholder{
      color: #000;opacity:0.1;
  }
  .touba{
    font-size: 0.7rem;
    width: 100%;
    background: #fff;
  }
  .touba li{
    width:17.25rem;
    height: 3.8rem;
    margin: 0 auto;
  }
  .touba span{
    line-height:1.875rem;
    color: #666
  }
  .touba input{
   height: 1.1rem;
   width: 14.1rem;
   border-bottom:1px solid #ededed ;
  }

  input{

  outline:none;

  border:none;

  }
  .calendar-title-box
  .s{
    font-size: 0.5rem;
    left: 3rem;
    width:1.375rem;
    height: 1rem;
    background: #e4474d;
    color: #fff;
    left: 10rem;
    padding: 0.15rem 0.35rem
  }
  .sec{
    height: 2.5rem;
    background-color: #fff;
    margin-top: 0.5rem;
    line-height: 2.5rem;
    padding-left: 0.6rem;
    font-size: 0.6rem;
  }


  .switch{
    float: right;
    width: 1.8rem;
    height: 0.9rem;
    border-radius: 10px;
    background-color: #ededed;
    border: 1px solid #dedede;
    margin-top: 0.8rem;
    margin-right: 0.6rem;
    position: relative;
  }
  .switch span{
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 50%;
    height: 0.9rem;
    width: 0.9rem;
    background-color: #4ab6b5;
  }
  *{
    list-style: none;
    overflow: hidden;
  }
    .hello{width: 100%; height: 100%;}
    .bg{
      width: 100%; height:0.75rem;
    }
    .w{
     width: 100%;
     background: #fff;
    }
    .w li{
      width:17.25rem;
      height:2.5rem;
      margin:0 auto;
      border-bottom: 1px solid #ededed

    }
  .w  li span{
    line-height:2.5rem;
  }
  .sp1{
    float: left;
    font-size: 0.75rem;
    color: #000;
  }
  .sp2,.img{
    float: right;
    font-size: 0.65rem;
    color:#666;
  }
  .sp2{
    margin-right: 0.6rem;
    line-height: 0.65rem
  }
  .img{
    width: 0.4rem;
    height: 0.6rem;
    margin-top: 0.95rem;
  }
  .img2{
    width: 0.9rem; height: 0.9rem;
    margin-top: 0.85rem
  }
  .yuyue{
    border-bottom: 1px solid #ededed
  }
  .vao{
       padding-left: 2.34rem;
        font-size: 0.55rem;
        color: #666;
        background: #fff;
        /* height: 2rem; */
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-right: 0.5rem;
  }
  .vao span{
    color: #4ab6b5;
  }
  .foo{
    width: 100%; background: #fff;
    height: 2.2rem;
  }
  .w .kuo{
    height: 2.5rem;
    overflow: hidden;
  }

  </style>
