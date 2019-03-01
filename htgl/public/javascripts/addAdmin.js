$(function(){
  
   
    $("#confirmBtn").on("click",function(){
            var username = $("#username").val();
            var nicheng = $("#nicheng").val();
            var city = $("#city").val();
            var pwd = $("#pwd").val();
            var confirmPwd = $("#confirmPwd").val();
            var sex = $("#sex").val();
            var kc = $("#kc").val();

            var isok = true;
           if(isok){
                if(username){
                    $(".namespan").css("display","none");
                    if(nicheng){
                        $(".nispan").css("display","none");
                        if(pwd){
                            $(".pws").css("display","none");
                          if(pwd == confirmPwd ){
                              isok = !isok;
                          }else{
                              alert("密码不一致");
                          }
                        }else{
                            $(".pws").text("请输入您的密码");
                            $(".pws").css("display","line-bolck");       
                        }
                    }else{
                        $(".nispan").text("请输入您的昵称");
                        $(".nispan").css("display","line-bolck");    
                    }
                }else{
                    $(".namespan").text("请输入用户名");
                    $(".namespan").css("display","line-bolck");
                }

           }


           if(!isok){              
                       $.ajax({
                            type:"post",
                            url:"http://localhost:3000/addAdmin",
                            data:{
                                username,
                                nicheng,
                                city,
                                pwd,
                                sex,
                                kc,
                            },
                            success:function(str){
                                console.log(str.code);
                              if(str.code == 200){
                                //   location.href="http://localhost:3000/html/login.html";
                              }else{
                                  alert(str.msg);
                                  location.search;
                              }
                            }
                        });    
              
                }  
    });          
               
            $("#username").on("change",function(){
                     var username = $("#username").val();                    
                            $.ajax({
                                type:"get",
                                url:"http://localhost:3000/addAdmin",
                                data:{
                                    username
                                },
                                success:function(str){
                                   if(str.code == 100){
                                    $(".namespan").text("该用户名已注册请重新输入");
                                    $(".namespan").css("color","#f00");
                                    $("#username").val("");
                                   }else{
                                     $(".namespan").text("");
                                   }
                                }
                        });    

                    });
             


               $(".qxzBtn").on("click",function(){
                    $(".box").css("display","block");
                
                     $(".man").on("click",function(){
                         var man =  $(".man").text();
                         $(".gender").val(man); 
                         $(".box").css("display","none");
                         
                     });
                     $(".woman").on("click",function(){
                        var woman =  $(".woman").text();
                        $(".gender").val(woman); 
                        $(".box").css("display","none");
                        
                    });

               }) 


});