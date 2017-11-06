<template>
  <div class="sonw">
  <div class="bg">
   <img class="img"src="../../assets/div3.jpg">
  	 <p class="top">
<router-link to="/home/hot">	<img src="../../assets/close.png"></router-link>
  选择雪区</p>
  <div class="tp">
  <p class="top1">离您最近的雪区</p>
 <!--  <p v-if="JD.name=='' || JD.name==undefined"  class="top2">定位中</p> -->
   <p   class="top2" @click="sk(JD.name)">{{JD.name}}</p>
  </div>
  <div class="tp tp1">
 		 <p class="top1">已开通服务的雪区</p>
 		 <ul >
 		 	
 		 	<li v-for="(value,key) in arr" @click="xue(key,value.name)">{{value.name}}</li>
 		 	
 		 </ul>

 	</div>
  </div>
 	
  </div>
</template>

<script>
import Config from '../../config/config.vue'
export default {
 
  data () {
    return {
      arr:'',
      JD:'',
      ni:''
    }
  },created:function(){
    this.$http.get(Config.api.infos).then(
      function(response){
        var res=response.data.data;
        this.arr=res
    console.log(response)// 响应成功回调

this.JD=this.arr[1]

      //console.log(this.JD.id)
    
}, function(response){
    // 响应错误回调
})
//   function toRad(d) {  return d * Math.PI / 180; }
//   function getDisance(lat1, lng1, lat2, lng2) {
//     var dis = 0;
//     var radLat1 = toRad(lat1);
//     var radLat2 = toRad(lat2);
//     var deltaLat = radLat1 - radLat2;
//     var deltaLng = toRad(lng1) - toRad(lng2);
//     var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    
//     return parseInt(dis * 6378137);
   
// }
// var EARTH_RADIUS = 6378137.0;    //单位M
//     var PI = Math.PI;
    
//     function getRad(d){
//         return d*PI/180.0;
//     }
//  function getDisance(lat1,lng1,lat2,lng2){
//         var f = getRad((lat1 + lat2)/2);
//         var g = getRad((lat1 - lat2)/2);
//         var l = getRad((lng1 - lng2)/2);
        
//         var sg = Math.sin(g);
//         var sl = Math.sin(l);
//         var sf = Math.sin(f);
        
//         var s,c,w,r,d,h1,h2;
//         var a = EARTH_RADIUS;
//         var fl = 1/298.257;
        
//         sg = sg*sg;
//         sl = sl*sl;
//         sf = sf*sf;
        
//         s = sg*(1-sl) + (1-sf)*sl;
//         c = (1-sg)*(1-sl) + sf*sl;
        
//         w = Math.atan(Math.sqrt(s/c));
//         r = Math.sqrt(s*c)/w;
//         d = 2*w*a;
//         h1 = (3*r -1)/2/c;
//         h2 = (3*r +1)/2/s;
        
//         return parseInt(d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg)));
//     }
//     const that=this
//     getLocation()
//     function getLocation(){
//         if (navigator.geolocation){
//             navigator.geolocation.getCurrentPosition(showPosition);
//              alert("获取成功")
//         }else{
//             alert("获取失败")
//         }
//     } 
//         function showPosition(position){
//     var a=position.coords.latitude ; 
//      var b=position.coords.longitude;
     
// var arr2=[];

//      for (var i = 0; i < that.arr.length; i++) {
      
//       var diss=getDisance(a,b,parseInt(that.arr[i].latitude),parseInt(that.arr[i].longitude))
//       //alert(diss)
//       arr2.push(diss)

      
//      }
//      if(arr2.length==0){
//       $('.top2').html("北京")
//      }
//       console.log(arr2)
//       function findMinIndex(arr,start){
//       var iMin=arr[start];
//       var iMinIndex=start;
//       for(var i=start+1;i<arr.length;i++){
//         if(iMin>arr[i]){
//           iMin=arr[i];
//           iMinIndex=i;
//         }
//       }
//       return iMinIndex;
//     }
      
    
//     alert(findMinIndex(arr2,0))
//    that.JD=that.arr[findMinIndex(arr2,0)]

// if(!that.JD==""){
//   localStorage.setItem('regionId',that.JD.id);
//   $('.top2').html(that.JD.name)
// }
     
  
//   }
},
  mounted:function(){
  		$(document).scrollTop(0,0);
      $('.img').height($(window).height())
    var oBtn=document.querySelector('.bg')
    //alert(oBtn)
    oBtn.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
  }, methods:{
    sk(b){
       this.$router.replace('/home/hot');
        localStorage.setItem('htm',b);
        localStorage.setItem('regionId',this.JD.id);
    },
    xue(i,a){
      localStorage.removeItem('regionId')
      //this.JD=this.arr[i]
       localStorage.setItem('regionId',this.arr[i].id);
        localStorage.setItem('htm',a);
       this.$router.replace('/home/hot');
      //alert(this.arr[i].id)
    }
  }

}
</script>
<style scoped>
.bg .img{
	width: 100%; height: 100%;
	position: absolute;
	z-index: -9999
}
.conent{
  position: fixed; bottom: 0;
  width: 100%;
  height:14rem;
  background: #fff;
z-index: 1; 
}
.ceng{
  background: #000; position: fixed;
  top: 0; width: 100%; height: 21.875rem;
  opacity: 0.3;
  z-index: 1;
}
.go{
	background: #fff;
	color:#69c4ab 
}
li{
	list-style: none;
	float: left;
	height: 1.45rem;
	line-height: 1.55rem;
	padding: 0 0.7rem;
	margin:0.4rem;
	
	border-radius:1.45rem;
	border: 1px solid #fff;
	color:#fff;
}
	.top{
		height:2.25rem;
		text-align: center;
		line-height: 2.25rem; 
		color: #fff;
		position: relative;
			border-bottom: 1px solid #7bd2ba

	}
	.top img{
		position: absolute;
		top: 0.8rem;
		left: 1.3rem;
		width: 0.9rem;
		height: 0.9rem;

	}
	.bg{
		font-size:0.75rem; 
		width: 100%; height:33.35rem; 
	}
	.top1{
		height:2rem;
		line-height: 2rem; 
		color: #fff;
		
	}
	.tp{
		width:16.8rem ;
		margin-left: 1rem;
		border-bottom: 1px solid #7bd2ba

	}
	.top2{
		width: 3.25rem;
		height:1.45rem;
		background: #fff;
		color:#69c4ab;
		border-radius: 1.5rem;
		line-height: 1.55rem; text-align: center;
		margin-top: 0.2rem ;
		margin-bottom: 1rem ;
	}
	.tp1{
		border-bottom: none;
	}
</style>
