

<template>
  <div class="h">
   <img class="img" src="../../assets/kk.png">
   <p class="p1"><span class="sp1">订单信息</span><span class="sp2"> ¥ 2222</span></p>
   <p class="p2">
    <span>项目类型：</span>
    <span class="sp1">崇礼 多乐美地滑雪场</span>
  </p>
  <p class="p2">
    <span>教学场地：</span>
    <span class="sp1">购买100人</span>
  </p>
  <p class="p2">
    <span>有效时间：</span>
    <span class="sp1">2017.12.01-2018.04.01</span>
  </p>
  <p class="p2">
    <span>预约人：</span>
    <span class="sp1">爱点评 13626267777</span>
  </p>

  <div class="footers" @click="submit()" > <img src="../../assets/tijiaokuang.png" class="tij">确认支付</div>

</div>

</template>

<script>


  export default {
   
    data () {
      return {
        arr:'',
      }
    },created:function(){
     
     
    },
    mounted:function () {
     document.title="季卡详情";
   },
   methods:{
    submit(){
     this.$router.push('/Mue')//跳转提交页面
   }
   
 }
}
</script>
<style scoped>
  .bg{
    background: #ededed;
    width: 100%;
    height: 0.5rem;
  }
  .h{
    background: #fff;
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: fixed;
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
    overflow: hidden;
  }
  .p1 .sp1{
    font-size: 0.75rem;
    color: #0a2c2a;
    float: left;
  }
  .p1 .sp2{
   font-size: 0.8rem;
   color: #0a2c2a;
   float: right;
   
   color: #fc5c62;
   font-weight: 600
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
  z-index: 99
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
.p2 span{
  color: #666;
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
  bottom: 1.75rem;
  left:1.5rem; 
  color: #fff;
  font-size:0.75rem;
  border-radius: 5px;
}
</style>
