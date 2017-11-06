
  <template >
    <div class="h ">
      <p  v-show="ss=uu" class="qi ">此雪区暂无教练</p>
      <p v-if="bb==true" class="qi ">暂无&nbsp;&nbsp;此教练</p>

      <ul class="listcon" v-show="arr.length!=0">
        <li v-for="value in arr"  @click="ban(value.cid,value.monomerid,value.serviceType,value.type,value.aloneid)">
          <div class="list">
            <img class="img" :src="value.curl" alt="">
            <p class="p1">
              {{value.cname}}
            </p>
            <p class="p2">
              <span v-for="val in value.clable">{{val.lname}}</span>
            </p>
            <p class="p3">
              <img src="../../assets/pingfen.png" alt="">
              <span class="sp1">{{value.score}}分</span>
              <img src="../../assets/xuxi.png" alt="">
              <span class="sp1">{{value.creserve}}次</span>
              <span class="sp2">¥<b>{{value.cprice*0.01}}</b></span>
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
        uu:false,
        arr:'',
        obj:'',
        cun:{},
        id:'',
        xid:'',
        nul:null,
        bb:false,
      }
    },created:function(){
      // console.log(this.me)
      var id=localStorage.getItem('regionId')
      this.id=id
      // alert(id)
      var xid=sessionStorage.getItem('xid')
      this.xid=xid
      if(id==null){
        this.$http.get(Config.api.infos).then(
          function(response){
            var res=response.data.data;
            this.arr2=res
      console.log(response)// 响应成功回调
      this.id=this.arr2[4].id
      //alert(this.arr2[4].id)
      this.$http.get(Config.api.sinf,{params:{regionId:this.id, serviceType:1}}).then(
        function(response){
          this.arr=response.data.data
          //console.log(response.data)
          if(this.arr.length==0){
            this.uu=true;
          }
        }, function(response){
      // 响应错误回调
    })
    }, function(response){
      // 响应错误回调
    })
      }else{
        this.$http.get(Config.api.sinf,{params:{regionId:this.id, serviceType:1}}).then(
          function(response){
            this.arr=response.data.data
          //console.log(response.data)
          if(this.arr.length==0){
            this.uu=true;
          }
        }, function(response){
      // 响应错误回调
    })
      }
    },updated:function(){
      if(window.location.hash=='#/home/end'){
       var timep=10;
       var that=this
       $('.foo').on('click',function(){
         window.clearTimeout(that.nul)
         that.nul=window.setTimeout(function () {
          that.$http.post(Config.api.sou,{
            labelIds:[],
            regionId:that.id,
            sex:that.cun.sex,
            serviceType:1,
            coachName:that.cun.name,
            beginTime:that.cun.time,
            count:that.cun.day,
            rankIds:that.cun.car
          },{headers:{'X-SESSION-ID':that.xid},emulateJSON:false}).then(
          function(response){
           console.log(response)
                               // alert(response.data.code)
                               if (response.data.code==0) {
                                 that.arr=response.data.data
                                  if(this.arr.length==0){

          that.bb=true;
        }else{
          that.bb=false
        }
                              }
                            }, function(response){
                                  // 响应错误回调
                                })
          ,timep})
         console.log(that.cun)
       });
       $(document).keydown(function(event){
        if(event.keyCode == 13) {
         var name=$('.inp1').val();
         that.cun.name=name
         window.clearTimeout(that.nul)
         that.nul=window.setTimeout(function () {
          that.$http.post(Config.api.sou,{
            labelIds:[],
            regionId:that.id,
            sex:that.cun.sex,
            serviceType:1,
            coachName:that.cun.name,
            beginTime:that.cun.time,
            count:that.cun.day,
            rankIds:that.cun.car
          },{headers:{'X-SESSION-ID':that.xid},emulateJSON:false}).then(
          function(response){
           if (response.data.code==0) {
             that.arr=response.data.data
             if(this.arr.length==0){

          that.bb=true;
        }else{
          that.bb=false
        }
            console.log(that.arr)
          }
        }, function(response){
                      // 响应错误回调
                    }),timep})
       }
     });
     }
     this.cun.car=[]
     var that=this
     var name=$('.inp1').val();
     that.cun.name=name
     var oBox=document.querySelector('.ui')
     var oBox2=document.querySelector('.ui4')
     var oBox1=document.querySelector('.ui2')
     var aSpan2=oBox1.getElementsByTagName('span')
     var aSpan=oBox.getElementsByTagName('span')
     var aSpan3=oBox2.getElementsByTagName('span')
     for(var i=0;i<aSpan.length;i++){
       (function(index){
        aSpan[i].onclick=function(){
         that.cun.time=Date.parse(new Date())
         switch(index){
          case 0:
          that.cun.day=1
          break;
          case 1:
          that.cun.day=3
          break;
          case 2:
          that.cun.day=7
          break;
        }
        if (!$('.ui span').eq(index).hasClass('one')) {
          that.cun.time='';
          that.cun.day='';
        }
        console.log(that.cun)
      }
    })(i)
  }
  for(var i=0;i<aSpan2.length;i++){
   (function(index){
    aSpan2[i].onclick=function(){
      switch(index){
        case 0:
        that.cun.sex=0
        break;
        case 1:
        that.cun.sex=1
        break;
      }
      if (!$('.ui2 span').eq(index).hasClass('one')) {
        that.cun.sex=''
      }
      console.log(that.cun)
    }
  })(i)
  }
  var ay=[];
  var h=true;
  $(".ui4").on('click',"span",function(){
    var jiaindex = $(this).index()+1;
    if($('.ui4 span').eq($(this).index()).hasClass('one')){
      ay.push(jiaindex)
    }else{
      for(var i=0;i<ay.length;i++){
       if (ay[i]==jiaindex) {
        ay.splice(i,1)
      }
    }
  }
  that.cun.car=ay
  })
  },
  methods:{
    ban(id,gid,type,one,oneid){
    localStorage.setItem('fid',gid);
    localStorage.setItem('type',type);
    if(one==1){
      this.$router.push('/one?id='+oneid);
    }else{
     this.$router.push('/Xqy?id='+id+'&type='+gid);
   }
   
   console.log(id)
 }
  }
  }
  </script>

  <style scoped>
   ul{
    background: #fff;
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
    padding-left: 0.5rem;
  }
  .sp1{
    font-size: 0.55rem;
    color: #8c8c8c
  }
  p{
    float: right;
    width: 70%;
  }
  .p1{
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.9rem;
  }
  .p2{
    margin-top:0.18rem;
    color: #b2b2b2;
    font-size: 0.5rem;
    height: 0.9rem;
    overflow: hidden;
  }
  .p2 span{
    background: #ededed;
    float: left;
    padding: 0.08rem 0.17rem 0.07rem 0.17rem;
    margin-right: 0.3rem;
    margin-bottom: 0.15rem;

  }
  .p3{
    margin-top:-0.15rem;
    margin-bottom: 0.4rem;
  }
  .p3 img{
   width:0.6rem; height: 0.6rem;
   margin-top:0.13rem;

    }
  .p3 span{
    padding-bottom: 0.7rem;
  }
  li{
    list-style: none;

  }
  .list{
    border-bottom: 1px solid #efefef;
    overflow: hidden;
    margin-left: 0.625rem;
  }
  img{ vertical-align: middle; }
  .bd{
    width: 100%;
    height: 2rem;
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
  .h {
    width: 13.3rem;
    margin-top: 0.5rem;
    float: right;
  }
  .list .img{
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    margin-top:1.25rem;
    float: left;

  }
  .hua{
    width: 100%;
    position: relative;
    background: #fff;
  }
  .qi{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    font-size: 0.7rem;
    color: #666;
    background: #ededed;
    text-align: center;
    list-style: none;
  }
  .listcon li:last-of-type .list{
   border:none;

  }
  </style>
