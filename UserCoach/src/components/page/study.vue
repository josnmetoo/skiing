<template>
  <div class="study">
    <div class="stuNav">
        <ul>
          <span class="centerLine"></span>
           <li v-for="(relation,index) in relations"  v-on:click="relationClick(index)" v-bind:class="{checked:index==nowIndex}" v-bind:id="relation.id"  ><!-- <router-link  :to="relation.url" > -->{{relation.text}}

      <!-- </router-link> --></li>
        </ul>
    </div>
     <div class="main2">
     <!-- 路由匹配到的组件将渲染在这里 -->
       <router-view class="Router"></router-view>
     </div>

  </div>
</template>

<script>
export default {
  data() {
    return{
        relations: [
   {text:'单板',id:'program',url:'/study/dan?index=0'},
   {text:'双板',id:'person',url:'/study/shuang?index=1'},

  ],
  nowIndex:-1,
    }
  },
  created:function () {         
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
    document.title = "学习档案";
    var viewWidth = document.documentElement.clientWidth;
    var viewHeight = document.documentElement.clientHeight;

    // 拿到sessionId


  },
  mounted:function () {

  },
  methods:{
       relationClick:function(index){
       this.$router.replace(this.relations[index].url)
   this.nowIndex=index;
  }
  }
}
</script>

<style scoped>
.centerLine{
  display: inline-block;
  width: 1px;
  height: 1rem;
  background-color:rgb(188, 188, 188);
  position: relative;
  left: 50%;
  top:0rem;
  transform: translate(-50%);
}
.Router{
  transition: all .5s ease;
}
body{
  overflow-x: hidden;
}
.main2{
  max-width: 100%;
  overflow-x: hidden;
}
.checked{
  color: #4ab6b5 !important;
}
body{
  background-color: #f5f5f5;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color:#7f7f7f;
}
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, figure, /*结构元素*/
dl, dt, dd, ul, ol, li, /*列表元素*/
fieldset, lengend, button, input, textarea, /*表单元素*/
th, td, /*表格元素*/
pre /*文本格式元素*/ {
    margin: 0;
}

/*清除内边距*/
ul, ol, menu {
    padding: 0;
}


/*重置列表元素*/
ul, ol {
    list-style: none;
}


/*将字体扶正*/
address, cite, dfn, em, var {
    font-style: normal;
}


/*清下划线*/
a {
    text-decoration: none;
    color: black;
}
/*鼠标略过a标签，显示下划线*/

.stuNav{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1000;
  border-bottom: 1px solid #ededed;
  background-color: #fff;
  height: 2.5rem;
  line-height: 2.5rem;
}
.stuNav ul{
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stuNav ul li{
  width: 50%;
    box-sizing: border-box;
    text-align: center;
    font-size: 0.7rem;


}
.stuNav ul li a{
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 0.7rem;
  color: rgb(188, 188, 188);
}
.main2{
  margin-top: 3rem;
  background-color: #fff;
  padding-bottom: 2.3rem;
}


</style>
