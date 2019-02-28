const path = require('path');
const fs = require('fs');
const express = require('express');
var router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({
    storage
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/', upload.array("tupian",3),(req, res, next) => {
    console.log(req);
    res.json({
        status : 200,
        file : req.files
    })
});

module.exports = router;

