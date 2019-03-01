var express = require('express');
var router = express.Router();
const db = require('../public/javascripts');
const formatData =  require("../public/javascripts/formatData");

router.post('/', async function(req, res, next) {

    let{username,pwd}= req.body;

    let str = await db.find("user",{username,pwd});
    str = str[0];
    if(str){
        res.send(formatData({msg:str._id}));
    }else{
        res.send(formatData({code:100}));
    }

    
});



module.exports = router;