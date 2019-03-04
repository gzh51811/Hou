var express = require('express');
var router = express.Router();
const db = require('../public/javascripts');
const formatData =  require("../public/javascripts/formatData");
const token = require('../public/utils/token');

router.post('/', async function(req, res, next) {

    let{username,pwd}= req.body;

    let str = await db.find("user",{username,pwd});
    str = str[0];
    if(str){
        let _token = token.create(username);
        res.send({
            code:200,
            username:str.username,
            Administrator:str.Administrator,
            token: _token
        });
  

    }else{
        res.send({code:100});
    }
    
});



module.exports = router;