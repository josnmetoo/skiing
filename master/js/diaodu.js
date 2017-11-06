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
          <td value="${value.id}"><button type="button" name="button" class="giveCoach">查看排期</button></td>
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


// 分配教练
$('.table table tbody').on('click','tr td .giveCoach',function () {
  var id = $(this).parent().attr('value');
    window.location.href = "diaodupaiqi.html?id="+id;
});
