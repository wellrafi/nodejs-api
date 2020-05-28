var route = require('express').Router();
var postRouter = require('./routes/post');
var categoryRouter = require('./routes/category');
var tagRouter = require('./routes/tag');

route.use('/post', postRouter);
route.use('/category', categoryRouter);
route.use('/tag', tagRouter);

module.exports = route;
