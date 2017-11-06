<template>
<!-- <h1 @click="login()">这是登录页面，点我登录</h1> -->



  <div class="btn" >

 <div class="conent" v-for="val in arr">
    <ul @click.stop.prevent="goDetail(val.grid,val.mrid,val.type,val.ustatus,val.oid,val.aloneReserveid)">
    <li class="one" v-if="val.type==2">
        <span class="sp1">服务项目：</span>
      
        <span class="sp2" >{{val.types}}</span>
       
      </li>
      <li class="one" v-else> 
       <span class="sp1">服务项目:</span>
      <span class="sp2" v-if="val.stype==0 ||val.type==4">{{val.scon}}</span>
        <span class="sp2" v-if="val.stype==1">{{val.gname}}</span>
       
      </li>

       <li class="two" v-if="val.type==2">
        <img src="../../assets/day.png" alt=""/>
        <span>期限：</span>
        <span >{{val.ctime | formatDate}}</span>
       </li>
      <li v-else class="two">
        <img src="../../assets/day.png" alt=""/>
       <span v-if="val.stype==0 || val.type==4">{{val.stime | formatDate}} </span>
        <span v-if="val.stype==1">{{val.stime | formatDate}} -{{val.etime | formatDate}}</span>

      </li>
      <li class="three">
        <img src="../../assets/wei.png"alt=""/>
        <span>雪场：</span>
        <span>{{val.sname}} </span>
        <span v-if="val.type==2">{{val.siteName}} </span>
      </li>
       <li class="four" v-if="val.type==2">
        <img src="../../assets/mau.png" alt=""/>
        <span>版型：</span>
        <span>{{val.skateName}}</span>
      </li>
      <li v-else class="four">
        <img src="../../assets/man.png" alt=""/>
        <span>教练：</span>
        <span v-if="val.stype==0 ||val.type==4">{{val.cname}}</span>
        <span  v-if="val.stype==1">{{val.coachname}}</span>
      </li>

    </ul>
  </div>


<p style="text-align:center;color:#dedede;font-size:0.9rem;margin-top:1rem;" v-show="this.arr.length == 0">暂无数据</p>
    <diV class="bgh"></diV>
  </div>


</template>

<script>
import Config from '../../config/config.vue'
import {formatDate} from '../../libs/data.js';
export default {
  data() {
    return{
      arr:''
    }
  },filters: {
        formatDate(time) {
          var date=new Date(time)
            return formatDate(date, 'yyyy/MM/dd');
        }},
        created:function(){
    var xid= sessionStorage.getItem('xid');
    console.log(xid)
       this.$http.get(Config.api.look,{params:{type:4},headers:{'X-SESSION-ID':xid}}).then(
              function(response){
              if(response.data.code==0){
                    this.arr=response.data.data

               console.log(this.arr)
                }
        }, function(response){
            // 响应错误回调
        })
  },
  methods:{
   goDetail(gid,mid,type,ustatus,xx,aloneReserveid){
var id;
        if(type==0){
            id=mid
          }
           else if(type==1){
            id=gid
           }
           else if(type==2){
            id=xx
           }else if(type==4){
            id=aloneReserveid
           }
        console.log(xx)
        
        var obj = {};
        obj.id = id;
        obj.type = type;
        obj.payType = 0;
        obj.ustatus = ustatus;
        obj = JSON.stringify(obj);
console.log(obj)
        var storage = sessionStorage.setItem("orderidT",obj);
        this.$router.push('/Detail');
      }
  }


}
</script>

<style scoped>
.bgh{
 width:100%;
 height: 2rem;
}
.conent{
  margin-top: 0.5rem;
}
.five span{
  float: right;
  width: 4.125rem; height:1.55rem;
  text-align: center;
  line-height: 1.55rem;
   background: #fc5c62;
   color: #fff;
   border-radius: 5px;
}
.conent li img{
  width: 0.75rem; height: 0.8rem;
   margin-right: 0.8rem;
   float: left;
   margin-top: 0.4rem
}
.conent{
  width: 100%;
  height: 6.8rem;
  background: #fff;
  border-radius: 10px;
}
  li{
    list-style: none;
    overflow: hidden;
    line-height: 1.6rem;
    font-size:0.75rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .one{
    font-size:0.75rem;

  }
  .one .sp1,.sp2{
    float: left;

  }
  .one .sp3{
    float: right;
    color: #daf0ea
  }

</style>
