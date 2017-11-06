<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
  export default{
    data() {
      return {
        testvalue:''
      }
    },
    mounted:function () {

    }
  }
</script>
<style scoped>
*,a,div,section,h3,h2,p{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-click-highlight-color: rgba(0,0,0,0);
   -webkit-touch-callout: none;
   -webkit-user-select: none;
   user-select:none;
}

</style>
