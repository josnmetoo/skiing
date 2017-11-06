
<template>
  <div class="h" >
  <ul class="nav1">
    <span></span>
      <li v-for="(relation,index) in relations"  v-on:click="relationClick(index)" v-bind:class="{checked:index==nowIndex}" v-bind:id="relation.id"  ><!-- <router-link  :to="relation.url" > -->{{relation.text}}
                   
      <!-- </router-link> --></li>
    </ul>


  
 
 <div class="text" transition="bounce"><!--内容显示点击那一个显示那一个-->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>

    </div>
  </div>
  
</template>

<script>

import Config from '../../config/config.vue'
import Teacher from '.././page/teacher.vue'
import Class from '.././page/classes.vue'
export default {
 
  data () {
    return {
      arr:'', 
      relations: [ 
   {text:'教练',id:'program',url:'/Teacher'}, 
   {text:'班课',id:'person',url:'/Class'}, 
  
  ], 
  nowIndex:0, 
    }
  },created:function(){

  }, mounted:function () {
   
    document.title="我的收藏";
      //console.log(this.nowIndex)
      
    
  },
  methods:{
     relationClick:function(index){

      //this.$router.replace(url)
      console.log(this.nowIndex)
       this.$router.replace(this.relations[index].url)
   this.nowIndex=index; 
  } 
  }
}
</script>
<style scoped>
a{
display: block;
width: 100%; height: 100;
}
.checked{ 
 color: #4ab6b5;
 }
 a{
  color: #bcbcbc;
 }
.nav1{
  width: 100%;
  height: 2.25rem;
  background: #fff;
  display: flex;
   position: relative;
 }
 li{
  list-style: none;
 
 }
 ul span{
  position: absolute;
  height: 40%;
  border: 1px solid #ededed;
left: 50%;/*配合margin-left的负值实现水平居中*/ margin-left: -0.5px;/*值的大小等于元素宽度的一半*/ top:30%;/*配合margin-top的负值实现垂直居中*/ margin-top: -0.5px;


 }
 .nav1 li{
  flex: 1;
  text-align: center;
  line-height: 2.35rem;
  font-size: 0.7rem;
 }
</style>
