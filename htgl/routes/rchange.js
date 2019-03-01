//引入模块
const db = require("../public/javascripts");
const express = require('express');
const router = express();

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


module.exports = router;