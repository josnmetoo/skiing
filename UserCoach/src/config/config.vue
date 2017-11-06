<script>
import Vue from 'vue';
	const TOTAL_VARS={
		api:{

			infos:"/api/common/region/infos",//查看所有雪区
			info:"/api/user/base/info",//获取用户信息
			sinf:"/api/service/monomer/infos",//单双板查询
			cinfo:"/api/service/monomer/coachinfo",//教练详情
			minfo:"/api/service/monomer/monomerinfo",//单体服务图片和荣耀
			ginfo:"/api/service/group/infos",//集训营
			gropfo:"/api/service/group/groupinfo",//集训营点击
			gday:"/api/service/group/groupAgenda",//集训营日期
			sonw:"/api/service/monomer/sites",//选择可查询雪区
			ipon:"/api/user/login/local",//模拟登陆手机
			time:"/api/service/monomer/coachtime",//得到教练已经预约的时间戳
			poper:"/api/user/base/contacts",//得到用户联系人
			popers:"/api/user/base/contact",//得到当前联系人可编辑
			end:"/api/user/base/delcontact",//删除联系人
			sun:"/api/user/base/updatecontact",//保存联系人
			add:"/api/user/base/addcontact",//添加新联系人
			look:"/api/user/task/info",//查看订单
			submet:"/api/user/recerve/monomer",//单双提交订单
			 tsubmet:"/api/user/recerve/group",//团体提交
			 pass:"/api/user/task/unsubscribe",//取消预定
			 goo:"/api/user/task/tasks",//查看未支付订单
			 gott:"/api/user/task/getorder",//订单支付获取订单信息
			 ewm:"/api/user/base/getuid",//二维码
			 pay:"/api/user/pay/sponsor",//微信支付订单
			 jsdk:"/api/wechat/jssdk/info",//微信jsdk
			 poose:"/api/user/login/wechat",//微信登录
			 xxi:"/api/websocket/{type}/{userSessionId}",//沟通客服
			 houser:"/api/user/collect/ins",//收藏
			 lookins:"/api/user/collect/getbase",//查看是否藏
			 lins:"/api/user/collect/del",//查看是否藏
			 list:"/api/user/collect/infos",//查看收藏信息
			 listone:"/api/user/collect/coachinfo",
			 studyProcess:"/api/service/archives/info", // 用户学习档案


			 sou:"/api/service/monomer/search",//搜索
			dengji:"/api/common/region/ranklist",//级别展示
			jibie:"/api/common/region/getrank",//等级

			 myStudy:"/api/service/archives/infos", // 用户学习视频列表,
			 userComment:"/api/user/evaluate/service", // 用户评价教练接口
			 coachComment:"/api/service/monomer/evaluateinfo", // 获取单双板教练的用户评价
			 trainingComment:"/api/service/group/evaluateinfo",//获取集训营的用户评价


			 payListInfo:"/api/user/task/getorder", // 待支付订单详情
			 listInfo:"/api/user/task/reserveinfo", // 查看剩余的三个列表的详情
			 subm:"/api/user/feedback/info",//意见
			 callone:"/api/user/base/getphonestatus",//此手机号是否被绑定
			calltwo	:"/api/user/base/sendCode",//发送验证
			call:"/api/user/base/bindphone",//绑定
			callon:"/api/user/base/getphone",//手机号是否被绑定
			ca:"/api/common/upload/image",//手机号是否被绑定

			user:"/api/user/member/list",//成员列表
			userend:"/api/user/member/delete",//删除成员
			useradd:"/api/user/member/create",//创建
			useraddt:"/api/user/member/update",//修改
			userone:'/api/user/member/get',//当前成员
			carlist:"/api/service/card/list",//获取所有卡
			carone:"/api/service/card/details",//获取本张卡
			price:"/api/service/card/price",//得到价格
			scar:"/api/user/card/order/generate",//提交卡订单
			cardmiss:"/api/user/card/order/get",//提交后信息
			carall:"/api/user/card/list",//获取所有卡卷类型
			usecar:"/api/user/card/details",//获取本用户的激活卡片
			makecar:"/api/user/card/transfer",//转卡
			active:"/api/user/card/activate",//激活
			yuyue:"/api/user/recerve/card",//预约
			bantype:"/api/service/archives/list",//能学的级别
			timeno:"/api/user/recerve/card/date",//不能预约时间
			yan:"/api/user/card/receive",//检查是否转卡成功
			liong:"/api/user/register/phone",//手机登录绑定
			symm:'/api/common/sms/send',//验证码
			one:'/api/service/alone/aloneinfo',//一对一详情页
			onetiem:'/api/service/alone/alonetime',//一对一不可预约时间
			onesnow:'/api/service/alone/sites',//一对一不雪场
			oneold:'/api/user/recerve/alone',//一对一下单
			onepj:'/api/service/alone/evaluateinfo',//一对一下单
		}
	}
	export default TOTAL_VARS;
</script>