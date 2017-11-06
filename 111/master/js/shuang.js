// 请求地区列表
function snowAddress(json) {
  console.log(json);
  if(json.code == 0){
    $('.qu').empty();
    $('.qu').append(`<option value="">全部</option>`);
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

// 获取教练列表
// 获取单板教练列表
function bancoachList(json) {
  $('.table table tbody').empty();
  if(json.code == 0){
    $('.msg').empty();
    var data = json.data.coachInfoList;
    if(data.length == 0){
      $('.msg').empty().append(`<p style="text-align:center;margin-top20px;color:#ccc;">暂无数据</p>`);
    }else{

      $.each(data,function (index,value) {
        $('.table table tbody').append(`<tr>
          <td>${value.coachName}</td>
          <td>${value.coachSex}</td>
          <td>${value.region}</td>
          <td>${value.coachType}</td>
          <td>${value.coachRank}</td>
          <td>${value.ojtPrice}</td>
          <td value="${value.coachId}"><button type="button" name="button" class="guanli">管理</button></td>
        </tr>`);
      });
    }
  }else if(json.code == 3001){
    $('.msg').empty().append(`<p style="text-align:center;margin-top20px;color:#ccc;">暂无数据</p>`);
  }else{
    alert("请求数据失败");
  }
}
AJAX('GET',storage,REYURNURL(BANCOACH),{"regionId":"","serviceType":1},bancoachList);

// 雪区改变
$('.qu').change(function () {
    var regionId = $(this).val();
    AJAX('GET',storage,REYURNURL(BANCOACH),{"regionId":regionId,"serviceType":1},bancoachList);
});

// 管理按钮
$('.table table tbody').on('click','tr .guanli',function () {
    var id = $(this).parent().attr('value');
    $('.box .coachId').attr('value',id);
});
// 弹窗的删除教练
function deleteCoach(json) {
  if(json.code == 0){
    alert("删除成功");
    $('.shadow').hide();
    $('body').css("overflow","auto");
    var regionId = $('.qu').val();
    AJAX('GET',storage,REYURNURL(BANCOACH),{"regionId":regionId,"serviceType":1},bancoachList);
  }else{
    alert("删除失败");
  }
}
$('.delet').on('click',function () {
    var coachId = $('.box .coachId').attr('value');
    var con = confirm("确定删除教练吗");
    if(con == true){
      AJAX('POST',storage,REYURNURL(DELTEBANCOACH),{"coachId":coachId,"type":1},deleteCoach);
    }
})

// $('#id').jqPaginator({
//   totalPages: 10, // 总条目
//   visiblePages: 5, // 显示的页码数
//   currentPage: 1, // 默认页码数
//
//   first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
//   prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
//   next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
//   last: '<li class="last"><a href="javascript:void(0);">末页</a></li>',
//   page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
//   onPageChange: function (num) {
//       $('#text').html('当前第' + num + '页');
//
//   }
// });
