let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/nodejs-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let schema = new Schema({
	name: String,
	slug: String,
	address: String,
	image: String,
	noTelp: String,
	active: Boolean
});

let model = mongoose.model('supplier', schema);

module.exports = model;