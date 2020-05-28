var multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/public/images');
	},
	filename: function (req, file, cb) {
		let randomString = Math.floor(Math.random() * 1000000).toString();
		cb(null, randomString + '.' + file.mimetype);
	},
});

var upload = multer({ storage: storage });

module.exports = upload;
