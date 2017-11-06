
var ue = UE.getEditor('container');
var ue2 = UE.getEditor('container2');
var ue3 = UE.getEditor('container3');
//教练电话的正则判断
var reg = /^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[0589]\d{7}$/; // 判断电话




// 请求地区列表
function snowAddress(json) {
  if(json.code == 0){
    $('.qu').empty();
    $.each(json.data,function (index,value) {
      $('.qu').append(`<option value="${value.id}">${value.name}</option>`);
    });
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }
}

$('.qu').on('change',function(){
  $('.cd').html('')
 
  AJAX("GET",storage,'/api/common/region/sites',{regionId: $('.qu').val()},function(json){
     if(json.code == 0){
    $('.cd').append(`<p>请选择场地：</p>`);
      var data = json.data;
      console.log(data);
      $.each(data,function (index,value) {
        $('.cd').append(`<p><input type="checkbox" name="" value="${value.id}" class="labeldian${value.id}">${value.name}</p>`);
      });
  }else{

  }
  });
})
AJAX("GET",storage,REYURNURL(SNOWADDRESS),{},snowAddress);
AJAX("GET",storage,'/api/common/region/sites',{regionId: $('.qu').val()},function(json){
     if(json.code == 0){
    $('.cd').append(`<p>请选择场地：</p>`);
      var data = json.data;
      console.log(data);
      $.each(data,function (index,value) {
        $('.cd').append(`<p><input type="checkbox" name="" value="${value.id}" class="labeldian${value.id}">${value.name}</p>`);
      });
  }else{

  }
  });
// 教练级别下拉框
function coachRank(json) {
  if(json.code == 0){
    $('.coachType').empty();
    $.each(json.data.rank,function (index,value) {
      $('.coachType').append(`<option value="${value.rankId}">${value.rankName}</option>`);
    });
  }
}
AJAX("GET",storage,REYURNURL(COACHRANK),{},coachRank);

// 教练标签接口
function allLable(json) {
  $('.lable').empty();
  if(json.code == 0){
    $('.lable').append(`<p>请选择教练标签：</p>`);
      var data = json.data;
      console.log(data);
      $.each(data,function (index,value) {
        $('.lable').append(`<p><input type="checkbox" name="" value="${value.labelid}" class="labeldian${value.labelid}">${value.lablename}</p>`);
      });
  }else{

  }
}
AJAX('GET',storage,REYURNURL(GETLABLE),{},allLable);


var headImg;
var backgroundImage;
// 上传图片
function uploadEdieFile(file){
  var formdata = new FormData();
  formdata.append('file',file);
  $.ajax({
    url:REYURNURL(UPLOADIMG),
    type:'POST',
    data:formdata,
    processData:false,
    contentType:false,
    success:function(json){
      console.log(json);
      if(json.code == 0){
        headImg = json.data.url;
        alert("上传成功");
      }
    },error:function(){
      alert("网络连接错误");
    }
  });
}
function uploadEdieFile2(file){
  var formdata = new FormData();
  formdata.append('file',file);
  $.ajax({
    url:REYURNURL(UPLOADIMG),
    type:'POST',
    data:formdata,
    processData:false,
    contentType:false,
    success:function(json){
      console.log(json);
      if(json.code == 0){
        backgroundImage = json.data.url;
        alert("上传成功");
      }
    },error:function(){
      alert("网络连接错误");
    }
  });
}
var file1 = document.querySelector('.file1');
var file2 = document.querySelector('.file2');
file1.onchange = function (e) {
      var fileUploadControl = file1.files[0];
      if (file1.files.length > 0) {
        var file = file1.files[0];
            uploadEdieFile(file);
	    }
  }
file2.onchange = function (e) {
      var fileUploadControl = file2.files[0];
      if (file2.files.length > 0) {
        var file = file2.files[0];
            uploadEdieFile2(file);
	    }
  }
// 确定按钮
function addCoach(json) {
  if(json.code == 0){
    console.log(json.data);
    alert("创建成功");
    window.location.href = "coachhandle.html";
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else if(json.code == 3003){
    alert("该手机号已经被添加过，请更换手机号添加教练");
  }else if(json.code==3001){
    alert('请选择场地')
  }
}
var number = /^\d*\.{0,1}\d{0,1}$/;


$('.sure').on('click',function () {
    var coachName = $('.coachName').val(); // 教练姓名
    var coachSex = $('.coachSex').val(); // 教练性别
    var portrait =headImg; // 头像
    var coachPhone = $('.coachPhone').val(); // 电话
    var region = $('.qu').val(); // 雪区
    var coachType = $('.ban').val(); // 教练类型
    var coachRank = $('.coachType').val();// 教练级别
    var ojtPrice = $('.payMoney').val(); // 培训价格
    var coachJob = $('.Czhi').val(); // 教练职务
    // if(!number.test(ojtPrice)){
    //   alert("价格必须是数字");
    //   $('.payMoney').val('');
    // }
    var backdrop = backgroundImage; // 背景图
    var lableArr = [];
    var siteIds=[];
    if(!reg.test(coachPhone)){
        alert('请输入正确的手机号');
        $('.coachPhone').val('');
    }else{
      $('.lable p input[type="checkbox"]').each(function (index,value) {
        if ($(value).prop('checked') == true) {
          var thisId = $(this).attr('value');
          lableArr.push(thisId);
        }
      });
 $('.cd p input[type="checkbox"]').each(function (index,value) {
        if ($(value).prop('checked') == true) {
          var thisId = $(this).attr('value');
          siteIds.push(thisId);
        }
      });
      siteIds=siteIds.join(',')
      lableArr = lableArr.join(',');
      var coachIntro,coachGlory,coachGloryTwo;
          ue.ready(function() {
            coachIntro = ue.getContent();
            coachGlory = ue2.getContent();
            coachGloryTwo = ue3.getContent();
            // console.log(coachIntro,coachGlory,coachGloryTwo);
          });
      if(coachName == ''|| coachPhone == "" || ojtPrice ==''){
        alert("请填写完整教练信息");
      }else{
        var obj = {};
        obj.coachName = coachName;
        obj.coachSex = coachSex;
        obj.portrait = portrait;
        obj.coachPhone = coachPhone;
        obj.region = region;
        obj.coachType = coachType;
        obj.coachRank = coachRank;
        obj.ojtPrice = ojtPrice;
        obj.backdrop = backdrop;
        obj.coachIntro = coachIntro;
        obj.coachJob = coachJob;
        obj.siteIds=siteIds
        if(coachType == 0){
          obj.coachGlory = coachGlory;
        }else if(coachType == 2){
          obj.coachGloryTwo = coachGloryTwo;
          obj.coachGlory = coachGlory;
        }else if (coachType == 1) {
          obj.coachGloryTwo = coachGlory;
        }
        obj.labelIds = lableArr;
        AJAX('POST',storage,REYURNURL(ADDCOACH),obj,addCoach);
    }
    }

});


// 确定按钮
// $('.sure').click(function () {
//     var text = ue.getContentTxt();
//     ue.ready(function() {
//       var html = ue.getContent();
//       alert(html);
//     });
//
// });
