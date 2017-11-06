// 获取到登录名， 然后给头部赋值
$('.handlelist p .userName').html("管理员");


// 获取 sessionid
var storage = localStorage.getItem('id');
console.log("libJS："+storage);
