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

// 集训营列表
function groupList(json) {
  $('.table table tbody').empty();
  if(json.code == 0){
    $('.msg').empty();
    var data = json.data;
    $.each(data,function (index,value) {
      $('.table table tbody').append(`  <tr>
          <td value="${value.id}">${value.id}</td>
          <td>${value.name}</td>
          <td value="${value.typeid}">${value.type}</td>
          <td value="${value.regionid}">${value.region}</td>
          <td>${value.price}</td>
          <td value="${value.statusid}">${value.status}</td>
          <td value="${value.statusid}"><button type="button" name="button" class="statusHandle">状态管理</button></td>
          <td><button type="button" name="button" class="conHandle">内容修改</button></td>
          <td><button type="button" name="button" class="weekHandle">排期管理</button></td>
        </tr>`);
    });

  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else if(json.code == '3001'){
    $('.msg').empty().append(`<p style="text-align:center;margin-top20px;color:#ccc;">暂无数据</p>`);
  }
}
// 请求列表
AJAX("GET",storage,REYURNURL(GROUPLIST),{},groupList);


// 状态修改按钮
$('.table table tbody').on('click',' tr td .statusHandle',function () {
    var status = $(this).parent().attr('value');
    if(status == 1){
      $('.status .down').prop('checked',true);
    }else if (status == 0) {
      $('.status .up').prop('checked',true);
    }
    var id = $(this).parent().parent().find('td:first-of-type').attr('value');
    $('.groupid').attr('value',id);
});
// 弹窗的确定修改状态按钮
function changStatus(json) {
  if(json.code == 0){
    alert("修改成功");
    $('.shadow').hide();
    $('body').css("overflow","auto");
    AJAX("GET",storage,REYURNURL(GROUPLIST),{},groupList);
  }
}
$('.box .surechange').on('click',function () {
  var groupid =$('.groupid').attr('value');
  var statusid;
  // 遍历被选中的radio
  $('.status input[type="radio"]').each(function (index,value) {
    if($(value).prop('checked') == true){
      statusid = $(this).attr('value');
    }
  });
  AJAX('POST',storage,REYURNURL(EDITGROUPSTATUS),{"groupid":groupid,"status":statusid},changStatus);
});

// 内容修改按钮， 传输groupid

$('.table table tbody').on('click','tr td .conHandle',function () {
    var groupid = $(this).parent().parent().find('td:first-of-type').attr('value');
    window.location.href="editClass.html?id="+groupid;
});
// 排期管理
$('.table table tbody').on('click','tr td .weekHandle',function () {
  var groupid = $(this).parent().parent().find('td:first-of-type').attr('value');
  var name = $(this).parent().parent().find('td:nth-of-type(2)').html();
  var rid = $(this).parent().parent().find('td:nth-of-type(4)').attr('value');
  var info = window.localStorage;
  info.setItem('name',name);
    window.location.href="paiqi.html?id="+groupid+"&rid="+rid;
});
