<template>
  <div class="btn"  >
  <div class="conent" v-for="val in arr">
    <ul @click.stop.prevent="goDetail(val.grid,val.mrid,val.type,val.ustatus,val.oid,val.aloneReserveid)">
      <li class="one" v-if="val.type==2">
        <span class="sp1">服务项目：</span>
      
        <span class="sp2" >{{val.types}}</span>
        <span class="sp3">{{val.ustatus | stateFilte}}</span>
      </li>
      <li class="one" v-else>
        <span class="sp1">教练预约：</span>
      <span class="sp2" v-if="val.stype==0 ||val.type==4">{{val.scon}}</span>
        <span class="sp2" v-if="val.stype==1">{{val.gname}}</span>
        
        <span class="sp3">{{val.ustatus | stateFilte}}</span>
      </li>

       <li class="two" v-if="val.type==2">
        <img src="../../assets/rili.png" alt=""/>
        <span>时间：</span>
        <span >{{val.ctime | formatDate}}</span>
       </li>
       <li v-else class="two">
        <img src="../../assets/rili.png" alt=""/>
        <span v-if="val.stype==0 ||val.type==4">{{val.stime | formatDate}} </span>
        <span v-if="val.stype==1">{{val.stime | formatDate}} - {{val.etime | formatDate}}</span>
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
        <span  v-if="val.stype==1">{{val.cname}}</span>
       </li>
     
      <li class="five">
        <span v-if="val.ustatus==5" :class="{b:true}" @click.stop.prevent="pass(val.type,val.mrid,val.grid,val.ustatus,val.oid,val.aloneReserveid)">取消预定</span>
        <span v-if="val.ustatus==4" :class="{c:true}" @click.stop.prevent="pass(val.type,val.mrid,val.grid,val.ustatus,val.oid,val.aloneReserveid)">取消预定</span>

      </li>
    </ul>
  </div>
  <p style="text-align:center;color:#dedede;font-size:0.9rem;margin-top:1rem;" v-show="this.arr.length == 0">暂无数据</p>
    <div class="bgh"></div>
  </div>


</template>

<script>
import Config from '../../config/config.vue'

import {formatDate} from '../../libs/data.js';

export default {
  data() {
    return{
      f:true,
      arr:'',
      hh:'',
      t:false,
      b:false
    }
  },filters: {stateFilter(value){
            let res='';
            switch(value){
                case "4":
                    res="取消预定";
                    break;
                case "5":
                    res="服务中";
                    break;

                }
            return res;
        },
        stateFilte(value){
            let res='';
            switch(value){
                case "4":
                    res="待服务";
                    break;
                case "5":
                    res="服务中";
                    break;

                }
            return res;
        },
        formatDate(time) {
          var date=new Date(time)
            return formatDate(date, 'MM.dd');
        }},created:function(){



  }, mounted:function(){

    var xid= sessionStorage.getItem('xid');
    console.log(xid)


       this.$http.get(Config.api.look,{params:{type:2},headers:{'X-SESSION-ID':xid}}).then(
              function(response){
                this.arr=response.data.data

            }, function(response){
            // 响应错误回调
        })




  },methods: {
    kio(){
    this.$router.push("/Pold")
    },
      pass(type,oid,sid,t,xx,aloneReserveid){

          if(t==5){
            alert("亲已经签到")
            return false
          }

              //alert(this.arr[i].ustatus)
          var em=this
          var id=''
          if(type==0){
            id=mid
          }else
           if(type==1){
            id=gid
           }
           else if(type==2){
            id=xx
           }else if(type=4){
            id=aloneReserveid
           }
          console.log(type)
          console.log(id)
        var xid= sessionStorage.getItem('xid');
        var con = confirm("是否取消预定");
                 if(con == true){
                  this.$http.post(Config.api.pass,{type:type,reserveId:id},{headers:{'X-SESSION-ID':xid}}).then(
                function(response){
                 console.log(response.data)
                  if(response.data.code==0){
                    this.$http.get(Config.api.look,{params:{type:2},headers:{'X-SESSION-ID':xid}}).then(
              function(response){
                this.arr=response.data.data

            }, function(response){
            // 响应错误回调
        })

                 }else{
                  alert('该订单不能取消')
                 }
          }, function(response){
              // 响应错误回调
          })

        }
      },
      goDetail(gid,mid,type,ustatus,xx,aloneReserveid){
var id;
        if(type==0){
            id=mid
          }else
           if(type==1){
            id=gid
           }
           else if(type==2){
            id=xx
           }else if(type=4){
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
  width: 100%;
  height: 2rem;
}
.b{
   background: #ededed;
 float: right;
  width: 4.125rem; height:1.55rem;
  text-align: center;
  line-height: 1.55rem;

   color: #fff;
   border-radius: 5px;
}
.five{
  margin-top: -1.7rem;
}

.c{
 background: #fc5c62;
 float: right;
  width: 4.125rem; height:1.55rem;
  text-align: center;
  line-height: 1.55rem;

   color: #fff;
   border-radius: 5px;
}
.u{
  background: #666;
  float: right;
  width: 4.125rem; height:1.55rem;
  text-align: center;
  line-height: 1.55rem;
   color: #fff;
   border-radius: 5px;
}
.n{
  background:#ccc;
}
.conent{
  margin-top: 0.5rem;
}
.five span{
  float: right;
  width: 4.125rem; height:1.55rem;
  text-align: center;
  line-height: 1.7rem;

   color: #fff;
   border-radius: 5px;
}
.conent li img{
  width: 0.75rem; height: 0.8rem;
   margin-right: 0.8rem;
   float: left;
   margin-top: 0.28rem
}
.conent{
  width: 100%;
  height: 6.7rem;
  background: #fff;
  border-radius: 10px;
}
  li{
    list-style: none;
    overflow: hidden;
    line-height: 1.6rem;
    font-size:0.75rem;
    margin-left: 1rem;
    margin-right: 0.8rem;
  }
  .one{
    font-size:0.75rem;

  }
  .one .sp1,.sp2{
    float: left;

  }
  .one .sp3{
    float: right;
    color: #4ab6b5
  }
.conent .two img{
  margin-top: 0.3rem
}
</style>
