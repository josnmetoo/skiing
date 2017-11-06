function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
var groupid = getQueryString('id');
var rid = getQueryString('rid');
var info = window.localStorage;
var name = info.getItem('name');
$('.name').html(name);

//请求列表
function paiqiList(json) {
  $('.table table tbody').empty();
  if(json.code == 0){
    if(json.data.length == 0){
      $('.msg').empty().append(`<p style="text-align:center;margin-top20px;color:#ccc;">暂无数据</p>`);
    }else{
      $.each(json.data,function (index,value) {
        $('.table table tbody').append(`<tr>
          <td value="${value.id}">${value.begindate} - ${value.enddate}</td>
          <td>${value.days}</td>
          <td>${value.people}</td>
          <td vlaue="${value.siteid}">${value.site}</td>
          <td>${value.status}</td>
          <td value="${value.id}"><button type="button" name="button" class="editCon">内容修改</button></td>
          <td value="${value.statusid}"><button type="button" name="button" class="editStatu">状态修改</button></td>
        </tr>`);
      });
    }

  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}
//请求列表方法
AJAX('GET',storage,REYURNURL(SCHEDULELIST),{"groupid":groupid},paiqiList);

// 请求地区列表
function snowAddress(json) {
  if(json.code == 0){
    $('.qu').empty();
    $.each(json.data,function (index,value) {
      $('.qu').append(`<option value="${value.id}">${value.name}</option>`);
    });
  }else{

  }
}
AJAX("GET",storage,REYURNURL(PLACELIST),{"rid":rid},snowAddress);

var number  = /^\d+$/; // 只能是数字
$('.people').blur(function () {
  var num = $('.people').val();
    if(!number.test(num)){
      alert("人数必须是数字");
      $('.people').val('');
    }
});
// 新增确定按钮 ADDSCHEDULE
function addSchedule(json) {
  if(json.code == 0){
    console.log(json.data);
    alert("创建成功");
    closeAll();
    AJAX('GET',storage,REYURNURL(SCHEDULELIST),{"groupid":groupid},paiqiList);
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}

$('.addBtn').on('click',function () {
    var people = $('.people').val(); // 人数
    var siteid = $('.qu').val() ; // 场地编号
    var begintime = $('#datepicker').val().replace(/-/g,'/'); // 开始时间戳
    var endtime = $('#endtime').val().replace(/-/g,'/'); // 结束时间戳
    var date1 = new Date(begintime);
    var date2 = new Date(endtime);
    begintime = date1.getTime();
    endtime = date2.getTime();
    if(people == "" || siteid == "" || begintime == "" || endtime == ""){
      alert("请完善新增信息");
    }else if(begintime>endtime){
      alert("开始日期不能在结束日期之后");
    }else{
      AJAX('POST',storage,REYURNURL(ADDSCHEDULE),{"groupid":groupid,"begintime":begintime,"endtime":endtime,"people":people,"siteid":siteid},addSchedule);
    }

});

// 修改排期状态
$('.table table tbody').on('click','tr td .editStatu',function () {
  var id = $(this).parent().parent().find('td:first-of-type').attr('value');
  $('.thisStatus').attr('value',id);
});


function editSchedulstatus(json) {
  if(json.code == 0){
    console.log(json.data);
    alert("修改成功");
    closeAll();
    AJAX('GET',storage,REYURNURL(SCHEDULELIST),{"groupid":groupid},paiqiList);
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else if(json.code == 4037){

    alert("该排期已经有预约，无法被关闭");
    closeAll();
  }
}
// 确定scheduleid
$('.kai').on('click',function () {
  var status = $(this).attr('value');
  var scheduleid = $('.thisStatus').attr('value');
AJAX('POST',storage,REYURNURL(EDITSCHEDULESTATUS),{"scheduleid":scheduleid,"status":status},editSchedulstatus);
});
// 关闭
$('.guan').on('click',function () {
  var status = $(this).attr('value');
  var scheduleid = $('.thisStatus').attr('value');
  AJAX('POST',storage,REYURNURL(EDITSCHEDULESTATUS),{"scheduleid":scheduleid,"status":status},editSchedulstatus);
});

// 内容修改按钮， 获取排期详情
function getScheduleInfo(json) {
  if(json.code == 0){
    console.log(json.data);
    var data = json.data;
    $('#datepicker2').val(data.begindate);
    $('#endtime2').val(data.enddate);
    $('.people2').val(data.people);

    $('.qu2 option').each(function (index,value) {
      if($(value).attr('value') == data.siteid){
        $(this).prop('selected',true);
      }
    });
    $('.box2 .id').attr('value',data.id);

  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else {
    alert("获取信息失败");
  }
}
$('.table table tbody').on('click','tr td .editCon',function () {
    var id = $(this).parent().attr('value');
    $('.id').attr('value',id);
    AJAX('GET',storage,REYURNURL(SCHEDULEINFO),{"scheduleid":id},getScheduleInfo);
});

// 编辑弹窗的确定按钮
function editSchedule(json) {
  if(json.code == 0){
    console.log(json.data);
    alert("修改成功");
    closeAll();
    AJAX('GET',storage,REYURNURL(SCHEDULELIST),{"groupid":groupid},paiqiList);
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}
$('.box2 .editBtn').on('click',function () {
  var scheduleid = $('.box2 .id').attr('value');
  var people = $('.people2').val(); // 人数
  var siteid = $('.qu2').val() ; // 场地编号
  var begintime = $('#datepicker2').val().replace(/-/g,'/'); // 开始时间戳
  var endtime = $('#endtime2').val().replace(/-/g,'/'); // 结束时间戳
  var date1 = new Date(begintime);
  var date2 = new Date(endtime);
  begintime = date1.getTime();
  endtime = date2.getTime();
  if(people == "" || siteid == "" || begintime == "" || endtime == ""){
    alert("请填写全部信息");
  }else if(begintime>endtime){
    alert("开始日期不能在结束日期之后");
  }else{
    AJAX('POST',storage,REYURNURL(EDITSCHEDULE),{"scheduleid":scheduleid,"begintime":begintime,"endtime":endtime,"people":people,"siteid":siteid},editSchedule);
  }
});
