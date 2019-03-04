//引入模块
const db = require("../public/javascripts");
const express = require('express');
const router = express();

const formatData =  require("../public/javascripts/formatData");

//查询符合条件所有商品
router.get("/getAll",async (req,res,next)=>{

    try {
        let {title,querydata} = req.query;
        let result;
        if(title){
            var str = new RegExp(title);        
            if(querydata){
                result = await db.find("goods",{title:str,kinds:querydata.kinds});
            }else{
                result = await db.find("goods",{title:str}); 
            }
        }else{
            if(querydata){
                result = await db.find("goods",{kinds:querydata.kinds});
            }else{
                result = await db.find("goods");
            }
        }
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

//删除商品
router.get("/del",async (req,res,next)=>{
    let {que} = req.query;
    let querys = {$or:que};

    try {
        let result = await db.delete("goods",querys);
        res.send(formatData({            
            msg:"删除数据成功！"
        }));
    } catch (error) {
        res.send(formatData({
            code:404,
            msg:"删除数据失败！"
        }));        
    }

});

//更新上架，下架
router.get("/updatesale",async (req,res,next)=>{
    let {uid,flag} = req.query;
    await db.update("goods",{uid},{flag});    
});

module.exports = router;