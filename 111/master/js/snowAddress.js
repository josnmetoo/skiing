// 请求地区列表
function snowAddress(json) {
  if(json.code == 0){
    $('.table1 table tbody').empty();
    $('.qu').empty();
    $.each(json.data,function (index,value) {
      $('.table1 table tbody').append(`<tr>
        <td>${value.id}</td>
        <td>${value.name}</td>
      </tr>`);

      $('.qu').append(`<option value="${value.id}">${value.name}</option>`);

    });
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}
AJAX("GET",storage,REYURNURL(SNOWADDRESS),{},snowAddress);
//创建雪区
function addSnowAddress(json) {
  if(json.code == 0){
    console.log(json.data);
    alert("创建成功");
    $('.address1').val('');
    AJAX("GET",storage,REYURNURL(SNOWADDRESS),{},snowAddress);
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}
$('.addbtn1').on('click',function () {
  var name = $('.address1').val();

  var longitude = $('.address2').val();
  var latitude = $('.address3').val();
  AJAX('POST',storage,REYURNURL(ADDSNOWADDRESS),{"name":name,"longitude":longitude,"latitude":latitude},addSnowAddress)
});


// 获取场地列表
function placeList(json) {
  if(json.code == 0){
    console.log(json.data);
    $('.table2 table tbody').empty();
    $.each(json.data,function (index2,value) {
      $('.table2 table tbody').append(`<tr>
        <td>${value.id}</td>
        <td>${value.name}</td>
      </tr>`);
    });
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}
var firstRid = $('.qu option:selected').attr('value');
AJAX("GET",storage,REYURNURL(PLACELIST),{"rid":firstRid},placeList);


// 改变下拉框得到不同的列表
var rid;
$('.qu').change(function () {
     rid = $('.qu option:selected').attr('value');
    AJAX("GET",storage,REYURNURL(PLACELIST),{"rid":rid},placeList);
});
// 创建场地
function addPlace(json) {
  if(json.code == 0){
    console.log(json.data);
    alert("创建成功");
    $('#address2').val('');
    AJAX("GET",storage,REYURNURL(PLACELIST),{"rid":rid},placeList);
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}
$('.addbtn2').on('click',function () {
  var name = $('#address2').val();
  rid = $('.qu option:selected').attr('value');
  AJAX("POST",storage,REYURNURL(PLACEADD),{"rid":rid,"name":name},addPlace);
});
