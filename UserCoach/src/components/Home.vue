<template>

  <div class="">
    <div v-show="sus" class="sus" >
      <div class="xuan">
        <p class="buil">
          <span @click="nice()">重置</span>
          <img src="../assets/cuow.png" alt="" @click="sus=false">
        </p>
        <div id="box">
         <ul>
          <li class="on">时间</li>
          <li>性别</li>

          <li>等级</li>
        </ul>
        <div style="display:block" class="ui"  >
          <span v-for="(val,index) in arr1" @click="one(index)" :class="{one:index==onet}">{{val}}</span>

        </div>
        <div class="ui2">
         <span v-for="(val,index) in arr2"  @click="two(index)" :class="{one:index==twot}">{{val}}</span>

       </div >

       <div class="ui4">
         <span v-for="(val,index) in arr4" @click="four(index)" :class="{one:index==fourt}">{{val.rankName}}</span>
       </div>
     </div>
     <div class="foo" @click="subm()">
      <!--   <img src="../assets/xuequ.png" alt=""> -->
      确定
    </div>
  </div>
</div>
<header class="top">
  <p class="xuze">
   <img class="nnu" src="../assets/xuequ.png">
   <router-link to="/Xzxq">  <span class="uq" v-if="id==null">{{htmm}}</span> <span class="uq" v-else>雪区</span></router-link>
   <img  class="img"src="../assets/fanhui.png">
 </p>
 <p class="p2">
   <input class="inp1" type="text"  placeholder="搜索教练姓名"></input>
   <img class="img1" src="../assets/sousuo.png" >
 </p>
 <img src="../assets/shuaixun.png" class="img2" @click="sousuo()">
</header>
<!--导航栏-->
<div class="bguu">
  <ul class="nav1">

    <li v-for="(relation,index) in relations"  v-bind:id="relation.id" v-bind:class="{checked:index==nowIndex}" v-on:click="relationClick(index)"><router-link  :to="relation.url">{{relation.text}}</router-link></li>
  </ul>
</div>

<div class="text"><!--内容显示点击那一个显示那一个-->
  <!-- 路由匹配到的组件将渲染在这里 -->



  <router-view >
     <!--   <history v-bind:me="obj">
     </history> -->
   </router-view>



 </div>

</div>
</template>

<script>


import Config from '../config/config.vue'
import hot from './page/hot.vue'
import history from './page/history.vue'
import end from './page/end.vue'
import wkf from './page/wkf.vue'
import wkj from './page/wkj.vue'
import wkk from './page/wkk.vue'
import wky from './page/wky.vue'

export default {
// components:{
//  history
// },

data(){
  return{
    arrr:'',
    htmm:'',
    id:'',
    sus:false,
    twot:-1,
    onet:-1,

    fourt:-1,
    xid:'',
    obj:{},
    arr1:["明天","近三天","近一周"],
    arr1t:'',
    arr2:["女","男"],
    arr2t:'',
    timei:'',

    arr4:'',
    arr4t:'',
    relations: [
    {text:'热门推荐',id:'program',url:'/home/hot'},
    {text:'单板教练',id:'person',url:'/home/history'},
    {text:'双板教练',id:'organization',url:'/home/end'},
    {text:'班式课程',id:'tech',url:'/home/jxy'},
   
    {text:'教学卡',id:'country',url:'/home/wky'},
  
    ],
    nowIndex:0,
  }

},

created: function () {
  var id=localStorage.getItem('regionId')
  this.id=id
  if(this.id==null){
   this.$http.get(Config.api.infos).then(
    function(response){
      var res=response.data.data;
      this.arrr=res
 // console.log(response)// 响应成功回调
  this.htmm=this.arrr[0].name;
  localStorage.setItem('regionId',this.arrr[0].id)

}, function(response){
  // 响应错误回调
})
 }
 this.$http.get(Config.api.dengji,{}).then(
  function(response){
  // console.log(response.data.data)
   this.arr4=response.data.data
 }, function(response){
  // 响应错误回调
})
     //级别


   },
   mounted:function () {


    if (window.location.hash=="#/About") {

      $('.bk').css("display","noene");
      $('.jj').css("display","block");
      $('.sc').css("display","none");
      $('.ll').css("display","none");
      $('.wo').css("color","#bcbcbc");
      $('.jjj').css("color","#4ab6b5");
      $('.wo1').css("color","#bcbcbc");
      $('.sk').css("display","block");
      $('.lk').css("display","block");

    }
    else{
// alert(2)
$('.bk').css("display","block");
$('.jj').css("display","none");
$('.sc').css("display","none");
$('.ll').css("display","block");
$('.wo').css("color","#bcbcbc");
$('.jjj').css("color","#4ab6b5");
$('.wo1').css("color","#bcbcbc");
$('.sk').css("display","block");
}
if (window.location.hash=="#/Page") {

  $('.bk').css("display","block");
  $('.jj').css("display","none");
  $('.sc').css("display","none");
  $('.ll').css("display","block");
  $('.wo').css("color","#bcbcbc");
  $('.jjj').css("color","#4ab6b5");
  $('.wo1').css("color","#bcbcbc");
  $('.sk').css("display","block");

}else{
// alert(1)
$('.bk').css("display","block");
$('.jj').css("display","none");
$('.sc').css("display","none");
$('.ll').css("display","block");
$('.wo').css("color","#bcbcbc");
$('.jjj').css("color","#4ab6b5");
$('.wo1').css("color","#bcbcbc");
$('.sk').css("display","block");
}
var qo=localStorage.getItem('htm')
if(!qo==''){
  $('.uq').html(qo)
}


$('.bguu').height($(window).height())
document.title="滑雪首页";
 //localStorage.setItem('xid','8d517ee042a74db8b6d795365bea6ce0');



},
updated:function(){


  var oBox=document.getElementById('box');

  var aBtn=oBox.getElementsByTagName('li');
  var aDiv=oBox.getElementsByTagName('div');

  for(var i=0;i<aBtn.length;i++){
      // aBtn[i].index=i;
      (function(index){
        aBtn[i].onclick=function(){
         // alert(aDiv.length)

         for(var i=0;i<aBtn.length;i++){
          aBtn[i].className='';
          $('#box div').eq(i).css('display','none')
        }
        this.className='on';
        aDiv[index].style.display='block';
        $('#box div').eq(index).addClass('bu')
      }
    })(i)
  }

},
methods:{
  nice(){

    $('.inp1').val('');

    window.location.reload();

  },
  one(index){




    this.onet=index

    if($('.ui span').eq(index).hasClass('one')){
     this.onet==-1
     $('.ui span').eq(index).removeClass('one')
   }else{ $('.ui span').eq(index).addClass('one')
           //$('.ui span').removeClass('one')
         }


       },
       two(index){
        this.twot=index
        if($('.ui2 span').eq(index).hasClass('one')){
         this.twot==-1


         $('.ui4 span').eq(index).removeClass('one')
       }else{ $('.ui2 span').eq(index).addClass('one')


     }
     //console.log(this.arr2t)
   },

   four(index){


    if($('.ui4 span').eq(index).hasClass('one')){

     $('.ui4 span').eq(index).removeClass('one')

   }else{ $('.ui4 span').eq(index).addClass('one')

 }

},
subm(){
  this.sus=false;
},
sousuo(){
  this.sus=true;
},
relationClick:function(index){
 $('.ui2 span').removeClass('one')
 $('.ui span').removeClass('one')
 $('.ui4 span').removeClass('one')
 this.nowIndex=index;

}

}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foo{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height:2.45rem;
  color: #fff;
  background:#4ab6b5;
  font-size:0.75rem;
  text-align: center;
  line-height: 2.7rem;
}
#box .one{
  background: #4ab6b5;
  color: #fff;
}
#box ul{
  width: 4rem;
  height: 12.25rem;
  float: left;

}
#box li{
  width: 100%;
  height:3.0625rem;
  line-height:3.1625rem;
  text-align: center;
  font-size: 0.75rem;
}
#box div{
  float: right;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}
#box .onr{
  display: block;
}
#box div{width:9.7rem; height: 200px; display: none; text-align: center;}
.on{color: #4ab6b5}
#box span{
  color: #666;
  float: left;
  padding: 0.28rem 0.8rem  0.17rem 0.8rem;
  border-radius: 1.5rem;
  margin:0.5rem;
  background: #ededed
}
.buil{
  width: 14.25rem;
  border-bottom: 1px solid #ededed;
  height: 2.25rem;
  overflow: hidden;
}
li{
  list-style: none;
}
.buil span{
  float: left;
  font-size: 0.75rem;
  line-height: 2.35rem;
  color: #4ab6b5;
  margin-left: 1.375rem;
}
.buil img{
  width: 0.8rem;
  height: 0.8rem;
  float: right;
  margin-top:0.76rem;
}
.xuan{
  width: 15rem;
  height: 100%;
  background: #fff;
  z-index: 100;
  position: absolute;
  right: 0;
}
.sus{
  position: fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  z-index: 99
}
.nnu{

  width: 100%;
  height: 100%;
  z-index: -9999
}
.router-link-active{
  background: #eff4f7;
  background: #eff4f7;
  border-right: 3px solid #69c4ab;
  box-sizing:border-box;
}

a{ width: 100%; height: 100%; display: block; }
.bguu{
  position: fixed;
  left: 0;
  width: 5rem;
  background: #fff;
  top: 0;
}
.nav a{
  height: 2.5rem;
  width: 100%;
  display: block;
}
.home{
  width: 100%; position: relative;
}
.bgt{
  border-right:3px solid #69c4ab;
  background: #ededed;
}
.top{
 width: 100%; height: 2.25rem;
 position:fixed;
 top: 0;
 background: #fff;
 border-bottom: 1px solid #d3d3d3;
 z-index: 1
}
.nav1{
 width: 5rem;
 position: absolute;
 left: 0;
 top: 2.25rem;
 box-sizing:border-box;
 border-right: 1px solid #ededed;
 background: #fff;
}
.nav1 li{
  box-sizing:border-box;
  height: 2.5rem;
  width: 100%;
  text-align: center;
  line-height: 2.5rem;
  border-bottom: 1px solid #ededed;
  text-align: center;
  font-size: 0.65rem;
  color: #666;
}
.text{
 position: absolute;
 right: 0;

 top: 2.25rem;
 width:13.75rem;
 box-sizing:border-box;
 background: #ededed;
}
.xuze{
  width: 3.5rem;
  height: 1.4rem;
  margin-top: 0.35rem;
  position: relative;
  margin-left: 0.4rem;
  border-radius: 1.5rem;
}
.xuze a{
 font-size: 0.65rem;
 color: #fff;
 width: 100%;
 height: 100%;
 position: absolute;
 top:0;
 text-align: center;
 display: inline-block;
 line-height: 1.525rem;
}
.xuze .img{
 position: absolute;
 right: 0.35rem;
 top: 0.42rem;
 width: 0.38rem;
 height: 0.57rem;


}
.img{
  vertical-align: middle;
}
.inp1{
  position: absolute;
  left: 5rem;
  top: 0.45rem;
  background: #ededed;
  -webkit-appearance: none;

  width: 10rem;
  line-height: 0.8rem;
  border-radius: 0.6875rem;
  padding-top:0.06rem;
  border:0;outline:none;
  padding-left: 1.7rem;
  font-size: 0.6rem;
  height: 1.3rem;
}
.img1{
  position: absolute;
  left: 5.7rem;
  top: 0.8rem;
  width: 0.7rem;
  height: 0.7rem;
}
.img2{
  width: 1.1rem;
  height: 1.1rem;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
a{ color:#666 }
</style>
