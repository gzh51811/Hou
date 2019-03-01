

$(function(){
    
    $(".tj").on("click",function(){
        location.href="http://localhost:3000/html/addAdmin.html";

    });

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
                        
                    }
            }
            console.log(arr); 
            $.ajax({
                 type:"post",
                 url:"http://localhost:3000/adminList/dele",
                 data:{
                    arr]
                 },
                 success:function(str){
                        console.log(str);
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
                      <input type="button" class="bianji" value="编辑">
                      <input type="button" class="shanchu" value="删除">
                  </li></ul>`    
          }).join(""); 
             
          $(".users").html(arr); 
         
    }



});