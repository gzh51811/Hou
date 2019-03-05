

$(function(){
    
    $(".tj").on("click",function(){
        location.href="http://localhost:3000/html/addAdmin.html";

    });
    //隐藏用户添加
    var str =  document.cookie;
            
    var arr =  str.split("=");
    if(arr[1] == "Guest"){
        $(".unames").css("display","none");
    }else{
        $(".unames").css("display","block");
    }

   

    // 渲染所有用户
    $.ajax({
        type:"get",
        url:"http://localhost:3000/adminList",
        success:function(str){
           
                show(str);

        }
    });
    
    //单个删除按钮
    $('.users').on("click",".shanchu",function(){
        var yeye =  $(this).parent().parent();
         var username =  yeye.attr("data-name");
           
        $.ajax({
            type:"post",
            url:"http://localhost:3000/adminList",
            data:{
                username      
            },
            success:function(str){
              
                show(str);
               
            }
        })
    });

 
    //全选按钮
    $(".toubu").on("click",".all",function(){
        if($(this).prop('checked')){
            $(".xz").prop("checked","checked");
        }else{
            $(".xz").removeAttr('checked');
        }
    });

    $(".itemList").on("click",".xz",function(){
        var sum = 0;
        for(var i = 0; i< $(".xz").length; i++){
                if($(".xz")[i].checked){
                        sum++;
                }     
            }   
        if(sum == $(".xz").length ) {
            $(".all").prop("checked","checked");
        }else{
            $(".all").prop("checked","");
        }                
    });




    //总删除按钮
    $(".sc").on("click",function(){
            var arr = [];
            for(var i = 0; i<$(".xz").length; i++ ){
                    if($(".xz")[i].checked){
                        var yeye =  $($(".xz")[i]).parent().parent();
                        var name  = yeye.attr("data-name");
                        arr.push(name);
                        // $(this).parent().parent().remove();
                        
                    }
            }
            // console.log(arr); 
            $.ajax({
                 type:"post",
                 traditional: true,
                 url:"http://localhost:3000/adminList/dele",
                 data:{
                   arr,
                 },
                 success:function(str){
                     show(str);
                 }




            });


       
    });




    
    function show(str){
        var arr = str.map(function(item){
            var datas = new Date(item.regtime);
            var Min = datas.toLocaleString();
          
            var arr1 = Min.split(" ");
         return  `<ul data-name ="${item.username}">
                  <li style="width:50px;">
                      <input type="checkbox" class="xz">
                  </li>
                  <li style="width:200px;">
                          ${item.username}
                  </li>
                  <li style="width:100px;">
                          ${item.nicheng}
                  </li>
                  <li style="width:100px;">
                          ${item.city}
                  </li>
                  <li style="width:100px;">
                          ${item.sex}
                  </li>
                  <li style="width:100px;">
                            ${item.kc}  
                  </li>
                  <li style="width:100px;">
                            ${arr1[0]}
                  </li>
                  <li style="width:159px;">
                      <input type="button" class="shanchu ${item.Administrator}"  value="删除">
                  </li></ul>`    
          }).join(""); 
        
          $(".users").html(arr); 
         
    }




//读取localstorage获取用户名
var user = localStorage.getItem("user");
    
if(!user){
   user = {};
 }else{
      user = JSON.parse(user);
      $(".uname").text(user.username);
   }

$(".tuichu").click(function(){
     localStorage.removeItem('user');
   location.href ="http://localhost:3000/html/login.html";
});

});