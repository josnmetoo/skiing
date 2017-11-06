  <template>
    <div class=" h  ">
     <!-- 没有卡的状态 -->


     <!-- 有卡的状态 -->
     <div  class="top" v-if="ar!==undefined && mid!==null && arr2.usercardid!==undefined">
      <div>
        <img :src="ar.listimg"/>
        <p class="p1">
          <span class="sp1" v-for="val in ar.sites">
            {{val.name}}
          </span>
          <span class="sp2">
           可预约天数{{ar.residueday}}
         </span>
         <span class="sp2">
          {{ar.cardpeopletypes}}   {{ar.cardtypes}} {{ar.skateboardtypes}}
        </span>
      </p>
      <p  class="p2" @click="by(uid)">
        季卡预约
      </p>
    </div>

  </div>
  <div class="top" v-else>
    <div>
      <img  src="../assets/wyy.png"/>
      <p class="p1">
        <span class="sp1" >

        </span>
        <span class="sp2">

        </span>
      </p>
      <p @click="gen()" class="p2" >
       立即购买
     </p>
   </div>

  </div>
  <div class="top1">
    <div @click="see()">
      <span v-if="arr2.usercardid==undefined">
       <img  class="to" src="../assets/400.png" alt="">
     </span>
     <span v-else>
      <img class="to"   :src="arr2.avatar">
    </span>
    <span class="name" v-html="arr2.nickname">

    </span>

    <img  class="jian" src="../assets/qiehanyongh.png" alt="">
    <span class="qie"  v-if="arr2.usercardid==null">
      添加初始用户
    </span>
    <span class="qie"  v-else>
      切换用户
    </span>
  </div>
  </div>
  <div class="ka" @click=dan(arr2.memberid)>
   <img class="bg1" src="../assets/pic1.png" alt="">
   <p class="dan">
     <img src="../assets/yuan.png" alt="">
     <span class="m">
      单板成就
    </span>
    <span class="mt"  v-if="arr2.usercardid==null">0<span>/6</span></span>
    <span class="mt" v-else>{{jk}}<span>/6</span></span>
  </p>
  <ul class="ta two" >
   <li>
     <span>Lv1</span>
     <img src="../assets/lv1.png">
   </li>
   <li>
     <span>Lv2</span>
     <img src="../assets/lv2.png">
   </li>
   <li>
     <span>Lv3</span>
     <img src="../assets/lv3.png">
   </li>
   <li>
     <span>Lv4</span>
     <img src="../assets/lv4.png">
   </li>
   <li>
     <span>Lv5</span>
     <img src="../assets/lv5.png">
   </li>
   <li>
     <span>Lv6</span>
     <img src="../assets/lv6.png">
   </li>
  </ul>
  </div>
  <div class="ka one" @click=shuang(arr2.memberid)>
   <img class="bg1" src="../assets/pic2.png" alt="">
   <p class="dan">
     <img src="../assets/shuangabn.png" alt="">
     <span class="m">
      双板成就
    </span>
    <span class="mt"  v-if="arr2.usercardid==null">0<span>/6</span></span>
    <span class="mt" v-else>{{ji}}<span>/6</span></span>
  </p>
  <ul class="ta">
   <li>
     <span>Lv1</span>
     <img src="../assets/1.png">
   </li>
   <li>
     <span>Lv2</span>
     <img src="../assets/2.png">
   </li>
   <li>
     <span>Lv3</span>
     <img src="../assets/3.png">
   </li>
   <li>
     <span>Lv4</span>
     <img src="../assets/4.png">
   </li>
   <li>
     <span>Lv5</span>
     <img src="../assets/5.png">
   </li>
   <li>
     <span>Lv6</span>
     <img src="../assets/6.png">
   </li>
  </ul>
  </div>
  </div>

  </template>

  <script>

    import Config from '../config/config.vue'
    export default {

      data () {
        return {
          arr:'',
          arr2:'',
          ji:'',
          jk:'',
          sid:'',
          ar:'',
          mid:''
        }
      },created:function(){
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
        //console.log(this.arr2.usercardid)
        this.uid=getvalue("uid")
        this.sid=sessionStorage.getItem('xid');
        if(this.uid!==''){

         this.$http.get(Config.api.userone,{params:{memberid:this.uid},headers:{'X-SESSION-ID':this.sid}}).then(
          function(response){
         ///console.log(response.data.data)
         var data = response.data.data;
         if(response.data.code==0){
          this.arr2 = this.headImg(data);
         // console.log(this.arr2)
        }

        
        this.jk= this.arr2.levelone;
        this.ji=this.arr2.leveltwo;
        for(var i=0; i<this.ji;i++){
          for(var j=0; j<$('.one li img').length;j++){
            $('.one li img').eq(i).animate({"opacity":"1"},1000)
          }
        }
        for(var i=0; i<this.jk ;i++){
          for(var j=0; j<$('.one li img').length;j++){
            $('.two li img').eq(i).animate({"opacity":"1"},1000)
          }
        }

        if(this.arr2.usercardid!==null){

          this.$http.get(Config.api.usecar,{params:{usercardid:this.arr2.usercardid},headers:{'X-SESSION-ID':this.sid}}).then(


            function(response){
             this.ar=response.data.data;
            // console.log(this.ar)
           }, function(response){
      // 响应错误回调
    })
        }
        //alert(this.uarr)
      }, function(response){
      // 响应错误回调
    })
       }   else{
        this.mid= localStorage.getItem("memberid");

        if(this.mid!==null ){

          this.$http.get(Config.api.userone,{params:{memberid:this.mid},headers:{'X-SESSION-ID':this.sid}}).then(
            function(response){
             var data = response.data.data;
         ///console.log(response.data.data)
         if(response.data.code==0){
          this.arr2 = this.headImg(data);
          //console.log(this.arr2)
        }

        this.jk= this.arr2.levelone;
        this.ji=this.arr2.leveltwo;
        for(var i=0; i<this.ji;i++){
          for(var j=0; j<$('.one li img').length;j++){
            $('.one li img').eq(i).animate({"opacity":"1"},1000)
          }
        }
        for(var i=0; i<this.jk ;i++){
          for(var j=0; j<$('.one li img').length;j++){
            $('.two li img').eq(i).animate({"opacity":"1"},1000)
          }
        }
        this.$http.get(Config.api.usecar,{params:{usercardid:this.arr2.usercardid},headers:{'X-SESSION-ID':this.sid}}).then(


          function(response){
           this.ar=response.data.data;
           //console.log(this.ar)
         }, function(response){
      // 响应错误回调
    })
        //alert(this.uarr)
      }, function(response){
      // 响应错误回调
    })
        }
       // console.log(this.uid)
        //console.log(this.mid)

      }   
    }, mounted:function () {
  //alert($('.one li img').length)
  document.title="学习成就";

  if (window.location.hash.length>10 || window.location.hash=="#/Page") {
       // alert(1)
       $('.wo1').css("color","#4ab6b5");
       $('.sc').css("display","block");
       $('.sk').css("display","none");
       $('.bk').css("display","none");
       $('.jjj').css("color","#bcbcbc");
       $('.jj').css("display","none");
       $('.ll').css("display","block");
       $('.wo').css("color","#bcbcbc");}

      

    },
    methods:{
     dan(uid){
       if(this.arr2.usercardid==null)
       {
        alert("暂无成员请先添加成员");
        return;
      }
      var userid = sessionStorage.setItem("uid",uid);
      this.$router.push("/study/dan?index="+0);
    },
    shuang(uid){
      if(this.arr2.usercardid==null)
      {
        alert("暂无成员请先添加成员");
        return;
      }
      var userid = sessionStorage.setItem("uid",uid);

      this.$router.push("/study/shuang?index="+1);
    },
    gen(){
      this.$router.push("/home/wky")
    },
    see(){
      this.$router.push("/Toggle?type="+2)
    },
    by(){
     this.$router.push("/Mentt?uid="+this.uid)
   }
  }
  }
  </script>
  <style scoped>

    .top{
      width: 100%;
      height: 5.5rem;
      background: #fff;
      margin-top:0.5rem; 


    }
    .top div{
      width: 17.5rem;
      margin:0 auto;
      border-bottom:1px solid #ededed;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;

    }
    .top img{
      width: 5.75rem;
      margin:0.85rem 0.5rem 0 0;
      float: left;
    }
    .p1{
      float: left;
      margin-top: 1.1rem;
    }
    .p1 .sp1{
     font-size: 0.72rem;
     color: #313b3b;
     display: block;
     margin-bottom: 0.3rem;
   }
   .p1 .sp2{
    font-size: 0.6rem;
    color:#d5d5d5;
    display: block;
  }
  .p2{
    float: right;
    font-size: 0.75rem;
    border:1px solid #4ab6b5;
    width:4.5rem;
    height: 1.5rem;
    line-height: 1.6rem; 
    color: #4ab6b5;
    text-align: center;
    border-radius: 1.5rem;
    margin-top:1.9rem;
  }
  .to{
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    margin-top:0.5rem;
    float: left;

  }
  .top1{
    width: 100%;
    height:3.05rem; 
    background: #fff;
  }
  .top1 div{
   width: 17.5rem;
   margin:0 auto;
   
   height: 100%;
   overflow: hidden;
   box-sizing: border-box;

  }
  .name{
    font-size: 0.7rem;
    float: left;
    margin-top:1.15rem;
    margin-left: 0.5rem; 
  }
  .qie{
    float: right;
    font-size: 0.6rem;
    color: #4ab6b5;
    margin-top: 1.15rem;
    margin-right: 0.5rem;
  }
  .jian{
    float: right;
    width: 0.4rem;
    height: 0.7rem;
    margin-top: 1.18rem;
  }
  .ka{
    width: 17.5rem;
    height:7.5rem; 
    margin: 0.5rem auto;
    position: relative;
  }
  .ka .bg1{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
  li{
    list-style:none; 
  }
  .dan img{
    width:0.35rem;
    height:0.8rem;
    float: left; 
    margin-top: 0.1rem; 

  }
  .dan{
    overflow: hidden;

    color: #fff;
    padding-top: 0.4rem;
    padding-left: 0.5rem;
  }
  .dan .m{
    float: left;
    font-size: 0.65rem;
    margin-left: 0.3rem;
    margin-top: 0.1rem;
    line-height: normal;
  }
  .dan .mt{
    float: right;
    font-size: 0.7rem;
    margin-right: 0.5rem;
  }
  .dan .mt span{
    font-size: 0.55rem;
  }
  .ta{

    width: 100%;
    display:flex;
    height: 3.75rem;
    font-size: 0.6rem;
    color: #fff;
  }
  .ta li{
    flex: 1;
    text-align: center;

  }
  .ta span{
    display: block;
    margin-bottom: 0.7rem;
    margin-top: 0.7rem;
  }
  .ta img{
    width: 1.6rem;
    height: 2rem;
    opacity: 0.5
  }
  .one{
    margin-bottom: 3rem;
  }
  </style>
