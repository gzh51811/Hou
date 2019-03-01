function show(data){
    return data.map(function(item){
        let status1 = '上架';
        let status2 = '下架';

        let sale = '未上架';
        let saleopen = status1;
        if(item.onsale == 'true'){
            sale = status1;
            saleopen = status2;
        }

        let imgSrc = item.imgUrls.slice(1,-1).split(",");
        let img = "../" + imgSrc[0].slice(1,-1);

        return `
            <ul class="clearfix goodsList">
                <li style="width:50px;padding-left:18px;">
                    <input type="checkbox" class="xz">
                </li>
                <li style="width:40px;" class="uid" uid="${item.uid}">
                    ${item.uid}
                </li>
                <li style="width:100px;">
                    <img src="${img}" alt="" style="width:80px;">                    
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


    let goodsUl = $(".goodsList");

    //数据获取渲染(初始化)
    $.ajax({
        type:"get",
        url: "http://localhost:3000/list/getAll",
        data: "",
        success: function(result){
            if(result.code == 200){
                let html = show(result.data);
                $(".goodsList").html(html);
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
            data: {title:inf},
            success: function(result){
                if(result.code == 200){
                    let html = show(result.data);
                    $(".goodsList").html(html);
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
        let onsale ;
        if(sale.html().trim() == "未上架"){
            onsale = true;
            sale.html("上架");
            $(this).val("下架");
        }else{
            let onsale = false;
            sale.html("未上架");
            $(this).val("上架");
        }
        try {
            $.ajax({
                type:"get",
                url: "http://localhost:3000/list/updatesale",
                data: {uid,onsale}
            });            
        } catch (error) {
            alert("操作失败！");
            location.reload();
        }
    });
        
        //读取cookie获取用户名

       var str =  document.cookie;
      
        var arr =  str.split("=");
        if(arr[1] == "Guest"){
           
            $(".unames").css("display","none");
             }else{
           $(".unames").css("display","block");
    
         }
         
       if(arr){
            $(".uname").text(arr[1]);
            $(".uname").css("color","green")
       }

       $(".tuichu").click(function(){

            location.href ="http://localhost:3000/html/login.html";

       });
       


});