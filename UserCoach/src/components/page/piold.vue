<template>
  <div class="so">
  <div class="ss">
    <p class="p1">
      <span class="sp1">订单详情</span>
      <span class="sp2"><b>{{obj.price}}元</b></span>
      <span class="sp3">已支付:</span>
    </p>
    <p class="p2"><span class="sp1">教学项目:</span>
    <span class="sp2">{{obj.stype}}</span>
    </p>
     <p class="p2"><span class="sp1">教学场地:</span>
    <span class="sp2">{{obj.rname}}{{obj.sname}}</span>
    </p>
     <p class="p2"><span class="sp1">教学时间:</span>

    <span class="sp2"  v-if="obj.type==0" v-for='val in obj.times'> {{val.stime | formatDate}}</span>
     <span class="sp2"  v-if="obj.type==1" v-for='val in obj.times'> {{val.stime | formatDate}}-{{val.etime | formatDate}}</span>
        
    </p>
    <p class="p3">
      <span class="s1">预约人:</span>
      <span v-for="vlue in poper">
      <span class="s2">{{vlue.name}}</span>
      <span class="s3">{{vlue.phone}}</span>
      </span>
    </p>
    <p class="p4">
      <span class="s1">备注:</span>
      <span class="s2 ddd">{{obj.text}}</span>
      
    </p>
    <p class="p1 pp "><span class="sp1">注意事项</span></p>
    <p class="p4"><span class="s1">退订:</span>
        <span class="s2">开课前48小时内，不可进行推定操作。<br/>频繁退订将影响您的个人信誉度。</span>
    </p>
   <p class="p4 pp4"><span class="s1">迟到:</span>
        <span class="s2">开课前48小时内，不可进行推定操作。<br/>
        频繁退订将影响您的个人信誉度。</span>
    </p>
  </div>
  <div @click="out" class="li">
    返回
  </div>
  </div>
</template>

<script>
//import
import {formatDate} from '../../libs/data.js';
export default {
  name: 'so',
  data () {
    return {
      obj:'',
      poper:''
     // arr:[]
    }},filters: {
        formatDate(time) {
          var date=new Date(time)
            return formatDate(date, 'yyyy/MM/dd');
        }},created:function(){
      var obj=JSON.parse(localStorage.getItem("res"));
       
        this.obj=obj
         console.log(obj)
         function unique2(array){ 
              var n = {}, r = [], len = array.length, val, type; 
              for (var i = 0; i < array.length; i++) { 
              val = array[i]; 
              type = typeof val; 
              if (!n[val]) { 
              n[val] = [type]; 
              r.push(val); 
              } else if (n[val].indexOf(type) < 0) { 
              n[val].push(type); 
              r.push(val); 
              } 
              } 
              return r; 
          }
          this.poper=unique2(this.obj.peoples)
        // alert(obj.text)
        //$('.ddd').html(obj.texts)
    },
    methods:{
      out(){
       this.$router.push('/home/hot')
      }
     // let url=Config.api.info+id;
      //let parmas={
        //userName:'',
      //  openId:'',
       // cd:'',
    //  }
     // this.$http(url,{method:"POST",body:JSON.stringify(parmas),header:{}}).then((res)=>{
     //     return res.json()
     // }).then((res)=>{
       //   console.log(res)
         // this.arr=res
     // }).then((error)=>{
       //   console.log(error)
     // })
   }
  
}
</script>
<style scoped>
.li{
  width: 80%; height: 2rem;
  margin:0 auto;
  background: #fc5c62;
  color: #fff;
  text-align: center;line-height: 2.1rem;
  font-size: 0.8rem;
  margin-top:1.5rem;

}
  .ss{
    width: 100%;
    background: #fff;
    margin-top: 0.5rem;
  }
  .p1{
    overflow: hidden;
    width: 17.25rem;
    margin:0 auto;
   padding-top: 1rem;
  }
  .p1 .sp1{
    float: left;
    color:#000;
    font-size:0.78rem; 
  }
  .p1 .sp2,.sp3{
    float: right;
  }
  .p1 .sp2{
    font-size: 0.75rem;
    color: #fc5c62;
    line-height: 1.4rem
  }
  .p1 .sp3{
    font-size: 0.6rem;
    line-height: 1.2rem;
    padding-right: 0.4rem;
  }
.p2{
    overflow: hidden;
    width: 17.25rem;
    margin:0 auto;
   padding-top: 0.2rem;
   font-size: 0.7rem;
   margin-bottom: 0.3rem;
  }
  .p2 .sp1{
    color: #666;
    font-size: 0.7rem;
  }
  .p2 .sp2{
    color: #8c8c8c;
    font-size: 0.65rem;
    padding-left: 1rem;
  }
  .p3 {
    width: 15.75rem;
    margin:0.2rem auto;
    font-size: 0.65rem;
  }
  .p3 .s1{
    font-size: 0.7rem;
  }
  .p3 .s2{
    padding-left:1rem;

  }
  .p3 .s3,.s4,.s5{
    margin-left: 2rem;
  }
  .p4 {
    width: 15rem;
    margin: 0.25rem auto;
    font-size: 0.65rem;
    overflow: hidden;
  }
  .p4 .s1{
    font-size: 0.7rem;
    float: left;

  }
  .p4 .s2{
    float: left;
    margin-left: 1.6rem;
    
    line-height: 1.05rem;
  }
  .pp{
    margin-top:-1rem;
  }
  .pp4{
    padding-bottom: 1rem;
  }
</style>