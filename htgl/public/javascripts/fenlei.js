$(() => {
    // 获取节点
    let $tj = $(".tj");//添加按钮
    let $sc = $('.sc');//删除按钮
    let $man = $('.man');//满屏的弹窗
    let $fenlei = $("#fenlei"); //写分类名的输入框
    let $tjBtn = $(".tjBtn");//提交分类名的按钮
    let $close = $('.close');//点击关闭弹窗的按钮
    let $itemList = $(".itemList");//要渲染数据的父元素

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
    })


    // 定义一个渲染函数
    function itemListRendar(arr) {
        let str = `<ul class="clearfix toubu">
                    <li style="width:50px;padding-left:18px;">
                        <input type="checkbox" class="xz">
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
                <ul class="clearfix">
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
