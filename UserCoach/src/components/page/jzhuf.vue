<template>
  <div class="h">
   <div class="ceng" v-show="ss"  @click="bk()">
  <div class="xuo">
    <p class="tattle">卡片类型</p>
    <p class="time">时间</p>
    <p class="nue">
       <span class="tme" v-for="(val,index) in time" v-bind:class="{checked:index==nowIndex}" v-on:click.stop="relationClick(index)">{{val}}</span>
    </p>
  
  </div>
 </div>
  <div class="ceng" v-show="sl"  @click="bu()">
  <div class="xuo" >
    <p class="tattle">雪板类型</p>
 
    <p class="nue lei">
       <span class="tme" v-for="(val,index) in lei" v-bind:class="{checked:index==Index}" v-on:click.stop="plick(index)">{{val}}</span>
    </p>
  </div>
   <div class="xuo" v-if="arr.cardpeopletype==2">
    <p class="tattle">雪板类型</p>
 <p class="time type">成人</p>
    <p class="nue ">
       <span class="tme" v-for="(val,index) in lee" v-bind:class="{checked:index==Index}" v-on:click.stop="lick(index)">{{val}}</span>
    </p>
    <p class="time type">儿童</p>
    <p class="nue ">
       <span class="tme" v-for="(val,index) in lee" v-bind:class="{checked:index==con}" v-on:click.stop="olick(index)">{{val}}</span>
    </p>
  </div>
 </div>
   <div class="bg"></div>
   <ul>
     <li class="nn">
       <span class="sp1">使用场地</span>
       <span class="sp2" v-for="val in arr.sites">{{val.name}}</span>
     </li>
      <li class="nn nk">
       <span class="sp1">使用时长</span>
       <span class="sp2">{{arr.useday}}天</span>
     </li>
     <div class="bg"></div>
       <li class="nn" @click="kai()">
       <span class="sp1">卡片类型</span>
        <img class="img" src="../../assets/lol.png">
       <span class="sp2">{{ping}}{{ren}}</span>
      
     </li>
      <li class="nn" @click="zou()">
       <span class="sp1">雪板类型</span>
       <img class="img" src="../../assets/lol.png">
       <span class="sp2" v-if="con!==-1 &&Index!==-1">成人{{ban}}&nbsp;儿童{{ban1}}</span>
       <span v-else class="sp2">{{ban}}</span> 
       
     </li>
      <li class="nn nk" v-if="arr.cardpeopletype!=='2'">
       <span class="sp1">购买数量</span>
       <img @click="jia()"  class="img img1" src="../../assets/jia.png">
       <span class="sp2 sp3">&nbsp; {{j}} 张 &nbsp;</span>
        <img @click="jin()" class="img img1" src="../../assets/jian.png">
     </li>
   </ul>
   <div class="footer" >
   <span class="deng"> 待支付:</span>
<span class="zf">
 ¥ {{k}}
</span><span class="xx">{{'x'+j}}</span>
        <span class="zf1" >
     
          <span @click="misseb()">提交订单</span>
        </span>
</div>
  </div>
  
</template>

<script>

import Config from '../../config/config.vue';
export default {
 
  data () {
    return {
      arr:'',//卡的内容
      lee:["单板","双板"],
      lei:["单板","双板","全部"],
      j:1,
      k:1999,
      ss:false,
      time:["全季","平日"],
      type:["成人","儿童","亲子"],
      nowIndex:-1,
      noe:-1,
      ck:2,
      ping:'',
      ren:'',
      Index:-1,
      sl:false,
      ban:'',
      con:-1,
      arr2:'',
      xid:'',
      cardcategoryid:'',
      cidtype:''
    }
  },created:function(){
      this.xid= sessionStorage.getItem('xid');
        document.title="提交订单";
      $(document).scrollTop(0,0);
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
          this.k=response.data.data.minprice
        }

}, function(response){
    // 响应错误回调
})          
                //价格
            
             
  },
  updated:function(){

  },
  methods:{
  jin(){
    if(this.j>1){
       this.j=this.j-1
     }else{
      //alert(1)
      return;
     }
   
  },
  jia(){
   // alert(this.j)
    this.j=this.j+1
  },
  kai(){
    this.ss=true;
  },
  bk(){
    this.ss=false
  },
   relationClick:function(index){
      this.ss=false;      
   this.nowIndex=index;
   this.ping=this.time[index];
    if(this.cidtype==2){
       this.$http.get(Config.api.price,{params:{cardid:this.carid,cardtype:index,
                            skateboardtype:''
                }}).then(
      function(response){
        if(response.data.code==0){
          this.arr2=response.data.data
          this.k=response.data.data.price
          this.cardcategoryid=response.data.data.cardcategoryid
        }

}, function(response){
    // 响应错误回调
})
    }else{
       this.$http.get(Config.api.price,{params:{cardid:this.carid,cardtype:index,
                            skateboardtype:  this.Index
                }}).then(
      function(response){
        if(response.data.code==0){
          this.arr2=response.data.data
          this.k=response.data.data.price
          this.cardcategoryid=response.data.data.cardcategoryid
        }

}, function(response){
    // 响应错误回调
})
    }
    
              
            
    
  },
  rela(index){
     this.noe=index;
      this.ren=this.type[index]
       if(this.carid==2){
      index=""
    }
       this.$http.get(Config.api.price,{params:{cardid:this.carid,cardtype:this.nowIndex,
                            skateboardtype:index                    
                }}).then(
      function(response){
       
   this.arr2=response.data.data;
    this.k=response.data.data.price
     this.cardcategoryid=response.data.data.cardcategoryid
}, function(response){
    // 响应错误回调
})
     // if(index==2){//根据是否是亲子卡去设置状态
     // this.ck=1
     // }else{
     //  this.ck=2
     // }
  },
  plick(index){
    this.sl=false
    this.Index=index;
    this.ban=this.lei[index];
     if(this.carid==2){
      index=""
    }
     this.$http.get(Config.api.price,{params:{cardid:this.carid,cardtype:this.nowIndex,
                            skateboardtype:index                    
                }}).then(
      function(response){
       
   this.arr2=response.data.data;
    this.k=response.data.data.price
     this.cardcategoryid=response.data.data.cardcategoryid
}, function(response){
    // 响应错误回调
})
   
  },
  lick(index){
    if(this.con!==-1){
      this.sl=false;
    }
    this.Index=index;
    this.ban=this.lee[index]
    if(this.carid==2){
      index=""
    }
     this.$http.get(Config.api.price,{params:{cardid:this.carid,cardtype:this.nowIndex,
                            skateboardtype:index                    
                }}).then(
      function(response){
       
   this.arr2=response.data.data;
    this.k=response.data.data.price
     this.cardcategoryid=response.data.data.cardcategoryid
}, function(response){
    // 响应错误回调
})
  },
  zou(){
    this.sl=true;
  },
  bu(){
    this.sl=false;
  },
  olick(index){
     if(this.Index!==-1){
      this.sl=false;
    }
    this.con=index
    this.ban1=this.lee[index]
    if(this.carid==2){
      index=""
    }
     this.$http.get(Config.api.price,{params:{cardid:this.carid,cardtype:this.nowIndex,
                            skateboardtype:index                    
                }}).then(
      function(response){
       
   this.arr2=response.data.data;
    this.k=response.data.data.price
     this.cardcategoryid=response.data.data.cardcategoryid
}, function(response){
    // 响应错误回调
})

  },
  misseb(){
  
      this.$http.post(Config.api.scar,{cardcategoryid:this.cardcategoryid,
                                          skateboardchild:this.con,
                                          skateboardadult:this.Index,
                                          count:this.j
                                        },{headers:{'X-SESSION-ID':this.xid}}).then(
                function(response){
                  if (response.data.code==0) {
                    this.$router.replace("/Mue?oid="+response.data.data.orderid)
                  }else{
                    alert("提交订单失败")
                  }

}, function(response){
    // 响应错误回调
})
        
  }
  }
}
</script>
<style scoped>
.footer .xx{
  font-size: 0.65rem;

}
.nue .checked{
  background: #44b6b6;
  color: #fff;
}
.nue{
  overflow: hidden;
  margin-left: 0.6rem;
}
.nue span{
  float: left;
  font-size: 0.7rem;
  padding:0.42rem 1.3rem 0.38rem 1.3rem;
  background: #ededed;
  border-radius:1.7rem;
 margin: 0.5rem 0.3rem;
 color: #ccc;
}

.tattle{
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
  margin-top: 0.75rem;
  color: #333;
}
.time{
  font-size: 0.7rem;
  color: #333;
  margin:0.8rem 0 0 1.625rem ;
}
.type{
  margin-top:0.3rem;
}
.img{
  float: right;
  width:0.35rem; 
  height: 0.6rem;
  margin-top: 0.95rem;
  margin-left: 0.7rem;
}
.img1{
  width:1.5rem;
  height: 1.5rem;
  margin:0;
  margin-top: 0.5rem; 

}
.lei{
  margin-top:1rem;
}
.deng{
  font-size: 0.75rem;
  margin-left: 1.5rem;
}
.sp1{
  font-size: 0.7rem;
  color: #666;
}
.nk{
  border: none;
}
.sp2{
  float: right;
  font-size: 0.65rem;
  color: #a3a3a3;
  line-height: 2.6rem;
}
li{
  list-style: none;
  width: 17.4rem;
 
  border-bottom:1px solid #ededed;
  height: 2.5rem;
  line-height: 2.55rem;
  overflow: hidden;
  margin-left: 0.6rem;
padding-right: 1rem;
}
.h{
  background: #fff;
  overflow: hidden;
}
.bg{
  width: 100%;
  height: 0.5rem;
  background: #ededed;
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

  font-size: 0.9rem;
  color: #fc5c62;
  font-weight: 600;
}
.footer .zf1{
      width: 6rem;
    /* height: 2rem; */
    height: 100%;
    float: right;
    /* margin-right: 0.75rem; */
    font-size: 0.75rem;
    /* border-radius: 5px; */
    text-align: center;
    /* margin-top: 0.2rem; */
    background: #fc5c62;
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
line-height: 2.78rem;
}
.zf span{
  font-size: 0.55rem;
  font-weight: normal;
} 
.sp3{
  font-weight: bold;
  color: #41b6b5;
}
.ceng{
  position: fixed;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
  z-index: 100
}
.xuo{
  position: absolute;
  background: #fff;
  border-radius: 5px;
 width:14.875rem; 
 height: 14.375rem;
  border: 1px solid #ededed;
left: 50%;/*配合margin-left的负值实现水平居中*/ margin-left: -7.4375rem;/*值的大小等于元素宽度的一半*/ top:50%;/*配合margin-top的负值实现垂直居中*/ margin-top: -8.3rem;

}
</style>
