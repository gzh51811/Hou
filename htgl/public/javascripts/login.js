$(function(){

    $(".loginbtn").on("click",function(){

            var username = $(".username").val();
            var pwd = $(".password").val();

            $.ajax({
                type:"post",
                url:"http://localhost:3000/login",
                data:{
                    username,
                    pwd, 
                },
                async:true,
                success:function(str){    
                   var sttr = JSON.stringify(str);
                    if(str.code == 200){
                        document.cookie = "username="+str.Administrator;
                        location.href="http://localhost:3000/html/list.html";
                    }else{
                        alert("用户名密码有误");
                    }

                    localStorage.setItem("user",sttr);
                }
            })

            







    });











});