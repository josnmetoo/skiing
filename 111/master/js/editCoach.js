var ue = UE.getEditor('container');
var ue2 = UE.getEditor('container2');
var ue3 = UE.getEditor('container3');
// 展示不展示下面的富文本
$('.ban').change(function () {
  var thisValue = $(this).val();
    if(thisValue == 2){
      $('.editor3').show();
      $('.editorspan').html("单板介绍");
    }else{
      $('.editor3').hide();
      $('.editorspan').html("个人介绍");
    }
});


//教练电话的正则判断
var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/; // 判断电话



// var number  = /^\d*\.{0,1}\d{0,1}$/; // 只能是数字
//
// $('.payMoney').blur(function () {
//     var money = $('.payMoney').val();
//     if(!number.test(money)){
//       alert("培训费用只能输入数字");
//       $('.payMoney').val('');
//     }
// });


// 请求地区列表
function snowAddress(json) {
  if(json.code == 0){
    $('.qu').empty();
    $.each(json.data,function (index,value) {
      $('.qu').append(`<option value="${value.id}">${value.name}</option>`);
    });
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




var headImg = '';
var backgroundImage = '';
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
        $('.imgUrl2').html(headImg);
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
        $('.imgUrl2').html(backgroundImage);
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


// 获取详情在页面展示出来
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
var id = getQueryString("coachId");


function coachInfo(json) {
  if(json.code == 0){
    var data = json.data;
      console.log(data);
      $('.coachName').val(data.coachName);
      $('.coachSex option').each(function (index,value) {
        if($(value).attr('value') == data.coachSex){
          $(this).attr("selected",true);
        }
      });
      //图片
      headImg = data.portrait;
      $('.imgUrl1').attr("src",headImg);
      backgroundImage = data.backdrop;
      $('.imgUrl2').attr("src",backgroundImage);
      $('.coachPhone').val(data.coachPhone);
      $('.qu option').each(function (index2,value2) {
        if($(value2).attr('value') == data.region){
          $(this).attr("selected",true);
        }
      });
      // 回显教练标签
      if(data.labelIds == null){

      }else{
        $('.lable p input[type="checkbox"]').each(function (index,value) {
          for(var j=0;j<data.labelIds.length; j++){
            if($(value).attr('value') == data.labelIds[j]){
              $(this).prop('checked',true);
            }
          }
        });
      }
      // 回显教练职务
      $('.Czhi').val(data.coachJob);


      $('.payMoney').val(data.ojtPrice);
      if(data.coachType == 2){
        $('.editor3').show();
        $('.editor2').show();
        $('.editor2 .editorspan').html("单板介绍");
      }else if(data.coachType == 1){
        $('.editor3').show();
        $('.editorspan').html("个人介绍");
        $('.editor2').hide();
      }else if(data.coachType == 0){
        $('.editor3').hide();
        $('.editor2').show();
        $('.editorspan').html("个人介绍");
      }
      $('.ban option').each(function (index,value) {
        if($(value).attr('value') == data.coachType){
          $(this).attr("selected",true);
        }
      });

      $('.coachType option').each(function (index,val) {
        if($(val).attr('value') == data.coachRank){
          $(this).attr("selected",true);
        }
      });

      $(function(){
            window.setTimeout(setContent,1000);//一秒后再调用赋值方法
        });

        //给ueditor插入值
        function setContent(){
            ue.execCommand('insertHtml', data.coachIntro);
            ue2.execCommand('insertHtml', data.coachGlory);
            ue3.execCommand('insertHtml', data.coachGloryTwo);
        }
  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else{

  }
}

AJAX('GET',storage,REYURNURL(COACHDETAIL),{"coachId":id},coachInfo);

// 确定按钮
function addCoach(json) {
  if(json.code == 0){
    console.log(json.data);
    alert("修改成功");
    window.location.href = "coachhandle.html";
  }else if(json.code == 3003){
    alert("该手机号已经被添加过，请更换手机号添加教练");
  }
}

$('.sure').on('click',function () {
    var coachName = $('.coachName').val(); // 教练姓名
    var coachSex = $('.coachSex').val(); // 教练性别
    var portrait =headImg; // 头像
    var coachPhone = $('.coachPhone').val(); // 电话
    var region = $('.qu').val(); // 雪区
    var coachType = $('.ban').val(); // 教练类型
    var coachRank = $('.coachType').val();// 教练级别
    var ojtPrice = $('.payMoney').val(); // 培训价格
    var backdrop = backgroundImage; // 背景图
    var coachJob = $('.Czhi').val(); // 教练职务
    var lableArr = [];
    if(!reg.test(coachPhone)){
        alert('请输入正确的手机号');
        $('.coachPhone').val('');
    }
    $('.lable p input[type="checkbox"]').each(function (index,value) {
      if ($(value).prop('checked') == true) {
        var thisId = $(this).attr('value');
        lableArr.push(thisId);
      }
    });
    lableArr = lableArr.join(',');
    var coachIntro,coachGlory,coachGloryTwo;
        ue.ready(function() {
          coachIntro = ue.getContent();
          coachGlory = ue2.getContent();
          coachGloryTwo = ue3.getContent();
          console.log(coachIntro,coachGlory,coachGloryTwo);
        });
    if(coachName == '' || portrait == '' || coachPhone == '' ){
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
      if(coachType == 0){
        obj.coachGlory = coachGlory;
      }else if(coachType == 2){
        obj.coachGloryTwo = coachGloryTwo;
        obj.coachGlory = coachGlory;
      }else if (coachType == 1) {
        obj.coachGloryTwo = coachGloryTwo;
      }
      obj.coachId = id;
      obj.labelIds = lableArr;
      AJAX('POST',storage,REYURNURL(EDITCOACHINFO),obj,addCoach);
    }

});
