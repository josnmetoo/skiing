  <template>
    <div class="jk">
      <div id="text" ></div>
      <div class="conent"></div>
      <div class="heard none">
        <input type="tex" id='val'></input>
        <span id="send">发送</span>
      </div>
      <div class="dio"></div>
    </div>
  </template>

  <script>
    import Config from '../../config/config.vue'
    export default {
      data () {
        return {
          arr:[],
          websocket:'',
          sessionId:"",
          to_id:'',
          arr2:''
        }
      },created:function(){


      },
      mounted: function(){
       var sid=sessionStorage.getItem('xid');
       this.sessionId=sid
       var that=this

       var sessionId = that.sessionId;
       var userId = "";
       var userAvatar = "";
       var userNickname = "";

      // 客服信息
      var customerId = "";
      var customerAvatar = "./static/bgimg/kefu.png";
      var customerNickname = "客服小于";

      // 是否加载同步
      var loadSync = false;

      var websocket = function() {
        var target = 'ws://'+window.location.host+'/api/customer/0/'+sessionId;
        if ('WebSocket' in window) {
          return new WebSocket(target);
        } else if ('MozWebSocket' in window) {
          return new MozWebSocket(target);
        } else {
          alert('WebSocket is not supported by this browser.');
        }
      }();

      websocket.onmessage = function(data) {
        var data = JSON.parse(data.data);
          // 连接会话
          if (data.type == "0") {
            userId = data.data.id;
            userAvatar = data.data.avatar;
            userNickname = data.data.nickname;
            var info = {};
            info.id = userId;
            websocket.send(toMessage("0", info));
          }
          // 分配成员
          if (data.type == "1") {
            var time = setInterval(function() {
              if (loadSync) {
                clearInterval(time);
                customerId = data.data;
                if (customerId) {
                  var info = {};
                  info.id = data.data;
                  websocket.send(toMessage("1", info));
                  $("#text").append("<p class='centeri'>已为您分配客服</p>");
                } else {
                  $("#text").append("<p class='centeri'>客服不在线,您可以留言说明内容</p>");
                }
              }
            }, 1000);
          }
          // 移除成员
          if (data.type == "2") {
            customerId = "";
            $("#text").append("<p class='centeri'>客服已下线,您可以留言说明内容</p>");
          }
          // 聊天消息
          if (data.type == "3") {
            showMessage(data.data.id, customerAvatar, customerNickname, data.data.content);
          }
          // 同步数据
          if (data.type == "4") {
            var records = data.data.records;
            if(records) {
              for (var i = 0; i < records.length; i++) {
                if (records[i].id == userId) {
                  showMessage(userId, userAvatar, userNickname, records[i].content);
                } else {
                  showMessage(customerId, customerAvatar, customerNickname, records[i].content);
                }
              }
            }
            loadSync = true;
          }
          // 获取成员资料信息
          if (data.type == "5") {
            setTimeout(function() {
              showMessage(customerId, customerAvatar, customerNickname, "您好,很高兴为您服务");
            }, 1000);
          }
        }

      // 绑定发送
      var onSend = function() {

        $("#send").on("click", function() {
            //alert(1)
            function isNull( str ){
              if ( str == "" ) return true;
              var regu = "^[ ]+$";
              var re = new RegExp(regu);
              return re.test(str);
            }
            if(isNull($('#val').val())){
             alert("输入的内容不能为空")
             return false;
           }
           function isNull( str ){
            if ( str == "" ) return true;
            var regu = "^[ ]+$";
            var re = new RegExp(regu);
            return re.test(str);
          }
          console.log($("#val").val())
          var data = {};
          data.content = $("#val").val();
          data.id = customerId;
          showMessage(userId, userAvatar, userNickname, $("#val").val());
          websocket.send(toMessage("2", JSON.stringify(data)));
          $("#val").val('')
        });
      }();
      var toMessage = function(type, data) {
        var result = {};
        result.type = type;
        result.data = data;
        return JSON.stringify(result);
      }
        var showMessage = function(id, avatar, nickname,text) {
        var reg = new RegExp('\\[\/(.+?)\\]',"g");
        var ss =  text.replace(reg,"<img style='height:1rem;vertical-align: top' src='/emoji/emoji_$1.png'/>");
        var el=$('<div></div>')
        el.html(ss)
        setTimeout(function(){
          document.body.scrollTop = document.body.scrollHeight;
        },300);
        if(id==userId){

         $("#text").append("<div class='kuk'><img class='png' src='"+avatar+"'><p class='right'>"+el.html()+"</p>"+"<div class='element'></div></div>");

       }else{
        $("#text").append("<div class='kuk'><img class='png1' src='"+avatar+"'><p class='left'>"+el.html()+"</p><div class='element1'></div></div>");
      }

    }
  },
  methods:{

  }
  }
  </script>
  <style>
    .centeri{

      text-align: center;
      font-size: 0.6rem;
      color: #ccc;
      margin-bottom: 0.5rem;
    }
    .kuk{
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .dio{
     height:2.45rem;
   }
   .element1{
    z-index: -19;
    width: 0px;
    height: 0px;
    border-top: 0.4rem solid #ededed;
    position: absolute;
    border-bottom: 0.4rem solid #ededed;
    border-right:0.4rem solid #fff;
    position: absolute;
    top: 0.3rem;
    left: 15.1vw;
  }
  .png1{
   width: 2rem;
   height: 2rem;

   float: left;
   margin-left: 0.5rem;
  }
  .left{
    word-wrap: break-word;

    position: relative;
    z-index:2;
    float: left;
    max-width:70%;
    font-size: 0.7rem;
    /* width: 50%; */
    margin-left: 0.7rem;
    background: #fff;
    border-radius: 5px;
    line-height: 1rem;
    font-size: 0.7rem;
    padding: 0.4rem;
    margin-bottom: 0.5rem;
    color: #000;
  }
  .element {
    z-index: -19;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 0.3rem;
    right: 15.1vw;
    border-top: 0.4rem solid rgb(237, 237, 237);
    border-bottom: 0.4rem solid rgb(237, 237, 237);
    border-left: 0.4rem solid rgb(123, 210, 186)
  }
  .png{
   width: 2rem;
   height: 2rem;
   border-radius:50%;
   float: right;
   margin-right: 0.5rem;
  }
  .right{
    word-wrap: break-word;
    z-index:2;
    float: right;
    max-width:70%;
    font-size: 0.7rem;
    /* width: 50%; */
    margin-right: 0.7rem;
    background: RGB(123,210,186);
    border-radius: 5px;
    line-height: 1rem;
    font-size: 0.7rem;
    padding: 0.4rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  #text{
    width: 100%;
    margin-top: 1rem;
    overflow: hidden;
    position: relative;
  }

  *{
    margin:0;
    padding: 0
  }
  .jk{
    position: relative;
  }
  .heard{
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .none{
    width: 100%;
    height:2.45rem;
    background: #fff;
    overflow: hidden;
    z-index: 999
  }
  #val{
   background:#ededed;
   outline:none;
   border:0px;
   width: 11.75rem;
   height:1.75rem;
   margin:0.35rem 0 0 0.7rem;
   float: left;
   border-radius: 5px ;
   color: #666;
   padding-left: 1rem;
  }
  .none span{
    float: right;
    height: 1.75rem;
    width:3.7rem;
    background:RGB(123,210,207);
    margin-top: 0.35rem;
    margin-right: 0.775rem;
    border-radius: 5px ;
    text-align: center;
    line-height: 1.95rem;
    color: RGB(255,255,255);
    font-size: 0.75rem
  }
  </style>
