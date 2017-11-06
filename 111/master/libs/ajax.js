
function AJAX(type,id,url,data,callback) {
    $.ajax({
      type:type,
      headers: {
          'X-SESSION-ID': id,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      dataType: "json",
      url:url,
      async: false,
      data:data,
      cache:false,
      success:eval(callback),
      error:function (error) {
          alert("请检查网络");
      }
    });
}
