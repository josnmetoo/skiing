<template>
  <div class="set">
    <section class="sec1 section" @click="">
     <span>版本信息</span> <span class="msg">v 1.2</span>
    </section>
    <section class="sec2 section" @click="change()">
     <span>修改密码</span> <img src="../../assets/jiantou.png" alt="" class="rightGo">
    </section>
  </div>
</template>

<script>

export default {
  name:"set",
  data() {
    return{
      msg:"这里是系统设置"
    }
  },
  created:function () {
    document.title="系统设置";
  },
  methods:{
    change() {
      this.$router.push("/changePassword");
    }
  }
}
</script>

<style scoped>
.set{
  background-color: #fff;
  margin-top: 0.5rem;
}
.set .section{
  height:2.9rem;
  width: 92%;
  margin:auto;
  border-bottom: 1px solid #dedede;
  line-height: 2.9rem;
  overflow: hidden;
}
.sec2{
  border-bottom: none !important;
}
.set .section .rightGo{
  float: right;
  width: 0.4rem;
  height: 0.6rem;
  margin-top: 1.2rem;
}

.set .section span{
  display: inline-block;
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
  float: left;
}
.msg{
  float: right !important;
}

</style>
