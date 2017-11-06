<template>
  <div class="order">

  <div class="bull" v-for="val in arr">
  <div class="bg"></div>

  <ul @click="cc(val.ucid)">
    <li><span>预约人:</span><span>{{val.uname}}</span></li>
    <li><span>预约电话:</span><span>{{val.cphone}}</span></li>
    <li><span>投保人:</span><span>{{val.cname}}</span></li>
    <li><span>投保人证件号码:</span><span>{{val.cnum}}</span></li>
  </ul>

<img src="../../assets/lese1.png" alt="" @click="end(val.ucid)">
<img src="../../assets/xie1.png" alt="" @click="go(val.ucid)">
  </div>
  <div class="box" ></div>
<div class="footer" @click="shu()">+增加新信息</div>
  </div>
</template>

<script>
import Config from '../../config/config.vue'
export default {
  name: 'order',
  data () {
    return {
    arr:'',
    did:'',
    dd:'',
    key:''
    }
  } ,created:function(){
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
      this.dd=getvalue("type")
      var did=getvalue("id");
       this.key=getvalue("key");
        this.did=did
   var xid=sessionStorage.getItem('xid');
          this.$http.get(Config.api.poper,{params:{'X-SESSION-ID':xid},headers:{'X-SESSION-ID':xid}}).then(
                      function(response){
                       console.log(response.data.data)
                       this.arr=response.data.data

                }, function(response){
                    // 响应错误回调
                })
  } ,methods:{
    shu(){
       var hid=this.did
      this.$router.replace('/Ad?type='+hid+'&ui='+this.dd+'&key='+this.key);
    },

    cc(hid){
       if(this.dd==2){
         this.$router.replace('/Page')
      }
     if(this.dd==1){
         this.$router.replace('/Bzfu?id='+this.did+'&page='+hid+'&type='+this.dd+'&key='+this.key)
      }else{
      var id=this.did
      this.$router.replace('/Zfu?id='+id+'&type='+hid);
       console.log(id)}
    },
    go(id){

      var hid=this.did
        this.$router.replace('/Add?id='+id+'&type='+hid+'&ui='+this.dd+'&key='+this.key);
    },
    end(id){
      var xid= sessionStorage.getItem('xid');
      this.$http.post(Config.api.end,{contactId:id},{headers:{'X-SESSION-ID':xid}}).then(
      function(response){
       console.log(response.data)
      if(response.data.code==0){
        alert("删除成功");
         this.$http.get(Config.api.poper,{params:{'X-SESSION-ID':xid},headers:{'X-SESSION-ID':xid}}).then(
      function(response){
       console.log(response.data.data)
       this.arr=response.data.data

}, function(response){
    // 响应错误回调
})
      }

}, function(response){
    // 响应错误回调
})
    }
  }

}
</script>
<style scoped>
.order{
  padding-bottom: 2.5rem;
}
.box{
  width: 100%; height: 2rem;
}
.bull img{
  width:1.05rem; height: 1.05rem;
  float: right;
  margin:0.5rem 0.7rem
}
li{
  list-style: none;
}
.bull{
  width: 100%; height:10.3rem;
  background: #fff;
}
.bull ul{
   width: 17.25rem;
  padding-top: 0.3rem;
  margin:0 auto;
  border-bottom: 1px solid #ededed;
}
.bull li{

  height: 1.875rem;
  line-height: 1.875rem;
  font-size: 0.75rem;

  color: #666;
}
.bull span{
  padding-right: 0.4rem;
}
.footer{
  width: 100%;
  height:2.5rem;
   text-align: center;
  line-height:2.6rem;
  position: fixed;
  bottom: 0;
  background: #4ab6b5;
  color: #fff;
  font-size:0.75rem;
}
.bg{
  background: #ededed;
  width: 100%;
  height: 0.5rem;
}
  .hello{width: 100%; height: 100%;background: #69c4ab}

</style>
