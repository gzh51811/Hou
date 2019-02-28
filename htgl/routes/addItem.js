var express = require('express');
var router = express.Router();
let db = require('../public/javascripts/index.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/', (req, res) => {
    let {
        title,
        id,
        jg,
        xsjg,
        fl,
        kc,
        flag,
        imgUrls,
        cur
    } = req.body;
    let data = {
        title,
        id,
        jg,
        xsjg,
        fl,
        kc,
        flag,
        imgUrls,
        cur,
        regtime: Date.now()
    };
    console.log(imgUrls);
    (async () => {
        let result = await db.insert('items',data);
        // console.log(result.result);
        if(result.result.ok){
            res.send("yes");
        }else{
            res.send("no");
        }
    })();

});

module.exports = router;
