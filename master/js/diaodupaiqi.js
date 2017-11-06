// 请求展示出哪个被选中
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
  var id = getQueryString('id');


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
            <td value="${value.id}"><button class="giveCoach">分配教练</button></td>
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
  AJAX('GET',storage,REYURNURL(SCHEDULELIST),{"groupid":id},paiqiList);

  // 分配教练
  $('.table table tbody').on('click','tr td .giveCoach',function () {
    var id = $(this).parent().attr('value');
      window.location.href = "fenpei.html?id="+id;
  });
