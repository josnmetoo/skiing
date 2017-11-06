      <template>
        <!-- <h1 @click="login()">这是登录页面，点我登录</h1> -->



        <div class="container">
          <div class="btn">
            <img src="../assets/xqb.png" class="uk" @click.stop.prevent="login()" />
            <img src="../assets/butt1.png" class="ku" />
            <span ></span>
          </div>
        </div>

      </template>

      <script>
        import Config from '../config/config.vue'

        export default {
          data() {
            return{
              code:'',
              arr2:""
            }
          },  created:function(){
                 var URL = window.location.href;
                       
            URL = URL.split("?")[1];
            URL = URL.split("=")[1];
            var cod= URL.split("&")[0];
            console.log(sessionStorage.getItem('cod2'))
            if (sessionStorage.getItem('cod2')!=cod) {
               var xid= sessionStorage.getItem('xid')
         
         
           var URL = window.location.href;
           if(URL.indexOf("code")>0){
            
            URL = URL.split("?")[1];
            URL = URL.split("=")[1];
            var cod= URL.split("&")[0];
            this.code=cod;
        sessionStorage.setItem('cod2',this.code);

            if(cod == '' || cod == undefined){
              return false;
            }else{
             this.$http.post(Config.api.poose,{code:this.code,type:0}).then(
              function(response){

               var res=response.data.data
                  // this.id=this.arr.sessionid
                   //console.log(this.id)
      console.log(response.data.data)
                   if(res.status==0){
                  sessionStorage.setItem('lnid',res.ticket_id);
                   sessionStorage.setItem('linshi',111);
                  sessionStorage.setItem('xid','30e82abf');
        }else{
                                             sessionStorage.setItem('xid',res.session_id);
                   this.$http.get(Config.api.info,{params:{'X-SESSION-ID':res.session_id},headers:{'X-SESSION-ID':res.session_id}}).then(
                    function(response){
                      var data = response.data.data;
                      this.arr2 = this.headImg(data);
                      console.log(this.arr2)
                      if(response.data.code==0){
                         zhuge.identify(this.arr2.uid, // 用户的id
                           {
                            "头像地址":this.arr2.purl,
                            "昵称":this.arr2.name
                          });


                      }


                    }, function(response){
                  // 响应错误回调
                })        

        }
    
                   console.log( res)
                  // 响应成功回调
                }, function(response){
                // 响应错误回调
              })
           }
         }else{
          return false;
        }
      

            }
        


//sessionStorage.setItem('xid','1e763d84b160412aa3910aaa717d0043');
                //sessionStorage.setItem('linshi',111);
        // var xid= sessionStorage.getItem('xid')
        


            // console.log(zhuge)

          },mounted:function () {
            $('.img').height($(window).height())
            var oBtn=document.querySelector('.btn')
       // alert(oBtn)
       oBtn.addEventListener('touchmove', function (event) {
        event.preventDefault();
      }, false);
      },
      methods:{
        login() {

          const self = this;
          self.$router.push('/home/hot?index='+'0');
          
        }
      }


      }
      </script>

      <style scoped>
        .uk{
          width: 6rem;
          position: absolute;

          height: 2.2rem;
          margin-left: -3rem;
          bottom: 2.5rem;
          
          
          left: 50%;
          
        }
        .ku{
          width: 9.7rem;
          height: 3.1rem;
          position: absolute;
          top: 50%;
          margin-top:-3rem;
          left: 50%;
          margin-left: -4.78rem;

        }
          .container{
          position: fixed;
          top: 0px;
          left: 0px;
          top: 0px;
          bottom: 0px;
          background-color: rgba(175,194,206,0.5);
          z-index: -1;
          width: 100%;
          height: 100%;
          background: #fff;
          text-align: center;
        }
        .btn{
          width: 100%;
          height: 100%;
          position: fixed;
          top:0;
          bottom: 0;
          z-index: 1;
        }
        *{
          margin:0;
          padding: 0px;
        }

        body{
         margin:0px !important;
       }
       a{
        text-decoration: none;
      }

      </style>
