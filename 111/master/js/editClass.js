var ue = UE.getEditor('container');
var ue1 = UE.getEditor('container1');
var ue2 = UE.getEditor('container2');

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
  }else{

  }
}
AJAX("GET",storage,REYURNURL(SNOWADDRESS),{},snowAddress);

// 价钱必须是数字
// var number  = /^\d*\.{0,1}\d{0,1}$/; // 只能是数字
//
// $('.payMoney').blur(function () {
//     var money = $('.payMoney').val();
//     if(money == ''){
//
//     }else if(!number.test(money)){
//       alert("价格只能是数字");
//       $('.payMoney').val('');
//     }
// });

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
var groupid = getQueryString('id');

//单张图片
var dan='';
// 多张图片上传
var duoArr = [];



// 获取详情
function groupDetail(json) {
  if(json.code == 0){
    var data = json.data;
    console.log(data);
    $('.name').val(data.name);
    $('.payMoney').val(data.price);
    $('.ban option').each(function (index,value) {
      if($(value).attr('value') == data.typeid){
        $(this).prop('selected',true);
      }
    });
    dan = data.listimg;
    var imgList = data.detailsimgs;
    $('.showDan').attr('src',data.listimg);
    for(var i = 0; i< imgList.length; i++){
      duoArr.push(imgList[i]);
        $('.imgCon').append(`<div class="imgConlist"><img src="${imgList[i]}" /> <span class="delteImg">删除图片</span></div>`);
    }

    $('.qu option').each(function (index,value) {
      if($(value).attr('value') == data.regionid){
        $(this).prop('selected',true);
      }
    });


    $(function(){
            window.setTimeout(setContent,1000);//一秒后再调用赋值方法
        });
        //给ueditor插入值
        function setContent(){
            ue.execCommand('insertHtml', data.brief);
            ue1.execCommand('insertHtml', data.introduction);
            ue2.execCommand('insertHtml', data.notice);
        }

  }
}
AJAX('GET',storage,REYURNURL(GETGROUPDETAIL),{"groupid":groupid},groupDetail);

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
        dan = json.data.url;
        $('.showDan').attr('src',dan);
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
         duoArr.push(json.data.url);
        alert("上传成功,可以继续上传");
        $('.duoImg').val('');
        $('.imgCon').append(`<div class="imgConlist"><img src="${json.data.url}" /> <span class="delteImg">删除图片</span></div>`)
      }
    },error:function(){
      alert("网络连接错误");
    }
  });
}
var file1 = document.querySelector('.danImg');
var file2 = document.querySelector('.duoImg');
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


  $('.imgCon').on("mouseover",'.imgConlist',function () {
      $(this).find('span').fadeIn(100);
  });

  $('.imgCon').on("mouseout",'.imgConlist',function () {
      $(this).find('span').fadeOut(100);
  });

  // 点击删除
  $('.imgCon').on('click','.imgConlist span',function (e) {
      e.stopPropagation();
      e.preventDefault();
      $(this).parent().remove();
      var imgSrc = $(this).parent().find('img').attr('src');
      for(var i=0;i< duoArr.length;i++){
        if ( duoArr[i]==imgSrc) {
          duoArr.splice(i,1);
        }
      }
     
  });

// 确定按钮
function editJixun(json) {
  if(json.code == 0){
    alert("修改成功");
    window.location.href="jixun.html";
  }
}
$('.sure').on('click',function () {
    var name = $('.name').val();
    var servicetype = $('.ban').val();// 服务类型
    var regionid = $('.qu').val(); // 地区编号
    var price = $('.payMoney').val();
    var brief;// 简介
    var introduction; // 介绍
    var notice; //须知
    var listimg = dan; // 单张图片
    var detailsimgs = duoArr;
    detailsimgs = detailsimgs.join(',');
    ue.ready(function() {
      brief = ue.getContent();
      introduction = ue1.getContent();
      notice = ue2.getContent();
    });
    if(name == ''){
      alert("请填写服务名称");
    }else if(price == ''){
      alert("请去填写价格");
    }else if (brief == '' || introduction == '' || notice == '' || price == "") {
      alert("请填写完整内容");
    }else{
      var obj = {};
      obj.name = name;
      obj.regionid = regionid;
      obj.servicetype = servicetype;
      obj.price = price;
      obj.brief = brief;
      obj.introduction = introduction;
      obj.notice = notice;
      obj.groupid = groupid;
      obj.listimg =listimg;
      obj.detailsimgs = detailsimgs;
      AJAX('POST',storage,REYURNURL(EDITGROUP),obj,editJixun);
    }
});
