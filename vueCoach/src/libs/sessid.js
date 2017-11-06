import AjaxConfig from "../ajaxConfig/ajaxConfig.vue"
let coachTokenr = AjaxConfig.api.coachToken;
export function sessid () {

  var userName = localStorage.getItem("userName");
  var coachToken = localStorage.getItem("coachToken");
  var stroge = localStorage.getItem("json");
  var logintime = localStorage.getItem("logintime");
  var sessionTime = localStorage.getItem("sessionTime");
  sessionTime = (parseFloat(sessionTime)/ 60 -1)*100;
  logintime = parseFloat(logintime);

  var nowTime = new Date().getTime(); // 获取到当前时间
  var cha =  nowTime - logintime;
  // sessionId 1小时过期， 1小时后重新请求sessionId   3540000毫秒是 59分钟
  //
  // console.log(nowTime);
  // console.log(logintime);
  // console.log(cha);
  if(cha > sessionTime){
    // 这时候已经差一分钟过期， 重新请求auth  令牌
    $.ajax({
      type:"post",
      async:false,
      url:coachTokenr,
      data:{
        "coachNumber":userName,
          "coachToken":coachToken
      },
      success:function (data) {
        if(data.code == 0){
        stroge.clear();
        localStorage.setItem("json",data.data.sessionId);
        }
      }
    });
  }else{
    // alert("未过期");
  }

}
