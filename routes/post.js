var express = require('express');
var router = express.Router();
var upload = require('../helper/upload');
var model = require('../models/index');

/* GET home page. */
router.post('/', upload.array('images', 10), async function (req, res, next) {
    
});

module.exports = router;
