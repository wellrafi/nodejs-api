var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
});

router.get('/:categoryId', async function(req, res, next) {
  
});

router.post('/', async function(req, res, next) {
  let {name} = req.body;
  const create = await model.category.create({
    name: name,
  });
});

module.exports = router;
