//引入模块
const db = require("../public/javascripts");
const express = require('express');
const router = express();
//文件上传
const multer = require('multer');

const formatData =  require("../public/javascripts/formatData");

//查询该条商品
router.get("/getById",async (req,res,next)=>{

    try {
        let {uid} = req.query;
        result = await db.find("goods",{uid});

        res.send(formatData({
            data:result,
            msg:"查询数据成功！"
        }));
    } catch (error) {
        res.send(formatData({
            code:404,
            msg:"查询数据失败！"
        }));
    }

});

//更新商品
router.get("/updateById",async (req,res,next)=>{
    let {uid,updata} = req.query;
    try {
        let result = await db.update("goods",{uid},updata);
        res.send(formatData({            
            msg:"修改数据成功！"
        }));
    } catch (error) {
        res.send(formatData({
            code:404,
            msg:"修改数据失败！"
        }));        
    }
});

router.get("/allKinds",async (req,res,next)=>{
    try {
        let result = await db.find("fenlei");
        res.send(formatData({            
            data:result,
            msg:"查询数据成功！"
        }));
    } catch (error) {
        res.send(formatData({
            code:404,
            msg:"查询数据失败！"
        }));        
    }
});


//图片上传路由
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, './uploads');    
    },
    filename: function (req, file, cb) {
        // 将保存文件名为文件原始名
        cb(null,file.originalname);  
    }
});

let up = multer({storage});

router.post("/uploadImg",up.array('imgs', 3),(req,res,next)=>{
    res.send('文件上传成功！');
});


module.exports = router;