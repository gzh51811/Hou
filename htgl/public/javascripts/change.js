$(function(){

    //用于存放待更新图片
    let imgData = new FormData();
    let saveFiles = [];
    let imgUrls = [];
    let uid = location.search.slice(1).split("=")[1];
    //存储数据改变部分
    let updata = {};
    
    //数据渲染部分
    //1.商品种类渲染
    showKinds();
    
    //2.商品详细信息渲染
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
    
    $('.bottom').on('change','*',function(){
        var name = $(this).attr('valname');
        //定义变量
        // window[name] = $(this).val();
        // console.log(window[name]);
        if(name){
            updata = Object.assign(updata,{[name]:$(this).val()});
        }
       
    });

    //提交修改数据
    $("#confirmBtn").click(function(){
        for(var i=0;i<saveFiles.length;i++){
            if(saveFiles[i]){
                imgData.append('imgs',saveFiles[i]);
            };
        }

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
        updata = Object.assign(updata,{imgUrls:imgUrls.toString()});
        

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
    //读取cookie获取用户名
    var str =  document.cookie;          
    var arr =  str.split("=");
    if(arr){
        $(".unames").text(arr[1]);
        $(".unames").css("color","green")
    }

    $(".tuichu").click(function(){
        location.href ="http://localhost:3000/html/login.html";
    });
    if(arr[1] == "Guest"){
            
        $(".uname").css("display","none");
        }else{
    $(".uname").css("display","block");

    }

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
            //获取所有imgurl值
            //获取当前选中框
            if(data){
                var curIndex = $('input:radio:checked').parent().index();
                saveFiles[curIndex] = file;         
                imgUrls[curIndex] = $('#file').val().slice(12); 
                $('.indexPage li div').eq(curIndex).css("background-image",`url(${data})`);
            }
        }
        reader.readAsDataURL(file);
    });

    //渲染种类函数
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


    //渲染函数
    function show(data){
        // for (const key in data) {   
        //        $('#' + key).val(data[key]);
        // }
        $('#title').val(data.title);
        $('#fbt').val(data.subHead);
        $('#jg').val(data.price);
        $('#xsjg').val(data.sale_price);
        $('#qxz').val(data.kinds);
        //图片引入
        imgUrls = data.imgUrls.split(","); 
        for(let i=0;i<imgUrls.length;i++){
            $('.indexPage li div').eq(i).css("background-image","url(../" + imgUrls[i] + ")");
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

});
