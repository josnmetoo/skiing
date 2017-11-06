
var ue = UE.getEditor('container');
var ue2 = UE.getEditor('container2');
var ue3 = UE.getEditor('container3');
//教练电话的正则判断





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
AJAX("GET",storage,REYURNURL(SNOWADDRESS),{},snowAddress);
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
    window.location.href = "two.html";
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else if(json.code == 3003){
    alert("该手机号已经被添加过，请更换手机号添加教练");
  }
}



$('.sure').on('click',function () {
    var coachName = $('.coachName').val(); // 教练姓名
    var coachSex = $('.coach').val(); // 次数
     var coach = $('.coac').val(); // 教练性别
    var portrait =headImg; // 头像
  
    var region = $('.qu').val(); // 雪区
    var coachType = $('.ban').val(); // 教练类型
    var coachRank = $('.coachType').val();// 教练级别
    var ojtPrice = $('.payMoney').val(); // 培训价格
   
    // if(!number.test(ojtPrice)){
    //   alert("价格必须是数字");
    //   $('.payMoney').val('');
    // }
    var backdrop = backgroundImage; // 背景图
    var lableArr = [];
  
      $('.lable p input[type="checkbox"]').each(function (index,value) {
        if ($(value).prop('checked') == true) {
          var thisId = $(this).attr('value');
          lableArr.push(thisId);

        }
      });
       lableArr = lableArr.join(',');
var arr=lableArr ;
      console.log(lableArr)
      var coachIntro,coachGlory,coachGloryTwo;
          ue.ready(function() {
            coachIntro = ue.getContent();
            coachGlory = ue2.getContent();
            coachGloryTwo = ue3.getContent();
            // console.log(coachIntro,coachGlory,coachGloryTwo);
          });
      if(coachName == '' || ojtPrice ==''){
        alert("请填写完整教练信息");
      }else{
        var obj = {};
         obj.aloneReserve = coachSex;//默认次数
         obj.ojtPrice=ojtPrice//价格
        obj.aloneName = coachName;//一对一名字
         obj.regionId = region;//地区id
        
        obj.headUrl = portrait;//头像地址
        obj.labelIds = lableArr;//标签
        obj.pictureback = backdrop;//背景图
        obj.serviceType = coachType;//单双
        obj.maxCount=coach;//最大天数
        obj.rankId=coachRank//级别id
       
        
       
        
        
       
        
       
          obj.aloneIntro = coachIntro;
          obj.aloneGlory = coachGlory;
       
        
        console.log(arr)
        console.log(obj.labelIds)
        console.log(obj)
        AJAX('POST',storage,'/api/admin/alone/addalone',obj,addCoach);
    }
   

});

 // 状态修改弹窗
  $('.table table tbody').on('click','tr td:last-of-type',function () {
      $('.shadow').show();
      $('body').css("overflow","hidden");
  });


  $('.return').click(function () {
      shadowHide();
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
