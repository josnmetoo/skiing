<template>
<!-- <h1 @click="login()">这是登录页面，点我登录</h1> -->

  
  
  <div class="btn" >
  <ul id="box">
  <!--   <router-link to="/Unpaid">
    <li >待支付</li>
    </router-link > 
     <router-link to="/Ping"> 
    <li>进行中</li>
    </router-link > 
    <router-link to="/Paid"> 
    <li>已完成</li>
    </router-link>
    <router-link to="/No"> 
    <li class="ee">退款/取消</li> 
    </router-link> -->
    <li v-for="(relation,index) in relations"  v-on:click="relationClick(index)" v-bind:class="{checked:index==nowIndex}" v-bind:id="relation.id"  ><!-- <router-link  :to="relation.url" > -->{{relation.text}}<!-- </router-link> -->
    </li>
  </ul>
  

   <div class="text">
      <router-view></router-view>

    </div>
</div>
</template>

<script>
import unpaid from './unpaid.vue'
import ping from './ping.vue'
import paid from './paid.vue'
import no from './no.vue'
export default {
  name:"text",
  components: {
   unpaid
  },
  data() {
    return{
        relations: [ 
   {text:'待支付',id:'program',url:'/Unpaid?index=0'}, 
   {text:'进行中',id:'person',url:'/Ping?index=1'}, 
   {text:'已完成',id:'organization',url:'/Paid?index=2'}, 
   {text:'退款/取消',id:'tech',url:'/No?index=3'}, 
  ], 
  nowIndex:-1, 
  }
    
  },
  mounted:function () {
 
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
  
      var id =getvalue("index");
      //alert(id)
      this.nowIndex=id
    document.title="订单列表";
    
  },methods:{
    
      relationClick:function(index){ 
         this.$router.replace(this.relations[index].url)
   this.nowIndex=index; 
  } }
}
</script>

<style scoped>
.checked{
  color: #4ab6b5;
}
.text{
  width:17.25rem;
  margin:0 auto; 
  height: 400px;
 
}
a{
  color: #666;

display: inline-block;
}
li{
  list-style: none;
}
.on{
  color: #b5e1d5
}
  #box{
    display: flex;
    width: 100%;
    height:2.25rem;
    background: #fff; 
  }
  #box li{
  height: 1rem;
  flex: 1;
  font-size: 0.7rem;
  text-align: center;
  margin-top: 0.75rem;

  }
  .ee{
    border-left: 1px solid #ccc;
    padding-left: 1rem;
  }
  .bg{
    width: 100%; height: 0.55rem;
  }

</style>