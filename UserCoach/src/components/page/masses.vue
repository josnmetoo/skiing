<template>
<div class="hh">
   <textarea class="txt" name="textarea"  maxlength="400" placeholder="请说出来你的意见吧..." ref="textarea" v-model="bzhu"></textarea>
   <div class="footers" @click="submit()" > <img src="../../assets/tijiaokuang.png" class="tij">确认提交</div>
    <!--   <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="data"
            :options="options"></schart> -->
  </div>
  
  
</template>

<script>
import Schart from 'vue-schart';
 import Config from '../../config/config.vue'
export default {
 
  data () {
    return {
      sid:'',
      bzhu:'',
  //      canvasId: 'myCanvas',
  //           type: 'line',
  //           width: 320,
  //           height: 200,
  //           data: [
  //               {name: '阶段一', value: 1},
  //               {name: '阶段二', value:15},
  //               {name: '阶段三', value: 2},
  //               {name: '阶段四', value: 4},
  //               {name: '阶段四', value: 5},
  //               {name: '阶段四', value: 6},
  //           ],
  //           options: {
  //               title: '',
  //               contentColor: '#fff',
  //               axisColor: '#fff',
  //           }
  //   }
  // },components:{
  //       Schart
}
    },
    created:function(){
     var sid=sessionStorage.getItem('xid');
     this.sid=sid
}, updated:function(){

},
   mounted: function () {           
   },
  methods:{

        submit(){
            console.log(this.bzhu)
            if(this.bzhu==''){
              alert("请输入想说的话")
            }else{
               this.$http.post(Config.api.subm,{
                      content:this.bzhu
          },{headers:{'X-SESSION-ID':this.sid}}).then(
                      function(response){
                 if(response.data.code==0){
                  alert("提交成功");
                  $('.txt').val('');
                  this.$router.push('/About');
                 }
                  
               
                 
                }, function(response){
                    // 响应错误回调
                })
            }
                   
        }
  }
}
</script>
<style scoped>
.footers img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10
}
.footers{
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
  .txt {
    width: 16.7rem;
    height: 7rem;
    background: #fff;
   display:block;
    padding-left: 0.6rem;
    padding-top: 0.6rem;
    border: none;
     margin-top: 0.8rem;
      margin-left: 0.6rem;
    /* margin-left: 50%; */
 margin:0.8rem auto;
border-radius: 5px;
    border:1px solid #ccc;
  outline: none;
  resize: none;
  }
</style>
