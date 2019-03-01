//渲染
function show(data){
    $('#mz').val(data.title);
    $('#fbt').val(data.subHead);
    $('#jg').val(data.price);
    $('#xsjg').val(data.sale_price);
    $('#qxz').val(data.kinds);
    //图片引入


    $('#kc').val(data.storage);

    if(data.onsale == 'true'){
        $('#sjBtn').val("on");
    }else{
        $('#sjBtn').val("off");
    }

    $('#memo').val(data.desc);

}

$(function(){
    let uid = location.search.slice(1).split("=")[1];
    
    //数据渲染部分
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


    //提交修改数据
    $("#confirmBtn").click(function(){
        let title = $('#mz').val();
        
        $.ajax({
            type : "get",
            url: "http://localhost:3000/change/updateById",
            data: {uid,title},
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

});

