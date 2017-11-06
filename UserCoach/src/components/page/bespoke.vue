<template>
<div class="besk" @touchmove="sho()">
<!--日期弹框-->
<div class="ceng" v-show="ss"  @click="bk"></div>
 <div class="conent" v-show="ss">
   <p class="come bdr">
   <span class="sd">请填选择日期</span>
  <span class="sd2" @click="ff"> 确定</span>
    </p>
    <ul class="tu" v-if="arr2.length>0">
      <li  v-for="(val,index) in arr2"   @click="iscur=index;cheng($event,val.gagenda,index)" :class="{bba:iscur==index}"><span class="s1">{{val.stime | formatDate}}-{{val.etime | formatDate}}期</span>
          <span class="s2">{{val.sname}}</span>
          <span class="s3">{{val.count}}/{{val.gnumber}}</span>
      </li>

    </ul>
<ul v-else>
  <li class="jikk">集训营课程暂未开放！</li>
</ul>
 </div>
 <div class="jq">
<div class="top">
  <mt-swipe :auto="3000">
  <mt-swipe-item v-for="val in arr.pics"><img :src="val+'_w720'" alt="" /></mt-swipe-item>

</mt-swipe></div>
  <div class="box">
    <p class="p1">
      {{arr.gname}}
    </p>
    <p class="p2">
      <img src="../../assets/weizhi.png" class="p2i" alt=""/>
      <span class="sss">{{arr.rname}}</span>
      <img class="nn" src="../../assets/xuexi.png" alt=""/>
      <span>
        已有{{arr.snum}}个小伙伴体验过
      </span>
    </p>
    <p class="p3" @click="houser()" v-if="cod==0 && cod!=''">
      <img class="sc" src="../../assets/shoucang2.png" alt=""/>
      <span>收藏</span>
    </p>
    <p class="p3" @click="houser()" v-if="cod==1 && cod!=''">
      <img class="sc" src="../../assets/shoucang.png" alt=""/>
      <span class="ok">已收藏</span>
    </p>
   
  </div>

    <ul class="w">
    <li @click="kb()">
      <span class="spp1" v-if="code==0 && arr2.length>0">{{x.stime | formatDate}}-{{x.etime | formatDate}}期</span>
      <span class="spp1" v-else style="color:#666">培训班课程正在安排</span>
      <img class="img1" src="../../assets/dd.png">
      <span class="sp2">周末小班-单板</span>
    </li>
    <li class="li">
      <span >可能交到的朋友</span><b class="de" v-if="code==0 && arr2.length>0">{{x.count}}/{{x.gnumber}}</b>
            <b class="de" v-else>0/0</b>
    </li>
    <li class="bor">
    <span class="in" v-if="x.count==0">你即将成为第一个加入的人</span>

    <img class="tou"  v-for="(vu,inde) in x.pics" :src="vu.pic" alt="" />
    <img class="tou" v-if="box1.length>0" v-for="hh in box1" src="../../assets/friends.png" >
      <span class="sp2" @click="book()" v-if="cod!=''">沟通</span>
     <img @click="book()"  v-if="cod!=''" class="img" src="../../assets/goutong.png">
    </li>
    </ul>
    </div>
 <div id="box">
    <ul>
      <li class="on"><img src="../../assets/kecheng.png" alt=""/>&nbsp;&nbsp;教学内容</li>
      <li><img src="../../assets/yuding.png" alt=""/>&nbsp;&nbsp;预定须知</li>
      <li @click="com()"><img src="../../assets/xueyuan1.png" alt=""/>&nbsp;&nbsp;用户评价</li>
    </ul>
    <div style="display: block;" v-html="arr.tails">

    </div>
    <div v-html="arr.tice">

    </div>
    <div class="most">
      <p style="color:#ccc;font-size:0.7rem;text-align:center;padding-bottom:1rem;" v-show="evaluates.length == 0">   <div class="comNum" >
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
        </div></p>
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
<div class="footer">
<span class="zf">
  ¥{{arr.gprice*0.01}}
</span>
        <span  @click="ban()" class="zf1">
        <img src="../../assets/tjdan.jpg">
          <span>立即预约</span>
        </span>
</div>
</div>

</template>

<script>
import {formatDate} from '../../libs/data.js';
import Config from '../../config/config.vue'
export default {
  data() {
    return{
      box:false,
     iscur:0,
      arr:'',
      ss:false,
      arr2:'',
      x:'',
      id:'',
      type:'',
      index:0,
      code:'',
      box1:[],
      useid:'',
      cod:'',
      comments:[],
      evaluates:[]
    }
  },filters: {
        formatDate(time) {
          var date=new Date(time)
            return formatDate(date, 'MM.dd');
        }
    },
 created:function(){
  //截取地址后面的参数

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
      var gid=getvalue("id")
       this.type=getvalue("type")
       this.useid=sessionStorage.getItem('xid');
        this.linshi=sessionStorage.getItem('linshi');
      this.id=gid
 this.$http.get(Config.api.gropfo,{params:{groupId :gid}}).then(
      function(response){
   // console.log(response.data)
   this.arr=response.data.data

   // console.log(this.arr)// 响应成功回调
}, function(response){
    // 响应错误回调
})


       this.$http.get(Config.api.gday,{params:{groupId :gid}}).then(
      function(response){
   //console.log(response.data.data)
    if(response.data.code==0)
   {

     this.arr2=response.data.data
     if(this.arr2.length>0){
      this.x=this.arr2[0]
     }

   // console.log(this.arr2)
   }
         this.code=response.data.code
         if(this.arr2.length>0){
          var jpk=this.x.count- this.x.pics.length
         this.box1.length=jpk
         }

         //alert(this.box1.length)
            // alert(jpk)
        // 响应成功回调
      }, function(response){
          // 响应错误回调
      })

      // 获取用户评价
      var commentInfo = Config.api.trainingComment;// 用户评价接口
      this.$http.get(commentInfo,{params:{groupid:gid}}).then(function (response) {
          if(response.data.code == 0){
           // console.log(response.data.data);
            this.comments = this.headImg(response.data.data);
            // 数据转换
            var data = response.data.data.evaluates;
              this.evaluates = this.headImg(data);
          }
      },function () {

      });
       //查看是否收藏
       
       
    // this.$http.post(Config.api.lookins,{
    //       type:1,id:this.id
    //       },{headers:{'X-SESSION-ID':this.useid}}).then(
    //                   function(response){
    //                   this.cod=response.data.code

    //               console.log(this.cod)
    //             // alert(response.data.code)

    //               },

    //            function(response){
    //                 // 响应错误回调
    //             })
  },
  mounted:function () {
     if(this.linshi!='111'){
      console.log(this.cid)
      this.$http.get(Config.api.lookins,{params:{type:1,id:this.id},

          headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                      this.cod=response.data.data.status

                 // console.log(this.code)
                // alert(response.data.code)

                  },

               function(response){
                    // 响应错误回调
                })
    }
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
 $(document).scrollTop(0,0);
     var xc=$('#box ul').offset().top
    $(window).scroll(function () {
    var distance = $(window).scrollTop();
    if(distance >=xc){
      $('#box ul').addClass('add').removeClass('ziji');;
    }else{
      $('#box ul').removeClass('add').addClass('ziji');;
    }
  });
    document.title="集训营详情";
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

   },
  methods:{
      houser(){
      if(this.cod==0){

        this.$http.post(Config.api.houser,{
          type:1,id:this.id
          },{headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                        if(response.data.code==0){
                         
                         this.$http.get(Config.api.lookins,{params:{type:1,id:this.id},

          headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                      this.cod=response.data.data.status

                 // console.log(this.cod)
                // alert(response.data.code)

                  },

               function(response){
                    // 响应错误回调
                })

                        }
                  // console.log(response)
                // alert(response.data.code)

                  },

               function(response){
                    // 响应错误回调
                })
      }
      if (this.cod==1) {
        this.$http.post(Config.api.lins,{
          type:1,id:this.id
          },{headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                        if(response.data.code==0){
                         
                         this.$http.get(Config.api.lookins,{params:{type:1,id:this.id},

          headers:{'X-SESSION-ID':this.useid}}).then(
                      function(response){
                      this.cod=response.data.data.status

                 // console.log(this.cod)
                // alert(response.data.code)

                  },

               function(response){
                    // 响应错误回调
                })
                        }
                  // console.log(response)
                // alert(response.data.code)

                  },

               function(response){
                    // 响应错误回调
                })
      }

    },
    book(){
        this.$router.push('/Xxi?id='+this.id+'&type='+this.type+'&key='+this.index)
    },
    sho(){
      this.box=true
    },
    kb(){
      this.ss=true
    },
    bk(){
      this.ss=false
    },
    ff(){
      this.ss=false
    },
    cheng(ev,id,index){
      //localStorage.removeItem('a')
      this.x=this.arr2[index]
      this.index=index
       var jpk=this.x.count- this.x.pics.length
   this.box1.length=jpk
        localStorage.setItem('nid',id)
       var thisObj=ev.currentTarget;
      // console.log($(thisObj).find('.s1').html())
       $('.spp1').html($(thisObj).find('.s1').html())
        $('.de').html($(thisObj).find('.s3').html())
   localStorage.setItem('a',$('.spp1').html());
    },
    ban(){
       var cidr=this.cid
       
      if(this.linshi=='111'){
      
         this.$router.replace("/Kcall");
      }else{
           if (this.arr2.length>0) {
                   this.$router.push('/Bzfu?id='+this.id+'&type='+this.type+'&key='+this.index)
                 }else{
                  alert("此培训班暂未开课")
                }
      }
       // this.$http.get(Config.api.callon,{params:{},headers:{'X-SESSION-ID':this.useid}}).then(function(response){
              
       //       if(response.data.code==0){//判断是否绑定手机号
       //         //跳转订单预定页面把教练id传过去
       //        if (this.arr2.length>0) {
       //             this.$router.push('/Bzfu?id='+this.id+'&type='+this.type+'&key='+this.index)
       //           }else{
       //            alert("此培训班暂未开课")
       //          }
       //       }else{
       //        alert("亲您好没绑定手机号，先去绑定一下")
       //          this.$router.push('/Call?id='+this.cid+'&type='+this.gid+'&text='+2);
       //       }
           
       //  }, function(response){
       //      // 响应错误回调
       //  })
    

   },
   com() {
      // 显示星星
      $('.userComlist .startNum').each(function (index,value) {
        var startnum = $(value).attr('value')/2;
        console.log(startnum);
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
.jq{
  background: #fff;
}
.p3 .ok{
  color: #ccc;
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
.ziji{
  position: relative;
}
.in{
  font-size: 0.6rem
}
img{
  width: 100%;
  height: 100%;
}
.box .p2 .sss{
  font-size: 0.65rem;
}
.box .p2 .p2i{
  width: 0.55rem;
  height: 0.7rem;
}
.box img{
  margin-bottom: 0.12rem;

}
.box .p2i{
  margin-right: 0.15rem;
}
.box .p2 .nn{
width: 0.65rem;height: 0.7rem;
}
.tu .bba{
  background: #4ab6b5;
  color: #fff;
  border: none;
}
.tu span{
  float: left;
}
.tu .s3{
  float: right;
  margin-right: 0.4rem;
}
.tu .s2{
margin-left:2rem;
}
.tu{
  width: 17.375rem;
  margin:0.5rem auto;

}
.tu li{width: 16.6rem;  height: 1.75rem; line-height: 1.75rem; border: 1px solid #bcbcbc;  font-size: 0.6rem;  padding-left: 0.6rem; margin-bottom:0.4rem;}
.sd2{float: right; margin-right: 0.5rem; }
.sd{ float: left; }
.come{
  width: 17.375rem;
  height: 2.375rem;
  margin: 0 auto;
  border-bottom: 1px solid #ededed;
  line-height: 2.5rem;
  font-size: 0.75rem;
  color: #4ab6b5
}
.conent{
  position: fixed; bottom: 0;
  width: 100%;
  height:14rem;
  background: #fff;
z-index: 15;
}
.ceng{
  background: #000; position: fixed;
  top: 0; width: 100%; height: 21.875rem;
  opacity: 0.3;
  z-index: 13;
}

#box >p{
  font-size:0.75rem;
  height: 1.75rem;
  line-height: 1.75rem;
}
#box {
  background: #fff;
  width: 100%;
}
#box ul{
  z-index: 11;
  margin: 0 auto;
  border-bottom: 1px solid #ededed;
  display: flex;
  font-size:0.63rem ;
  color: #ddd;

}
#box ul li{
  flex: 1;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
}
#box ul li img{
  width:0.75rem;
  height: 0.75rem ;
  margin-top: -0.11rem;;
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
.jikk{
  font-size: 0.75rem;
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

.box .p2 .nn{
  margin-left: 1.2rem;

}

.box .p2 span{
  font-size: 0.7rem;
}
.box .p3 .sc{
  width: 1.1rem;
  height: 1rem;
  margin-right: 0.2rem
}
.p3{
  font-size: 0.7rem;
}
.w{
  margin-bottom: 1rem;
}
.w .bor{
  border: none;
}
.tou{
  width: 1.5rem; height: 1.5rem;
  float: left; border-radius: 50%;
 margin-top: 0.5rem;
}
li{
  list-style: none;
}
img{
vertical-align: middle;
}
.top{
  width: 100%; height:14rem;
}
.box{
  width: 100%;
  position: relative;
  background: #fff;

}
.w .li{
border:none;
  font-size: 0.75rem;
  }
.w .li span{
  padding-right: 0.75rem;
}
.box .p1{
  width:12rem;
  padding:1.25rem 0 0 0.75rem;
  font-size:0.76rem;
  color: #666
}
.box .p2 img{
  width: 0.75rem;
  height: 1rem;
}
.box .p2{
  padding:0.8rem 0 0.7rem 0.75rem;
  font-size: 0.7rem;
}
.box .p3{
  position: absolute;
  right: 0.5rem;
  top:1.75rem;
  color:#4ab6b5;
  font-size: 0.5rem
}
.bor .sp2{
  margin-left: 0.5rem;margin-right:
}
.w{
   width: 100%;
   background: #fff;
  }
  .w li{
    width:17.25rem;
    height:2.8rem;
    margin:0 auto;
    border-top: 1px solid #ededed

  }
.w  li span{
  line-height:2.5rem;
}
.spp1{
  float: left;
  font-size: 0.75rem;
  color:#4ab6b5;
}
.sp2{
  margin-right: 0.6rem;
  line-height: 0.65rem;
   color:#4ab6b5;
}
.img{
  width: 1rem;
  height: 1rem;
  margin-top: 0.8rem;
}
.sp2,.img{
  float: right;
  font-size: 0.65rem;

}
.w .img1{
width: 0.4rem;height:0.55rem;
float: right;margin-top: 0.9rem;
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
  z-index: 99999;
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


  color: #fff;
  position: relative;

}
.zf1 img{
  width: 100%;
  height: 100%
}

.zf1 span{
position: absolute;
top: 0;
left: 0;
width: 100%; height: 100%;
text-align: center;
line-height: 2.6rem;
}
.wei{

}
</style>
