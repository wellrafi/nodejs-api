let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/nodejs-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let schema = new Schema({
	name: String,
	slug: String,
	active: Boolean
});

let model = mongoose.model('category', schema);


module.exports = model;