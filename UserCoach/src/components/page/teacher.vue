  <template>
    <div class="h">
   <div class="ceng" v-show="bb"  @click="bk()">
    <div class="xuo">
      <p>你想选择的学习类型</p>
      <span v-for="vul in length" v-if="vul.serviceType==0" @click="dan(vul.monomerId)" >
        单板
      </span>
       <span v-for="vul in length" v-if="vul.serviceType==1" @click="shua(vul.monomerId)" >
        双板
      </span>
    </div>
   </div>
<div class="ceng" v-show="bbg"  @click="bk1()">
    <div class="xuo">
      <p>你想选择的学习类型</p>
      <span   @click="dan1()" >
        单板
      </span>
       <span  @click="shua1()" >
        双板
      </span>
    </div>
   </div>
  <ul>
  <li  v-show="ss=uu" class="huo">
    暂无收藏
  </li>
        <li v-for="val in arr" @click="qu(val.coachId,val.type,val.skateboardType,val.aloneONE,val.aloneTWO)">
          <div class="list">
          <img class="img" :src="val.curl">
          <p class="p1">
           {{val.cname}}
          </p>
          
          <p class="p3">
            <img src="../../assets/pingfen.png" alt="">
            <span class="sp1">{{val.score}}分</span>
            <img class="xuxi" src="../../assets/xuxi.png" alt="">
            <span class="sp1">{{val.creserve}}次</span>
            <span class="sp2"><b>¥{{val.cprice}}</b>
            <span class="qi">起</span></span>
          
          </p>
          <p class="p2">
            <span v-for="vue in val.clable">{{vue.lname}}</span>
          </p>
          </div>
        </li>
      </ul>
    

    </div>
    
  </template>

  <script>

  import Config from '../../config/config.vue'

  export default {
   
    data () {
      return {
        arr:'',
        ueid:'' ,
        ss:false,
        bb:false,
        length:'',
        bid:'',
        uu:false,
        bbg:false,
        one:'',
        two:''
       }
    },created:function(){
      this.ueid=sessionStorage.getItem('xid');
              this.$http.get(Config.api.list,{params:{type:0},headers:{'X-SESSION-ID':this.ueid}}).then(
        function(response){
         ///console.log(response.data.data)
        this.arr=response.data.data
         if(this.arr.length==0){
            this.uu=true;
          }
  }, function(response){
      // 响应错误回调
  })
    }, mounted:function () {
     
     
        
        
      
    },
    methods:{
      qu(id,type,yuck,oneid,twoid){
        if(type==1){
          if(yuck==2){
             this.bbg=true;
             this.one=oneid;
             this.two=twoid;
           }else{
            if(yuck==0){//单板一对一
               this.$router.push('/one?id='+oneid);
            }else if(yuck==1){
              this.$router.push('/one?id='+twoid);
            }
          
           }
        }else{
          this.$http.get(Config.api.listone,{params:{sessionId:this.ueid,coachId:id,},headers:{'X-SESSION-ID':this.ueid}}).then(
        
        
        function(response){
         console.log(response.data.data.length)
        if(response.data.data.length==1){
          this.$router.push('/Xqy?id='+id+'&type='+response.data.data[0].monomerId);
        }
         if(response.data.data.length==2){
          this.length=response.data.data
          console.log(this.length)
          this.bid=id
          this.bb=true
           // this.$router.push('/Xqy?id='+id+'&type='+response.data.data.monomerId);
        }
  }, function(response){
      // 响应错误回调
  })
        }
         
      },
      bk(){
        this.bb=false
      },
       bk1(){
        this.bbg=false
      },
      dan(id){
        this.$router.push('/Xqy?id='+this.bid+'&type='+id)
      },
      shua(id){
        this.$router.push('/Xqy?id='+this.bid+'&type='+id)
      },
      dan1(id){
        this.$router.push('/one?id='+this.one)
      },
      shua1(id){
        this.$router.push('/one?id='+this.two)
      }
    } 
    
  }
  </script>
  <style scoped>
  .huo{
    color: #666;
    font-size: 0.75rem;
    text-align: center;
  }
  .xuo{
    position: absolute;
    background: #fff;
    border-radius: 5px;
   width:14rem; 
   height: 9.5rem;
    border: 1px solid #ededed;
  left: 50%;/*配合margin-left的负值实现水平居中*/ 
  margin-left: -7rem;/*值的大小等于元素宽度的一半*/ 
  top:50%;/*配合margin-top的负值实现垂直居中*/ 
  margin-top: -4.75rem;

  }
  .xuo p{
    margin-top:2.5rem ;
    width: 100%;
    text-align: center;
    color:#4ab6b5;
    font-size:0.75rem; 
    margin-bottom: 2.8rem; 
  }
  .xuo span{
  font-size: 0.7rem;
   width: 5rem;
   height: 2rem;
   background: #4ab6b5;
   color: #fff;
   border-radius: 1rem;
   margin:0 1rem;
   float: left;
   text-align: center;
   line-height: 2.05rem;
  }
  .ceng{
    position: fixed;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    top: 0;
    left: 0
  }
  .sp2{
    float: right;
    margin-right: 0.75rem;
    font-size: 0.6rem;
    
  }

  ul{
      
    }
    li:nth-last-child(1){
      margin-bottom: 3rem;
     
    }
  .p3 .xuxi{
    width: 0.65rem;
    height: 0.6rem;
  }
  .sp2{
    color: #fd8589;
    font-size: 0.65rem;
  }
  .sp1{
    font-size: 0.55rem;
    color: #8c8c8c
  }
  p{
    float: right;
    width: 78%;
  }
  .p1{
    font-size: 0.75rem;
    color: #666;
    margin-top: 1rem;
  }
  .p2{
    
    color: #b2b2b2;
    font-size: 0.5rem;
    overflow: hidden;
    height: 0.95rem;
    margin-top:-0.2rem;
  }
  .p2 span{
    background: #ededed;
    padding: 0.1rem 0.17rem 0.09rem 0.17rem;
    margin-right: 0.3rem;
    float: left;
    margin-bottom: 0.2rem;
  }
  .p3 img{
   width:0.6rem; height: 0.6rem; 
   margin-top:0.13rem;
   padding-left: 0.1rem;

  }
  .sp2 span{
    font-size: 0.5rem;
  }
  .sp2 b{
    font-size: 0.7rem;
  }
  .p3 span{
    padding-bottom: 0.7rem;
  }
  li{
    list-style: none;
   
  }
  .list{
         height: 5rem;
      /* border-bottom: 1px solid #efefef; */
      overflow: hidden;
      /* margin-left: 0.625rem; */
      padding-left: 0.625rem;
      background: #fff;
      margin-bottom: 0.3rem;
  }
  img{ vertical-align: middle; }
  .bd{
    width: 100%;
    height: 2rem;
  }
      .h {
       width: 100%;
       
  float: right;
  margin-top:0.5rem;

      }
      .list .img{
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
         margin-top:0.875rem;
        float: left;
        margin-top: 0.9rem;
       
      }
      .hua{
        width: 100%;
        position: relative;
        background: #fff;
      }
  </style>
