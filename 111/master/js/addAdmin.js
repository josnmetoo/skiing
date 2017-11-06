console.log(storage);

function adminList(json) {
  if(json.code == 0){
    $('.table table tbody').empty();
    $.each(json.data,function (index,value) {
      $('.table table tbody').append(` <tr>
          <td>${value.name}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>`);
    })
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html"
  }else{
    alert("信息输入有误");
  }
}
// 生成 管理员列表内容
AJAX("GET",storage,REYURNURL(ADMINLIST),{},adminList);


// 创建管理员
$('.addBtn').click(function () {
  var account = $('.acount').val();
  var password = $('.pwd').val();
  var allowip = $('.ip').val();
  var adminName = $('.adminName').val();
  var gid = '0';
  var obj = {};
  obj.account = account;
  obj.password = password;
  obj.allowip = allowip;
  obj.name = adminName;
  obj.gid = gid;
  var adminArr = [];
  adminArr.push(obj);
  $.ajax({
    type:"POST",
    headers:{
        'X-SESSION-ID': storage,
        'Content-Type': 'application/json;charset=UTF-8'
    },
    cache: false,
    url:REYURNURL(ADDADMIN),
    data:JSON.stringify(adminArr),
    success:function (json) {
      console.log(json);
      if(json.code == 0){
        alert("创建成功");
        AJAX("GET",storage,REYURNURL(ADMINLIST),{},adminList);
      }else if(json.code == 100){
        alert("您的会话已过期，请重新登录");
        window.location.href="../index.html"
      }
    },
    error:function () {
        alert("网络连接错误");
    }
  });
});
