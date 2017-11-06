<template>
  <div class="mima">
  <div class="bg"></div>
  <ul class="touba">
      <li>
       <span> 新密码</span>
        <input type="text" class="in1 in2" placeholder="请输入新密码"></input>
  
      </li>
      <li>
        <span>再次输入</span>
        <input type="text" class="in1" placeholder="再次输入新密码"></input>
       
      </li>
    </ul>
   <!-- <input class="get" type="submit" value="确认修改"></input> -->
  <div class="footers" ><img src="../../assets/tijiaokuang.png" class="tij">确认修改</div>  </div>
</template>

<script>
export default {
  name: 'mima',
  data () {
    return {
  
    }
  },
  mounted:function () {
    document.title="修改密码";
    
  }
}
</script>
<style scoped>
.get{
	width:15.5rem; position: fixed; bottom:1.7rem;
	color: #fff; background: #7bd2ba; height:2.25rem;
	border-radius: 5px;
	text-align: center;line-height: 2.25rem ;
	left:1.65rem 
}
.touba .in2{
	margin-left: 1rem
}
li{
	list-style: none;
}
.bg{
	width: 100%; height:0.5rem; 
}
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
.touba{
	font-size: 0.7rem;
	width: 100%;
	background: #fff;
}
.touba li{
	width:17.25rem;
	height: 2.4rem; 
	margin: 0 auto;
	line-height: 2.4rem;
}
.touba span{
	line-height:1.875rem;
	color: #666 
}
.touba input{
 height: 1.1rem;
 width: 12rem;
 margin-left: 0.4rem
}

input{

outline:none;

border:none;

}
</style>

