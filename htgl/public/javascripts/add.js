jQuery(($) => {

    // 获取节点
// 标题
    let $title = $("#mz");
    //商品id
    let $spid = $("#spid");
// 商品价格
    let $jg = $("#jg");
//销售价格
    let $xsjg = $("#xsjg");
//商品分类
    let $qxz = $("#qxz");
// 显示商品分类按钮
    let $qxzBtn = $(".qxzBtn");
// 商品图片列表
    let $imgList = $(".itemImg");
//设为封面的选择按钮
    let $fengmianBtn = $(".fengmian")
// 文件上传按钮
    let file = $("#file");
// 库存
    let $kc = $("#kc");
//上架按钮
    let $sjBtn = $(".sjBtn");
//确认Btn
    let $confirmBtn = $("#confirmBtn");
//弹窗获取
    let $tc = $("#tc");
//弹窗下面的ul
    let $tcList = $("#tcList");

    // 讲imgList申明在外面方便后面使用
    let imgList = [];

//文件上传 文件上传按钮状态改变时触发事件
    file[0].onchange = () => {
        let data = new FormData();
        for (let i = 0; i < file[0].files.length; i++) {
            // console.log(file[0].files[i]);
            data.append('tupian', file[0].files[i]);
        }
        // console.log(file[0].files);
        // console.log(data.get('tupian'))
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                console.log(xhr.responseText);
                imgList = JSON.parse(xhr.responseText).file;
                console.log(imgList);
                console.log(imgList[0].filename);
                for (let i = 0; i < imgList.length; i++) {
                    $imgList[i].src = `../${imgList[i].filename}`;
                }
            }
        };
        xhr.open('post', '/uploads', true);
        xhr.send(data);
        file[0].value = null;
    };

//分类弹窗 从数据库渲染
    $.ajax({
        url : 'http://localhost:3000/fenlei',
        success(res){
           $tcList.html(tcRendar(res));
        }
    });

    $qxzBtn[0].onclick = () => {
        $tc.css("display", "block");
    };

    $qxz[0].onclick = () => {
        $tc.css("display", "block");
    };

    $tcList[0].onclick = (e) => {
        e = e || window.event;
        if (e.target.tagName == "LI") {
            $qxz.val(e.target.innerText);
        }
        $tc.css("display", "none");
    };

//上架按钮
    let flag = true;
    $sjBtn[0].onclick = () => {
        if (flag) {
            $sjBtn.val("OFF").css("backgroundColor", "#f00");
        } else {
            $sjBtn.val("ON").css("backgroundColor", "#33AB9F");
        }
        flag = !flag;
    };

    //点击确认按钮 获取数据 发送数据
    $confirmBtn[0].onclick = () => {
        let title = $title.val();//标题
        let uid = $spid.val();//uid
        let price = $jg.val(); //价格
        let sale_price = $xsjg.val();//销售价格
        let kinds = $qxz.val();//分类
        let storage = $kc.val();//库存

        // 点击确认按钮时 要确认选哪张作为封面图片
        let cur = 0;//封面图片的索引值
        for (let i = 0; i < $fengmianBtn.length; i++) {
            if ($fengmianBtn[i].checked) {
                cur = i;
            }
        }
        let imgUrls = [];
        //图片路径
        for (let i = 0; i < imgList.length; i++) {
            imgUrls.push(imgList[i].filename);
        }

        if (!title) {
            alert("标题不能为空");
            return;
        }
        if (!uid) {
            alert("id不能为空");
            return;
        }
        if (!price) {
            alert("价格不能为空");
            return;
        }
        if (!sale_price) {
            alert("销售价格不能为空");
            return;
        }
        if (!kinds) {
            alert("分类不能为空");
            return;
        }
        if (!storage) {
            alert("价格不能为空");
            return;
        }
        if (!imgUrls) {
            alert("图片不能为空");
            return;
        }
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/addItem',
            data: {
                title,
                uid,
                price,
                sale_price,
                kinds,
                storage,
                flag,
                imgUrls: imgUrls.toString(),
                cur
            },
            success(res) {
                if(res == 'yes'){
                    let isok = confirm('商品添加成功！,你需要继续添加商品吗？');
                    if(isok){
                        location.reload();
                    }else{
                        location.href = "./list.html";
                    }
                }
            }
        })
    }


    //渲染分类弹窗的函数
    function tcRendar(arr) {
        let str = '';
        str += arr.map((item) => {
            return `<li>${item.fenlei}</li>`;
        }).join('');
        return str;
    }
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