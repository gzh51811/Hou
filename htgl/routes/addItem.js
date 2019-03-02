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
        uid,
        price,
        sale_price,
        kinds,
        storage,
        flag,
        imgUrls,
        cur
    } = req.body;
    let data = {
        title,
        uid,
        price,
        sale_price,
        kinds,
        storage,
        flag,
        imgUrls,
        cur,
        regtime: Date.now()
    };
    (async () => {
        let result = await db.insert('goods',data);
        // console.log(result.result);
        if(result.result.ok){
            res.send("yes");
        }else{
            res.send("no");
        }
    })();

});

module.exports = router;
