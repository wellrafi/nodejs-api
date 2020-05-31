var multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let root = path.dirname(require.main.filename || process.mainModule.filename);
		let rootDir = path.join(root, '..');
		cb(null, rootDir + '/public/images');
	},
	filename: function (req, file, cb) {
		let randomString = require('crypto').randomBytes(64).toString('hex');
		cb(null, randomString + '.' + file.mimetype.split('/')[1]);
	},
});

var upload = multer({ 
	storage: storage,
	onFileUploadStart: function (file, req, res){
		if (!validationMulter) {
			return false
		}
	}
});

module.exports = {storage, upload};
