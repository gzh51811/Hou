var express = require('express');
var router = express.Router();
const db = require('../public/javascripts');
const formatData =  require("../public/javascripts/formatData");


router.get('/', async function(req,res,next) {
  let str = await db.find("user",{});
  res.send(str);
});


router.post('/', async function(req,res,next) {
  let{username} = req.body;
  let del = await db.delete("user",{username});
    if(del.result.ok){
      let sql = await db.find("user",{});
      res.send(sql);
    }else{
      res.send("no");
    } 
});

router.post('/dele', async function(req,res,next) {

  let {
    arr
    } = req.body
    console.log(req.body);
  let str = await db.find("user",{});
  res.send(str);
});

module.exports = router;

