var express = require('express');
var router = express.Router();

// 引入数据库操作方法
let db = require('../public/javascripts/index.js');

router.get('/', (req, res, next) => {
    (async () => {
       let result = await db.find('fenlei',{});
       res.send(result);
    })()

});

router.post('/', (req, res, next) => {
    let {
        fenlei
    } = req.body;

    (async () => {
        let result = await db.insert('fenlei', {fenlei});
        if (result.result.ok) {
            let fenleiList = await db.find('fenlei', {});
            res.send(fenleiList);
        } else {
            res.send('no');
        }
    })();
});


module.exports = router;