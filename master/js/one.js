
$('.time').on('click',function(){//加上时间搜索
	if($('.nee').val()==''){
		alert('请选择你想选的日期')
	}else{
		   $('.table table tbody').html('')
		  AJAX("GET",storage,'/api/admin/alone/getAllReserve',{reserveTime:new Date($('.nee').val()).getTime()},coachList);
	}
  //console.log(new Date($('.nee').val()).getTime())
})
function formatDate(now) { 
var year=now.getYear(); 
var month=now.getMonth()+1; 
var date=now.getDate(); 
var hour=now.getHours(); 
var minute=now.getMinutes(); 
var second=now.getSeconds(); 
return "20"+year+"-"+month+"-"+date 
} 
function coachList(json){
if(json.code==0){
	 var data = json.data;
    $.each(data,function (index,value) {
    	if(value.coachName==''){
    		value.coachName="未分配"
    	}
    	value.time=formatDate(new Date(value.time))
      $('.table table tbody').append(`  <tr>
      	<td value="${value.reserveId}">${value.name}</td>
          <td >${value.aloneName}</td>
           <td>${value.skateboardText}</td>
          <td>${value.userStatusText}</td>
          <td>${value.coachName}</td>
          <td>${value.createTime}</td>
          <td>${value.phone}</td>
           <td>${value.price}元</td>
            <td>${value.regionName} ${value.siteName}</td>
             <td>${value.time}</td>
            
           <td><button type="button" name="button" class="close">分配</button></td>
         
        
        </tr>`);
    });
}
}
 AJAX("GET",storage,'/api/admin/alone/getAllReserve',{reserveTime:''},coachList);//全部列表
$('.table table tbody ').on('click',' tr td .close',function () {
	//alert($(this).parent().parent().find('td:first-of-type').attr('value'))
	console.log($(this).parent().parent().find('td:first-of-type').attr('value'))

  var aloneReserveId= $(this).parent().parent().find('td:first-of-type').attr('value');
  window.location.href="onefen.html?onefenId="+aloneReserveId;
});
 
