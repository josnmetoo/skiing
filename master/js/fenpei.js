// 请求教练列表
function coachList(json) {
  $('.table table tbody').empty();
  if(json.code == 0){
    $('.msg').empty();
    console.log(json.data.coachAllInfo);
    var data = json.data.coachAllInfo;
    console.log(data);
    $.each(data,function (index,value) {
      $('.table table tbody').append(`<tr>
          <td><input type="checkbox" name="" value="${value.coachId}" class="checkBox"></td>
          <td>${value.coachName}</td>
          <td>${value.coachSex}</td>
          <td>${value.region}</td>
          <td>${value.coachType}</td>
          <td>${value.coachRank}</td>
        </tr> `);
    });

  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else if(json.code == '3001'){
    $('.msg').empty().append(`<p style="text-align:center;margin-top20px;color:#ccc;">暂无数据</p>`);
  }
}
AJAX("GET",storage,REYURNURL(SEARCHCOACH),{"regionId":"","serviceType":"","rank":"","coachName":""},coachList);


// 请求展示出哪个被选中
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
  var scheduleid = getQueryString('id');
  function listShow(json) {
    if(json.code == 0){
      console.log(json.data);
      $.each(json.data,function (index,value) {
        $('.table table tbody tr td:first-of-type input[type="checkbox"]').each(function (index2,value2) {
            if($(value2).attr('value') == value.coachid){
              $(this).prop('checked',true);
            }
        });
      })
    }
  }
AJAX('GET',storage,REYURNURL(DIAODULIST),{"scheduleid":scheduleid},listShow);


//复选框只能选择两个
var boxArr = [];
$('.table table tbody').on('click','tr td:first-of-type .checkBox',function () {
    boxArr.length = 0;
  $('.table table tr td:first-of-type .checkBox').each(function (index,value) {
      if($(value).prop('checked') == true){
        boxArr.push($(this).attr('value'));
      }
  });
});

// 确定添加按钮
function add(json) {
  if(json.code == 0){
    alert("添加成功");
    window.location.href="diaodu.html";
  }else{
    alert("添加失败");
  }
}
$('.addCoach').on('click',function () {

  if(boxArr.length >2){
    alert("一个雪场最多分配两个教练");
  }else{
    // 遍历被选中的 复选框， 得到对应的ID
    var idStr = boxArr.join(',');
    AJAX('POST',storage,REYURNURL(SUREDIAO),{"scheduleid":scheduleid,"coachids":idStr},add);
  }
})
