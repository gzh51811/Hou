$(() => {
    // 获取节点
    let $tj = $(".tj");//添加按钮
    let $sc = $('.sc');//删除按钮
    let $man = $('.man');//满屏的弹窗
    let $fenlei = $("#fenlei"); //写分类名的输入框
    let $tjBtn = $(".tjBtn");//提交分类名的按钮
    let $close = $('.close');//点击关闭弹窗的按钮
    let $itemList = $(".itemList");//要渲染数据的父元素

    //刚进来的时候 获取数据库信息 渲染页面
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/fenlei',
        success(res) {
            let itemListArr = res;
            let html = itemListRendar(itemListArr);
            $itemList.html(html);
        }
    });

    // 点击添加按钮 弹出一个窗
    $tj.on('click', () => {
        $man.css('display', 'block');
        $fenlei.focus();
    });

    //点击close关闭弹窗
    $close.on('click', () => {
        $man.css('display', 'none');
    });

    //点击提交分类按钮 获取输入框内容
    $tjBtn.on('click', () => {
        let fenlei = $fenlei.val();//获取内容

        //然后把分类名发ajax到后端
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/fenlei',
            data: {
                fenlei
            },
            success(res) {
                let itemListArr = res;
                let html = itemListRendar(itemListArr);
                $itemList.html(html);
            }
        });
        $man.css('display', 'none');
    });

//点击删除按钮
    //获取选择按钮 用事件委托来写吧
    // 全选按钮委托父元素
    $itemList.on('click', '.quanxuan', function () {
        // 被点击的时候 判断 其他输入框状态 如果没有都选中 就全选 ，如果全选了
        // 就全不选
        let xz = document.getElementsByClassName('xz');
        // console.log(xz);
        if(this.checked){
            for(let i = 0;i < xz.length;i++){
                xz[i].checked = true;
            }
        }else{
            for(let i = 0;i < xz.length;i++){
                xz[i].checked = false;
            }
        }
    });

    $itemList.on('click','.xz',function(){
        // 点下面的选择框 根据它们的状态判断全选框的状态
        let xz = document.getElementsByClassName('xz');
        let quanxuan = document.getElementsByClassName('quanxuan')[0];
        let sum = 0;
        for(let i = 0; i < xz.length;i++){
            if(xz[i].checked){
                sum ++;
            }
        }
        if(sum == xz.length){
            quanxuan.checked = true;
        }else{
            quanxuan.checked = false;
        }
    });

    $sc.on('click', () => {
        // 点击之后获取有被选中的input框
        console.log(666);
        let sum = 0;
        for (let i = 0; i < xz.length; i++) {
            if (xz[i].checked) {
                sum++;
                let fenleiList = [];
                let yeye = xz[i].parentElement.parentElement;
                fenleiList.push(yeye.dataset.fenlei);
            }
        }
        // 获取到了要删除的分类
    });


    // 定义一个渲染函数
    function itemListRendar(arr) {
        let str = `<ul class="clearfix toubu">
                    <li style="width:50px;padding-left:18px;">
                        <input type="checkbox" class="quanxuan">
                    </li>
                    <li style="width:200px;">
                        分类
                    </li>
                    <li style="width:159px;">
                        操作
                    </li>
                </ul>`;
        str += arr.map((item) => {
            return `
                <ul class="clearfix" data-fenlei="${item.fenlei}">
                    <li style="width:50px;padding-left:18px;">
                        <input type="checkbox" class="xz">
                    </li>
                    <li style="width:200px;">
                        ${item.fenlei}
                    </li>
                    <li style="width:159px;">
                        <input type="button" class="bianji" value="编辑">
                        <input type="button" class="shanchu" value="删除">
                    </li>
                </ul>`;
        }).join('');
        return str;
    }
});
