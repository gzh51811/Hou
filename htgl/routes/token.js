var express = require('express');
var router = express.Router();
const {verify} = require("../public/utils/token")

router.post('/',function(req, res, next) {
        let{token}= req.body;
       let rrs = verify(token);
   
    if(rrs){
      res.send({
            status:200,
            msg:'success'
        })
    }else{
        res.send ({
            status:302,
            msg:'fail'
        })
    }
       
});
module.exports = router;