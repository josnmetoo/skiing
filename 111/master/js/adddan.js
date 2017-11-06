// 请求地区列表
function snowAddress(json) {
  if(json.code == 0){
    $('.qu').empty();
    $('.qu').append('<option value="">全部</option>')
    $.each(json.data,function (index,value) {
      $('.qu').append(`<option value="${value.id}">${value.name}</option>`);
    });
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}
AJAX("GET",storage,REYURNURL(SNOWADDRESS),{},snowAddress);

// 教练级别下拉框
function coachRank(json) {
  if(json.code == 0){
    $('.coachType').empty();
    $('.coachType').append(`<option value="">全部</option>`);
    $.each(json.data.rank,function (index,value) {
      $('.coachType').append(`<option value="${value.rankId}">${value.rankName}</option>`);
    });
  }else{

  }
}
AJAX("GET",storage,REYURNURL(COACHRANK),{},coachRank);


// 单板教练列表
function addCoachList(json) {
  $('.msg').empty();
  $('.table table tbody').empty();
  if(json.code == 0){
    var data = json.data.coachInfoList;
    console.log(data);
    $.each(data,function (index,value) {
      $('.table table tbody').append(`<tr>
        <td><input type="checkbox" name="" value="${value.coachId}"></td>
        <td>${value.coachName}</td>
        <td>${value.coachSex}</td>
        <td>${value.region}</td>
        <td>${value.coachType}</td>
        <td>${value.coachRank}</td>
        <td>${value.ojtPrice}</td>
      </tr>`);
    });
  }else if(json.code == 3001){
    $('.msg').empty().append(`<p style="text-align:center;margin-top:20px;color:#ccc;">暂无数据</p>`);
  }else{

  }
}
AJAX('GET',storage,REYURNURL(ADDBANCOACH),{"regionId":"","rank":"","coachSex":"","serviceType":0},addCoachList);

// 筛选
$('.qu').change(function () {
    var regionId = $('.qu').val();
    var coachSex = $('.sex').val();
    var rank = $('.coachType').val();
    AJAX('GET',storage,REYURNURL(ADDBANCOACH),{"regionId":regionId,"rank":rank,"coachSex":coachSex,"serviceType":0},addCoachList);
});
$('.sex').change(function () {
    var regionId = $('.qu').val();
    var coachSex = $('.sex').val();
    var rank = $('.coachType').val();
    AJAX('GET',storage,REYURNURL(ADDBANCOACH),{"regionId":regionId,"rank":rank,"coachSex":coachSex,"serviceType":0},addCoachList);
});
$('.coachType').change(function () {
    var regionId = $('.qu').val();
    var coachSex = $('.sex').val();
    var rank = $('.coachType').val();
    AJAX('GET',storage,REYURNURL(ADDBANCOACH),{"regionId":regionId,"rank":rank,"coachSex":coachSex,"serviceType":0},addCoachList);
});

// 确定添加按钮
function adddanCoach(json) {
  if(json.code == 0){
    alert("添加成功");
    window.location.href="dan.html";
  }else{
    alert("添加失败");
  }
}
var arr = [];
$('.addCoach').on('click',function () {
  $('.table table tr td:first-of-type input[type="checkbox"]').each(function (index,value) {
    if($(value).prop('checked') == true){
      id = $(this).attr('value');
      arr.push(id);
    }
  });
  if(arr.length == 0){
    alert("请选择一个教练");
  }else{
    var obj = {};
    arr = arr.join(',');
    console.log(arr);
    obj.coachIds = arr;
    obj.type=0;
    AJAX('POST',storage,REYURNURL(ADDBANCOACHSURE),obj,adddanCoach);
  }
});
