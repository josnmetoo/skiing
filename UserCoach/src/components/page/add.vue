<template>
  <div class="hello">
  <div class="bg"></div>
   
    <ul class="touba">
      <li>
       <span>预约人:</span>
        <input type="text" class="in1" v-model="arr.un" ></input>
         <span>预约电话:</span>
        <input class="in" type="text" v-model="arr.cph"></input>
      </li>
      <li>
        <span>投保人:</span>
        <input type="text" class="in1" v-model="arr.cn"></input>
         <span>投保人证件号:</span>
        <input class="in" type="text" v-model="arr.cnum"></input>
      </li>
    </ul>
      
    <div class="footer" @click="add(arr.un,arr.cph,arr.cn,arr.cnum)" >
     <img src="../../assets/tijiaokuang.png" class="tij">保存</div>
   
</div>
</template>
<script>
import Config from '../../config/config.vue'

export default {
  name: 'hello',
 
  data () {
    return {
       arr:{un:'',cn:'',cnum:'',cph:''}, 
       uid:'',
        ui:'',
        key:''
    }
  },created:function(){
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
      
      var uid=getvalue("type");
      this.ui=getvalue("ui"); this.key=getvalue("key");
        this.uid=uid
  },methods:{
      add(a,b,c,d){
        var xid= localStorage.getItem('xid');
          this.$http.post(Config.api.add,{userName:a,contactsName:c,contactsNumber:d,contactsPhone:b},{headers:{'X-SESSION-ID':xid}}).then(
            function(response){
            if(response.data.data==0){
              alert("保存成功")
            }
            
            this.$router.replace('/Order?id='+this.uid+'&type='+this.ui+'&key='+this.key);
      }, function(response){
          // 响应错误回调
      })
     }
  }
}
</script>

<style scoped>
.footer{
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
.footer img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #000; opacity:0.1; 

}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #000;opacity:0.1;
}

input:-ms-input-placeholder{
    color: #000;opacity:0.1;
}

input::-webkit-input-placeholder{
    color: #000;opacity:0.1;
}
.touba .in1{
  width: 13rem;
  margin-left: 1.5rem;
}
.touba ul{ padding:0.5rem 0;  }
li{ list-style: none; }
.touba{
  font-size: 0.75rem;
  width: 100%;
  background: #fff;
  padding: 0.4rem 0
}
.touba li{
  width:17.25rem;
  height: 3.8rem; 
  margin: 0 auto;
  line-height: 2rem;
}
.touba span{
  line-height:1.5rem;
  color: #666 
}
.touba input{
 height: 1.1rem;
 width: 11rem;
 margin-left: 0.8rem;

}

input{

outline:none;

border:none;

}
.bg{
  background: #ededed;
  width: 100%;
  height: 0.5rem;
}
  .hello{width: 100%; height: 100%;background: #69c4ab}

</style>
