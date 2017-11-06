<script>
import Vue from 'vue';
	const TOTAL_VARS={
		api:{
			login:"/api/coach/login/local", // 教练账号密码登录
			coachToken:"/api/coach/login/auth", // 教练令牌登录
			coachInfo:"/api/coach/person/getInfo", // 获取教练的个人信息
			severList:"/api/coach/reserve/getItems", // 教练任务列表
			severDetail:"/api/coach/reserve/getDetails", // 教练任务详情
			severInfo:"/api/coach/reserve/getUserOrder", // 教练确定上课的订单信息
			suresever:"/api/coach/reserve/validates", // 教练确认任务
			coachClass:"/api/coach/period/getClass",// 教练排课信息
			oneClass:"/api/coach/period/OneOperate", // 教s练单点课程操作
			allClass:"/api/coach/period/allOperate",// 教练全部课程操作
			jssdk:"/api/wechat/jssdk/info", // 微信jssdk
			changePwd:"/api/coach/person/updatePass", // 修改教练密码
			studyArch:"/api/service/archives/info", // 查看学员档案
			historyTime:"/api/service/archives/his", // 查看学员的历史视频和评语
			uploadStudy:"/api/service/archives/ins", // 上传用户学习档案
			nowCoachStatus: "/api/coach/reserve/getcoachstatus", // 查看教练当前状态
		}
	}
	export default TOTAL_VARS;
</script>
