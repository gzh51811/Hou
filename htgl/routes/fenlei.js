var express = require('express');
var router = express.Router();

// 引入数据库操作方法
let db = require('../public/javascripts/index.js');

router.get('/', (req, res, next) => {
    (async () => {
        let result = await db.find('fenlei', {});
        res.send(result);
    })();
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

router.post('/sc', (req, res, next) => {
    let {
        fenleiList
    } = req.body;
    let query = [];
    fenleiList = JSON.parse(fenleiList);
    for (let i = 0; i < fenleiList.length; i++) {
        query.push({"fenlei": fenleiList[i]});
    }
    console.log(query);
    // (async ()=>{
    //    let result = await db.delete('fenlei',query[0]) ;
    //    console.log(result.result);
    //    res.send('yes');
    // })()
    (async () => {
        let result = [];
        for (let i = 0; i < query.length; i++) {
            let zhi = await db.delete('fenlei', query[i]);
            result.push(zhi.result);
        }
        for (let i = 0; i < result.length; i++) {
            if (!result[i].ok) {
                res.send('no');
                break;
            } else {
                let str = await db.find('fenlei', {});
                res.send(str);
            }
        }
    })();
});

router.post('/update', (req, res, next) => {
    let {
        fenlei,
        newFenlei
    } = req.body;

    (async () => {
        let result = await db.update('fenlei',{fenlei},{'fenlei' :newFenlei});
        let ok = (result.result).ok;
        if(ok){
            res.send (await db.find('fenlei',{}));
        }else{
            res.send('no');
        }
    })();
});

module.exports = router;