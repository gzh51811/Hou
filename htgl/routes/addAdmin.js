var express = require('express');
var router = express.Router();
const db = require('../public/javascripts');
const formatData =  require("../public/javascripts/formatData");

router.post('/',async function(req, res, next) {

    let{username,pwd,nicheng,city,sex,kc}= req.body;
    let data = {username,pwd,nicheng,city,sex,kc,regtime:Date.now()} 
    let str = await db.insert("user",data);
    console.log(str);
    res.send(formatData({msg:"注册成功"}));
  });
  
  
  //用户名是否存在
  router.get('/',async function(req, res, next) {

        console.log(req.query);
        let {username} = req.query;

        let str = await db.find('user',{username});
        console.log(username);
        if(str.length>0){
            res.send(formatData({code:100,msg:"no"}));
        }else{
            res.send(formatData({msg:"yes"}));
        }
       
  
  });


  module.exports = router;


