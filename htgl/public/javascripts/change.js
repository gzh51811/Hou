//渲染
function show(data){
    $('#mz').val(data.title);
    $('#fbt').val(data.subHead);
    $('#jg').val(data.price);
    $('#xsjg').val(data.sale_price);
    $('#qxz').val(data.kinds);
    //图片引入
    let urls = data.imgUrls.slice(1,-1).split(",");    
    console.log(urls);
    for(let i=0;i<urls.length;i++){
        $('.indexPage li img').eq(i).attr("src","../" + urls[i].slice(1,-1));
    }

    $("input[type=radio]").eq(data.cur).attr("checked",1);
    $('#kc').val(data.storage);

    if(data.flag == 'ON'){
        $('.sjBtn').val("ON");
        $('.sjBtn').css("background","#33AB9F");        
    }else{
        $('.sjBtn').val("OFF");
        $('.sjBtn').css("background","red");           
    }

    $('#memo').val(data.desc);

}

function showKinds(){
    $.ajax({
        type : "get",
        url: "http://localhost:3000/change/allKinds",
        success: function(result){
            if(result.code == 200){

                let html = result.data.map(function(item){
                    return `<li style="width: 160px;height: 40px;border-bottom: 1px solid #ccc;line-height: 40px">
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



$(function(){
    let uid = location.search.slice(1).split("=")[1];
    
    //数据渲染部分
    showKinds();
    $.ajax({
        type : "get",
        url: "http://localhost:3000/change/getById",
        data: {uid},
        success: function(result){
            if(result.code == 200){
                show(result.data[0]);
            }else{
                alert(result.msg);
            }
        }
    });

    //获取数据改变部分
    let updata = {};
    
    $('.bottom').on('change','*',function(){
        var name = $(this).attr('valname');
        // //定义变量
        // window[name] = $(this).val();
        if(name){
            updata = Object.assign(updata,{[name]:$(this).val()});
        }
       
    });

    //提交修改数据
    $("#confirmBtn").click(function(){
        let title = $('#mz').val();

        $.ajax({
            type : "get",
            url: "http://localhost:3000/change/updateById",
            data: {uid,updata},
            success: function(result){
                if(result.code == 200){
                    alert(result.msg);
                    location.href = "./list.html";
                }else{
                    alert(result.msg);
                }
            }
        });        
    });

    //点击显示种类
    $(".qxzBtn").click(function(){
        $("#allKinds").toggle();
    });
    $("#allKinds").on('click','li',function(){
        let values = $(this).html().trim();
        $('#qxz').val(values);
        updata = Object.assign(updata,{kinds:values});
        $(this).parent().toggle();
    });

    //选择封面图片
    $(".indexPage input[type='radio']").click(function(){
        let cur = $(this).parent().index();
        updata = Object.assign(updata,{cur});
    })

    //上下架
    $('.sjBtn').click(function(){
        if($(this).val() == 'OFF'){
            $(this).val("ON");
            $(this).css("background","#33AB9F");        
        }else{
            $(this).val("OFF");
            $(this).css("background","red");           
        }

        let flag = $(this).val();
        updata = Object.assign(updata,{flag});
    });

    //图片的修改



});

