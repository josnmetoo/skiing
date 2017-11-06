<template>
  <div class="h" >
  <ul class="nav1">
    
      <li v-for="(relation,index) in relations"  v-on:click="relationClick(index)" v-bind:class="{checked:index==nowIndex}" v-bind:id="relation.id"  ><!-- <router-link  :to="relation.url" > --><span>{{relation.text}}</span>
                   
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
import Mis from '.././page/mist.vue'
import Nice from '.././page/nice.vue'
export default {
 
  data () {
    return {
      arr:'', 
      relations: [ 
   {text:'未激活',id:'program',url:'/Mis'}, 
   {text:'已失效',id:'person',url:'/Nice'}, 
  
  ], 
  nowIndex:0, 
    }
  },created:function(){

  }, mounted:function () {
   
    document.title="选择季卡";
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

 .nav1 li{
  flex: 1;
  text-align: center;
  line-height: 2.35rem;
  font-size: 0.7rem;
 }
 .checked span{
 	padding-bottom: 0.15rem;
	border-bottom: 2px solid #4ab6b5;
 }
</style>
