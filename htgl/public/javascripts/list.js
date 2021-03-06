function showKinds(){
    $.ajax({
        type : "get",
        url: "http://localhost:3000/change/allKinds",
        success: function(result){
            if(result.code == 200){

                let html = result.data.map(function(item){
                    return `<li style="width: 170px;height: 40px;line-height: 40px">
                            ${item.fenlei}
                            </li>`;
                }).join('\n');

                $('#allKinds').html(html);

            }else{
                alert(result.msg);
            }
        }
    });            
}

function show(data){
    return data.map(function(item){
        let status1 = '上架';
        let status2 = '下架';

        let sale = '未上架';
        let saleopen = status1;
        if(item.flag == 'ON'){
            sale = status1;
            saleopen = status2;
        }

        let imgSrc = item.imgUrls.split(",");
        let cur = item.cur;
        let img = "../" + imgSrc[cur];

        return `
            <ul class="clearfix goodsList">
                <li style="width:50px;padding-left:18px;">
                    <input type="checkbox" class="xz">
                </li>
                <li style="width:40px;" class="uid" uid="${item.uid}">
                    ${item.uid}
                </li>
                <li style="width:100px;">
                    <img src="${img}" alt="" style="width:70px;">                    
                </li>
                <li style="width:200px;">
                    ${item.title}
                </li>
                <li style="width:100px;">
                    ${item.kinds}
                </li>
                <li style="width:100px;">
                    ${item.price}
                </li>
                <li style="width:100px;">
                    ${item.sale_price}
                </li>
                <li style="width:50px;">
                    ${item.storage}
                </li>
                <li style="width:100px;" class="sale">
                    ${sale}
                </li>

                <li style="width:159px;">
                    <input type="button" class="bianji" value="编辑">
                    <input type="button" class="shanchu" value="删除">
                    <input type="button" class="shangjia" value="${saleopen}">
                </li>
            </ul>
                `;
    }).join("\n");
}

$(function(){
    let querydata={}
    let goodsUl = $(".goodsList");

    //数据获取渲染(初始化)
    showKinds();
    $.ajax({
        type:"get",
        url: "http://localhost:3000/list/getAll",
        data: "",
        success: function(result){
            if(result.code == 200){
                let html = show(result.data);
                $("#goodsshow").html(html);
            }else{
                alert(result.msg);
            }
        }
    });

    //执行删除操作ajax
    function deleteAjax(datas){
        $.ajax({
            type:"get",
            url: "http://localhost:3000/list/del",
            data: datas,
            success: function(result){
                if(result.code == 200){
                    alert(result.msg);
                }else{
                    alert(result.msg);
                    location.reload();
                }
            }
        });
    }

    //单行数据删除操作
    $(".itemList").on('click','.shanchu',function(){
        let del = confirm('您确定要删除该条商品信息吗？');
        if(del){
            let uid = $(this).parent().parent().children(".uid").attr("uid");
            //删除当前行
            $(this).parent().parent().remove();

            let obj ={uid};
            let arr = [];
            arr.push(obj);
            deleteAjax({que:arr});            
        }
    });

    //多条数据删除
    $('.sc').click(function(){
        let del = confirm('您确定要删除勾选商品信息吗?');
        if(del){
            let data = [];
            $.each($('.goodsList .xz'),function(i,val){
                if(val.checked){
                    let uid = $(val).parent().parent().children(".uid").attr("uid");
                    //删除选中行
                    $(val).parent().parent().remove();
                    let obj ={uid};
                    data.push(obj);
                };
            })
            console.log(data);
            //数据库删除
            deleteAjax({que:data}); 
        }
    })

    //模糊查询
    $('.searchBtn').click(function(){
        let inf = $('.searchIpt').val();
        let kinds = $('.flk').val();
        $.ajax({
            type:"get",
            url: "http://localhost:3000/list/getAll",
            data: {title:inf,querydata},
            success: function(result){
                if(result.code == 200){
                    let html = show(result.data);
                    $("#goodsshow").html(html);
                }else{
                    alert(result.msg);
                }
            }
            

        });        
    })

    //点击修改
    $('.itemList').on("click",".bianji",function(){
        let uid = $(this).parent().parent().children(".uid").attr("uid");
        location.href = "change.html?uid=" + uid;
    });

    //点击上架
    $('.itemList').on("click",".shangjia",function(){
        let parentN = $(this).parent().parent();
        let sale = parentN.children(".sale");
        let uid = parentN.children(".uid").attr("uid");
        let flag ;
        if(sale.html().trim() == "未上架"){
            flag = "ON";
            sale.html("上架");
            $(this).val("下架");
        }else{
            let flag = "OFF";
            sale.html("未上架");
            $(this).val("上架");
        }
        try {
            $.ajax({
                type:"get",
                url: "http://localhost:3000/list/updatesale",
                data: {uid,flag}
            });            
        } catch (error) {
            alert("操作失败！");
            location.reload();
        }
    });
        
         // 判断是管理员身份
    var str =  document.cookie;
      
    var arr =  str.split("=");
    if(arr[1] == "Guest"){
         $(".unames").css("display","none");
    }else{
         $(".unames").css("display","block");
    
    }
        //读取localstorage获取用户名
         var user = localStorage.getItem("user");
    
         if(!user){
            user = {};
            location.href ="http://localhost:3000/html/login.html";
          }else{
               user = JSON.parse(user);
               $(".uname").text(user.username);
            }
     

       $(".tuichu").click(function(){
              localStorage.removeItem('user');
            location.href ="http://localhost:3000/html/login.html";
       });
       
    //点击显示种类
    $(".qxzBtn").click(function(){
        $("#allKinds").toggle();
    });
    $("#allKinds").on('click','li',function(){
        let values = $(this).html().trim();
        $('.flk').val(values);
        querydata = {kinds:values};
        $(this).parent().toggle();
    });

    //全选
    $('#allselect').click(()=>{
        if($('#allselect').is(":checked")){
            $('.goodsList li input').prop("checked",true);
        }else{
            $('.goodsList li input').prop("checked",false);
        }
    });


});