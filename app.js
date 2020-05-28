var createError = require('http-errors');
var express = require('express');
var path = require('path');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var router = require('./route');
var multer = require('multer');

var app = express();

app.use(compression());
app.use(cors());
app.use(multer().none())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404).json({
		message: 'not found',
		code: 404,
		success: 0,
	});
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({
		message: err.message,
    code: err.status || 500,
		success: 0,
	});
});

module.exports = app;
