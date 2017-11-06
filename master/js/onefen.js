// 请求教练列表
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
  var scheduleid = getQueryString('onefenId');
function coachList(json) {
  $('.table table tbody').empty();
  if(json.code == 0){
    $('.msg').empty();
    console.log(json.data.coachAllInfo);
    var data = json.data
    console.log(data);
    $.each(data,function (index,value) {
      if(value.checkstatus){
        value.check='可分配'
        $('.colse').on('click',function(){
          alert(1)
        })
      }else{
        value.check="不可分配"
      }
      $('.table table tbody').append(`<tr>  
          <td name="" value="${value.coachId}">${value.coachName}</td>
          <td>${value.coachSexText}</td>
          
          <td>${value.coachRank}</td>
          <td>${value.check}</td>
           <td value="${value.checkstatus}"><button type="button" name="button" class="close">${value.check}</button></td>
        </tr> `);
      
    });

  }else if (json.code == 100) {
    alert("您的会话已过期，请重新登录");
    window.location.href="../index.html";
  }else if(json.code == '3001'){
    $('.msg').empty().append(`<p style="text-align:center;margin-top20px;color:#ccc;">暂无数据</p>`);
  }
}
AJAX("GET",storage,'/api/admin/alone/getAllcoachInfos',{aloneReserveId:scheduleid},coachList);

$('.close').on('click',function(){
  console.log($(this).parent().attr('value'))
  if($(this).parent().attr('value')=='true'){
   AJAX("POST",storage,'/api/admin/alone/allotcoach',{coachId:$(this).parent().parent().find('td:first-of-type').attr('value'),recerveId:scheduleid},function(date){
    if(date.code==0){
      alert('分配成功')
      window.location.href='one.html'
    }
   });
  }else{
    alert('此教练暂时不能分配，请选择其他教练')
  }
})
// // 请求展示出哪个被选中

//   function listShow(json) {
//     if(json.code == 0){
//       console.log(json.data);
//       $.each(json.data,function (index,value) {
//         $('.table table tbody tr td:first-of-type input[type="checkbox"]').each(function (index2,value2) {
//             if($(value2).attr('value') == value.coachid){
//               $(this).prop('checked',true);
//             }
//         });
//       })
//     }
//   }
// AJAX('GET',storage,REYURNURL(DIAODULIST),{"scheduleid":scheduleid},listShow);


// //复选框只能选择两个
// var boxArr = [];
// $('.table table tbody').on('click','tr td:first-of-type .checkBox',function () {
//     boxArr.length = 0;
//   $('.table table tr td:first-of-type .checkBox').each(function (index,value) {
//       if($(value).prop('checked') == true){
//         boxArr.push($(this).attr('value'));
//       }
//   });
// });

// // 确定添加按钮
// function add(json) {
//   if(json.code == 0){
//     alert("添加成功");
//     window.location.href="diaodu.html";
//   }else{
//     alert("添加失败");
//   }
// }
// $('.addCoach').on('click',function () {

//   if(boxArr.length >2){
//     alert("一个雪场最多分配两个教练");
//   }else{
//     // 遍历被选中的 复选框， 得到对应的ID
//     var idStr = boxArr.join(',');
//     AJAX('POST',storage,REYURNURL(SUREDIAO),{"scheduleid":scheduleid,"coachids":idStr},add);
//   }
// })
