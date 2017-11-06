<template>
  <div class="h ">
  <p v-show="ss=uu" class="qi">此雪区暂无季卡售卖</p>
  <ul>
    <li v-for="(val,index) in arr"  @click=gomis(val.cardid,val.cardpeopletype) >
      <img class="big" :src="val.listimg" alt="">
      <div>
      <p class="p1">
      <span class="sp1">{{val.cardname}}</span>
        <span class="sp2">（{{val.useday}}天）</span>
      </p>
      <p class="p2">
        <img src="../../assets/shan.png">
        <span v-for="va in val.sitenames">
          {{va}}
        </span>
      </p>
      <p class="p3">
        <span class="sp1"><b>¥{{val.minprice}}</b></span>
        <span class="sp2">起</span>
      
      </p>
  

      </div>
      <div class="bu" v-if="val.discount!='0'"> <span>限时{{val.discount*0.1}}折</span><img  src="../../assets/dazhe.png"></div>
    </li>
      
  </ul>
  </div>
  
</template>

<script>

 import Config from '../../config/config.vue';
 export default {
 
  data () {
    return {
      uu:'',
      arr:'',
    }
  },created:function(){
     var id=localStorage.getItem('regionId')
            this.$http.get(Config.api.carlist,{params:{regionid:id}}).then(
      function(response){
        if(response.data.code==0){
          this.arr=response.data.data
           if(this.arr.length==0){
          this.uu=true;
        }
      }

}, function(response){
    // 响应错误回调
})


  },
  methods:{
gomis(carid,type){
     this.$router.push("/Miss?carid="+carid+'&cidtype='+type)
  }
}
}
</script>
<style scoped>
.bu{
  
  position: absolute;
  bottom: 0.55rem;
  width: 3.3rem;
  right: 0;
  height: 1.1rem;
}
.bu img{
  width: 100%;
  height: 100%;
  position: absolute;
}
.bu span{
  position:absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 0.6rem;
  z-index: 99;
  color: #fff;
  line-height: 1.1rem;
  text-align: center;
}
.qi{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.7rem;
  color: #666;
  background: #ededed;
  text-align: center;
}
 li:last-child{
   border:none;

  }
.h{
  width: 13.375rem;
  background: #fff;
  float: right;
  overflow: hidden;
  margin-bottom: 3rem;
}
ul{
  width: 12.7rem;
  float: right;
}
li{
  list-style: none;
  overflow: hidden;
  border-bottom: 1px solid #ededed;
  margin-top:0.7rem;
  padding-bottom: 0.7rem;
  position: relative;
}
.qi{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-size: 0.7rem;
  color: #666;
  background: #ededed;
  text-align: center;padding-top:0.5rem;
}
.big{
  width: 5.6rem;
  height: 3.7rem;
  float: left;
}
li div{
  float: left;
  margin-left:0.625rem; 
}
.p2 img{
  width:1rem;
  height: 0.7rem; 
margin-top: 0.08rem;
float: left;
margin-right: 0.3rem;
}
.p1 .sp1{
  color: #666;
  font-size:0.65rem; 
 float: left;
}
.p1{
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.p1 .sp2{
  font-size: 0.55rem;
   color: #666;
   float: left;
margin-top: 0.08rem;
}
.p2{
 overflow: hidden;
 
}
.p2 span{
  font-size: 0.6rem;
  color: #8c8c8c;
  display: inline-block;
float: left;
line-height:1.1rem;

}
.p3{
  color: #fc5c62;
   margin-top:0.3rem;
margin-top: 0.4rem;
font-size: 0.7rem;
  
}.p3 .sp2{
  font-size:0.5rem; 
}
</style>
