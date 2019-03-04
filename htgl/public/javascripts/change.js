//渲染
function show(data){
    $('#mz').val(data.title);
    $('#fbt').val(data.subHead);
    $('#jg').val(data.price);
    $('#xsjg').val(data.sale_price);
    $('#qxz').val(data.kinds);
    //图片引入
    let urls = data.imgUrls.slice(1,-1).split(",");    
    for(let i=0;i<urls.length;i++){
        $('.indexPage li div').eq(i).css("background-image","url(../" + urls[i].slice(1,-1) + ")");
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
    //用于存放待更新图片
    let imgData = new FormData();
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
        
        //图片修改操作
        $.ajax({
            type : 'post',
            url: "http://localhost:3000/change/uploadImg",
            data: imgData,
            contentType: false,
            processData: false,
            success: str => {
                console.log(str);
            }

        });
        

        $.ajax({
            type : "get",
            url: "http://localhost:3000/change/updateById",
            data: {uid,updata},
            success: function(result){
                if(result.code == 200){
                    location.href = "./list.html";
                }else{
                    alert(result.msg);
                    location.reload();
                }
            }
        });
        
        
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

    //更换图片的显示操作
    $('#file').change(()=>{
        let file = $('#file').get(0).files[0];
        
        let reader = new FileReader();

        let data = null;
        reader.onload = e=>{
            data = e.target.result;
            //获取当前选中框
            if(data){
                imgData.append('imgs',file);
                var curIndex = $('input:radio:checked').parent().index();
                $('.indexPage li div').eq(curIndex).css("background-image",`url(${data})`);
            }
        }

        reader.readAsDataURL(file);
    });



});

