<template>
   <div class="btn" >
	<div class="conent" v-for="val in arr">
		<ul @click.stop.prevent="goDetail(val.oid,val.type)">
			<li class="one">
				<span class="sp1">服务项目：</span>
				<span class="sp2" v-if="val.type==0 || val.type==4 ">教练预约（{{val.stype}}）</span>
				<span class="sp2" v-if="val.type==1">{{val.gname}}</span>
				<span class="sp2" v-if="val.type==3">{{val.name}}</span>
				<span class="sp3">待支付</span>
			</li>
			<li class="two" v-if="val.type==3">
				<img src="../../assets/day.png" alt=""/>
				<span>期限：</span>
				<span >{{val.days}}天</span>
			</li>
			<li class="two" v-else>
				<img src="../../assets/day.png" alt=""/>
				<span>日期：</span>
				<div class="timeCon">
          <span v-for=" time in val.gtimes" >
  				<span  v-if="val.type==1 ">{{time.stime | formatDate}} - {{time.etime | formatDate}}</span>
  				<span  v-if="val.type==0 || val.type==4" class="ontime">{{time.stime | formatDate}}&nbsp;</span>

				</div>
				</span>
			</li>
			<li class="three">
				<img src="../../assets/wei.png"alt=""/>
				<span>雪场：</span>
				<span v-if="val.type==3">{{val.siteName}}</span>
				<span v-else>{{val.rname}} {{val.sname}}</span>
			</li>
			<li class="four" v-if="val.type==3">
				<img src="../../assets/mau.png" alt=""/>
				<span>版型：</span>
				<span>{{val.skateName}}</span>
			</li>
			<li v-else class="four">
				<img src="../../assets/man.png" alt=""/>
				<span>教练：</span>

				<span v-if="val.type==0 || val.type==4">{{val.cname}}</span>
				<span v-if="val.type==1">分配中</span>
			</li>
			<li class="five">
			<span @click.stop.prevent="info(val.oid,val.type)">立即支付</span>
			</li>
		</ul>
	</div>
	<p style="text-align:center;color:#dedede;font-size:0.9rem;margin-top:1rem;" v-show="this.arr.length == 0">暂无数据</p>
	
	<div class="bgh"></div>
  </div>


</template>

<script>
import Config from '../../config/config.vue'
import {formatDate} from '../../libs/data.js';
export default {
  data() {
    return{
    	arr:''
    }
  },filters: {
        formatDate(time) {
          var date=new Date(time)
            return formatDate(date, 'yyyy/MM/dd');
        }
    },created:function(){
  	var xid= sessionStorage.getItem('xid');

  	console.log(xid)
  		 this.$http.get(Config.api.goo,{headers:{'X-SESSION-ID':xid}}).then(
				      function(response){
				      	if(response.data.code==0){
				      		  this.arr=response.data.data

				       console.log(this.arr)
				      	}
				      

				}, function(response){
				    // 响应错误回调
				})

  } ,
  methods: {
  			info(oid,type){
  				if(type=='3'){
  					this.$router.push('/Mue?oid='+oid);
  				}else{
  					this.$router.push('/Qian?id='+oid+'&type='+type);
  				}
    
    },
    goDetail(id,type){
      var obj = {};
      obj.id = id;
      obj.type = type;
      obj.payType = 1;
      obj = JSON.stringify(obj);
      var storage = sessionStorage.setItem("orderidT",obj);
      this.$router.push('/Detail');
    }
  }


}
</script>

<style scoped>
	.bgh{
		width: 100%;
		height: 2rem;
	}
.five{
	margin-top: -1.7rem;
	padding-bottom: 0.3rem;
}
.conent{
	margin-top: 0.5rem;
}
.five span{
	float: right;
	width: 4.125rem; height:1.55rem;
	text-align: center;
	line-height: 1.55rem;
	 background: #fc5c62;
	 color: #fff;
	 border-radius: 5px;
}
.conent li img{
	width: 0.75rem; height: 0.8rem;
	 margin-right: 0.8rem;
	 float: left;
	 margin-top: 0.28rem
}
.two span{
  float: left;
}
.conent{
	    width: 100%;
    background: #fff;
    border-radius: 10px;
}
	li{
		list-style: none;
		overflow: hidden;
		line-height: 1.6rem;
		font-size:0.75rem;
		margin-left: 1rem;
		margin-right: 0.8rem;
	}
  .timeCon{
    overflow: hidden;
  }
  .ontime{
    margin-left: 0.3rem;
  }
	.one{
		font-size:0.75rem;

	}
	.one .sp1,.sp2{
		float: left;

	}
	.one .sp3{
		float: right;
		color: #6cc3ab
	}

</style>
