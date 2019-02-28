$(function(){

    $(".loginbtn").on("click",function(){

            var username = $(".username").val();
            var password = $(".password").val();

            $.ajax({
                type:"post",
                url:"http://localhost:3000/login",
                data:{
                    username,
                    password, 
                },
                async:true,
                success:function(str){
                    if(str.code == 200){
                        alert("登录成功");
                    }else{
                        alert("用户名密码有误");
                    }
                }
            })

            







    });











});