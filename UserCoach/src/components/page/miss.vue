

<template>
  <div class="h">
 <img class="img" :src="arr.detailsimg">
<p class="p1"><span class="sp1">{{arr.cardname}}</span><span class="sp2">（{{arr.useday}}天）</span></p>
 <p class="p2">
   <img class="img1" src="../../assets/shan.png" alt="">
   <span class="sp1" v-for="val in arr.sites">{{val.name}}</span>
 </p>
  <p class="p2">
   <img class="img1 im" src="../../assets/goumai.png" alt="">
   <span class="sp1">购买{{arr.purchasecount}}人</span>
 </p>
  <p class="p2">
   <img class="img1 i1" src="../../assets/riqi.png" alt="">
   <span class="sp1">{{arr.activatebegindate}}-{{arr.activateenddate}}</span>
 </p>
 <div class="footer">
<span class="zf">
  ¥{{arr.minprice}}<span>起</span>
</span>
        <span class="zf1" @click="go()">
        <img src="../../assets/tjdan.jpg">
          <span>立即购买</span>
        </span>
</div>
<p class="bg"></p>
<div>
  <p class="telu">
    - - - - &nbsp;&nbsp;商品介绍&nbsp;&nbsp; - - - -
    <p class="uu" v-html="arr.introduce" ></p>
  </p>
</div>
<p class="bg"></p>
<div>
  <p class="telu">
    - - - -&nbsp;&nbsp; 购买须知&nbsp;&nbsp; - - - -
     <p class="bottom uu" v-html="arr.notice" ></p>
  </p>
</div>
  </div>
  
</template>

<script>

 import Config from '../../config/config.vue';
export default {
 
  data () {
    return {
      arr:'',
      carid:'',
      xid:'',
      cidtype:''
    }
  },created:function(){
      this.xid=sessionStorage.getItem('xid');

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
      this.carid=getvalue("carid")
       this.cidtype=getvalue("cidtype")
              this.$http.get(Config.api.carone,{params:{cardid:this.carid}}).then(
      function(response){
        if(response.data.code==0){
          this.arr=response.data.data
        }

}, function(response){
    // 响应错误回调
})
   
  },
  mounted:function () {
 document.title="季卡详情";
  },
  methods:{
go(){
   var cidr=this.cid
     this.linshi=sessionStorage.getItem('linshi');
      if(this.linshi=='111'){
      
         this.$router.replace("/Kcall");
      }else{
           this.$router.push('/Jzhifu?carid='+this.carid+'&cidtype='+this.cidtype)//跳转提交页面
                localStorage.removeItem('html')
      }
       // this.$http.get(Config.api.callon,{params:{},headers:{'X-SESSION-ID':this.xid}}).then(function(response){
              
       //       if(response.data.code==0){//判断是否绑定手机号
       //         //跳转订单预定页面把教练id传过去
       //         this.$router.push('/Jzhifu?carid='+this.carid)//跳转提交页面
       //          localStorage.removeItem('html')
       //       }else{
       //        alert("亲您好没绑定手机号，先去绑定一下")
       //          this.$router.push('/Call?id='+this.carid+'&text='+3);
       //       }
           
       //  }, function(response){
       //      // 响应错误回调
       //  })
 
}
 
}
}
</script>
<style scoped>
.uu{
  width: 17.25rem;
  margin:0 auto;
}
.bg{
  background: #ededed;
  width: 100%;
  height: 0.5rem;
}
.h{
  background: #fff;
  overflow: hidden;
  margin-bottom: 3rem;
}
.img{
  display: block;
  width: 15.55rem;
  height: 9.6rem;
  margin: 0.7rem auto;
}
.p1{
  width: 17.25rem;
  margin: 0 auto;
  border-bottom:1px solid #ededed;
  padding-bottom: 0.5rem;
}
.p1 .sp1{
  font-size: 0.75rem;
  color: #0a2c2a;
}
.p1 .sp2{
  font-size: 0.6rem;
  color: #0a2c2a
}
.p2{
  width: 17.25rem;
  height:2.25rem;
  border-bottom: 1px solid #ededed;
  overflow: hidden; 
  margin: 0 auto;
}
.p2 img{
  width: 0.95rem;
  height: 0.6rem;
  margin: 0.8rem 0.5rem 0 0.1rem;
  float: left;
}
.p2 span{
  font-size: 0.63rem;
  line-height: 2.35rem;
  color: #b2b2b2;
}
.p2 .im{
   width: 0.82rem;
  height: 0.7rem;
  margin: 0.8rem 0.5rem 0 0.1rem;
}
.p2 .i1{
  width:0.75rem;
  height: 0.7rem; 
   margin: 0.745rem 0.5rem 0 0.1rem;
}
.footer{
  width: 100%;
  position: fixed;
  bottom: 0;
  height:2.5rem;
  line-height: 2.5rem;
  background: #fff;
  z-index: 99;
  border-bottom: 1px solid #ededed;
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
.zf1 span{
position: absolute;
top: 0;
left: 0;
width: 100%; height: 100%;
text-align: center;
line-height: 2.2rem;
}
.zf span{
  font-size: 0.5rem;
  font-weight: normal;
}
.telu{
  text-align: center;
  color: #333;
  font-size: 0.7rem;
  padding: 0.5rem;
}
</style>
