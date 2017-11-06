

var LOGIN = '/api/admin/user/login'; // 登录接口
var CONVERSE = '/api/admin/user/info'; // 获取授权登录会话信息
var ADDADMIN = '/api/admin/user/create'; // 创建管理员
var ADMINLIST = '/api/admin/user/list'; // 获取管理员列表

var SNOWADDRESS= '/api/admin/region/list'; // 获取地区列表
var ADDSNOWADDRESS = '/api/admin/region/create'; // 创建地区

var PLACELIST = '/api/admin/site/list'; // 获取场地列表
var PLACEADD = '/api/admin/site/create'; // 创建场地


var COACHLIST = '/api/admin/coach/getallcoach'; //获取教练列表
var ADDCOACH = '/api/admin/coach/addcoach'; // 添加教练

var CHANGECOACHSTATUS = '/api/admin/coach/updatestatus'; // 修改教练状态
var COACHDETAIL = '/api/admin/coach/echo'; //教练详情
var EDITCOACHINFO = '/api/admin/coach/updatecoach'; // 修改教练信息
var COACHRANK = '/api/admin/coach/getrank'; // 教练级别
var SEARCHCOACH = '/api/admin/coach/search'; // 教练分类查询

var ADDGROUP= '/api/admin/group/create'; // 创建集训营
var EDITGROUP = '/api/admin/group/update'; // 修改集训营
var EDITGROUPSTATUS= '/api/admin/group/status';// 修改集训营状态
var GROUPLIST = '/api/admin/group/list'; //获取集训营列表
var GETGROUPDETAIL = '/api/admin/group/info'; //获取集训营详细信息

var ADDSCHEDULE= '/api/admin/group/schedule/create'; //创建团体服务排期
var EDITSCHEDULE= '/api/admin/group/schedule/update'; //修改团体服务排期
var EDITSCHEDULESTATUS ='/api/admin/group/schedule/status'; //修改团体服务排期状态
var SCHEDULELIST = '/api/admin/group/schedule/list'; //获取团体服务列表
var SCHEDULEINFO = '/api/admin/group/schedule/info'; //获取团体服务排期信息


var ADDBANCOACH = '/api//admin/product/searchnotservice'; // 单双板的添加教练列表
var BANCOACH = '/api//admin/product/searchservice'; // 单双板的展示教练列表
var ADDBANCOACHSURE = '/api/admin/product/addservice'; // 单双版的确定添加
var DELTEBANCOACH = '/api/admin/product/deleteservice'; // 单双版的删除教练

var DIAODULIST = '/api/admin/group/dispatch/list'; // 分配教练列表
var SUREDIAO = '/api/admin/group/dispatch/coach'; // 确定调度


var UPLOADIMG = '/api/common/upload/image'; // 上传图片接口

var ADDLABLE = '/api/admin/label/create'; // 创建标签
var GETLABLE = '/api/admin/label/list'; // 获取所有教练标签

var FEEDBACK = "/api/admin/feedback/infos"; // 意见反馈

function REYURNURL(url) {
  return  url
}
