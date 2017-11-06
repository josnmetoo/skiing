function shadowHide() {
  $('.shadow').hide();
  $('body').css("overflow","auto");
}

// 请求教练列表
function coachList(json) {
  $('.table table tbody').empty();
  if(json.code == 0){
    $('.msg').empty();
    console.log(json.data.coachAllInfo);
    var data = json.data.aloneAllInfo
;
    $.each(data,function (index,value) {
      $('.table table tbody').append(`  <tr>
          <td value="${value.aloneId}">${value.aloneName}</td>
          
          <td>${value.regionName}</td>
          <td>${value.skateboartText}</td>
          <td>${value.maxCount}</td>
          <td>${value.ojtPrice}</td>
           <td>${value.aloneStatusText}</td>
           <td><button type="button" name="button" class="close">删除</button></td>
          <td><button type="button" name="button" class="infoEdit">内容修改</button></td>
          <td> <button type="button" name="button" class="editStatus">状态修改</button></td>
        
        </tr>`);
    });

  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else if(json.code == '3001'){
    $('.msg').empty().append(`<p style="text-align:center;margin-top20px;color:#ccc;">暂无数据</p>`);
  }
}
AJAX("GET",storage,'/api/admin/alone/getallalone',{"regionId":"","serviceType":"","rank":"","coachName":""},coachList);


// 请求地区列表
function snowAddress(json) {
  if(json.code == 0){
    $('.qu').empty();
    $('.qu').append(`<option value="">全部</option>`);
    $.each(json.data,function (index,value) {
      $('.qu').append(`<option value="${value.id}">${value.name}</option>`);
    });
  }else{

  }
}
AJAX("GET",storage,REYURNURL(SNOWADDRESS),{},snowAddress);

// 分页
//   $('#id').jqPaginator({
//     totalPages: 1, // 总条目
//     visiblePages: 5, // 显示的页码数
//     currentPage: 1, // 默认页码数
//
//     first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
//     prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
//     next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
//     last: '<li class="last"><a href="javascript:void(0);">末页</a></li>',
//     page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
//     onPageChange: function (num) {
//         $('#text').html('当前第' + num + '页');
//
//     }
// });
// 列表页的状态修改按钮
$('.table table tbody').on('click','tr td .editStatus',function () {
    var coachId = $(this).parent().parent().find('td:first-of-type').attr('value');
    $('.coachId').attr('value',coachId);
    var status = $(this).parent().parent().find('td:nth-of-type(7)').html();
    if(status == '上架'){
      $('.coachStatus option:first-of-type').attr("selected",true);
    }else if (status == '下架') {
      $('.coachStatus option:last-of-type').attr("selected",true);
    }
});

// 状态修改的确定按钮
function editStatus(json) {
  if(json.code == 0){
    alert("修改成功");
    shadowHide();
    // 重新请求列表
  AJAX("GET",storage,'/api/admin/alone/getallalone',{"regionId":"","serviceType":"","rank":"","coachName":""},coachList);

  }
}
$('.sure').on('click',function () {
  var coachId = $('.coachId').attr('value');
  var coachStatus = $('.coachStatus').val();
  AJAX('POST',storage,'/api/admin/alone/updatestatus',{"aloneId":coachId,"aloneStatus":coachStatus},editStatus);
});


// 内容修改
$('.table table tbody ').on('click',' tr td .infoEdit',function () {
  var coachId = $(this).parent().parent().find('td:first-of-type').attr('value');
  window.location.href="twocoach.html?coachId="+coachId;
});

//console.log(coachId)
$('.close').on('click',function(){
    var coachId = $(this).parent().parent().find('td:first-of-type').attr('value');
  var con = confirm("是否确定删除");
                 if(con == true){
                  AJAX("POST",storage,'/api/admin/alone/delalone',{'aloneId':coachId},function json(date){
                    if(date.code==0){
                      alert('删除成功')
                      AJAX("GET",storage,'/api/admin/alone/getallalone',{"regionId":"","serviceType":"","rank":"","coachName":""},coachList);

                    }
                  });
                 }else{
                
                 }
})

// 分类查询
// 雪区筛选
$('.qu').change(function () {
  var region = $('.qu').val();
  var coachType = $('.type').val();
  var coachRank = $('.coachType').val();
  var coachName = $('.search').val();
  AJAX("GET",storage,REYURNURL(SEARCHCOACH),{"regionId":region,"serviceType":coachType,"rank":coachRank,"coachName":coachName},coachList);

});
// 单双版筛选
$('.type').change(function () {
  var region = $('.qu').val();
  var coachType = $('.type').val();
  var coachRank = $('.coachType').val();
  var coachName = $('.search').val();
  AJAX("GET",storage,REYURNURL(SEARCHCOACH),{"regionId":region,"serviceType":coachType,"rank":coachRank,"coachName":coachName},coachList);

});
// 级别查询
$('.coachType').change(function () {
  var region = $('.qu').val();
  var coachType = $('.type').val();
  var coachRank = $('.coachType').val();
  var coachName = $('.search').val();
  AJAX("GET",storage,REYURNURL(SEARCHCOACH),{"regionId":region,"serviceType":coachType,"rank":coachRank,"coachName":coachName},coachList);

});
// 搜索
$('.search-btn').on('click',function () {
  var region = $('.qu').val();
  var coachType = $('.type').val();
  var coachRank = $('.coachType').val();
  var coachName = $('.search').val();
  AJAX("GET",storage,REYURNURL(SEARCHCOACH),{"regionId":region,"serviceType":coachType,"rank":coachRank,"coachName":coachName},coachList);

});
// 搜索框的键盘事件
$('.search').keyup(function () {
  var region = $('.qu').val();
  var coachType = $('.type').val();
  var coachRank = $('.coachType').val();
  var coachName = $('.search').val();
    if($('.search').val() == ''){
      // 重新请求列表
      AJAX("GET",storage,REYURNURL(SEARCHCOACH),{"regionId":region,"serviceType":coachType,"rank":coachRank,"coachName":coachName},coachList);
    }
});
