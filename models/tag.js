let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/nodejs-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let schema = new Schema({
	name: String,
	slug: String,
});

let model = mongoose.model('tag', schema);

module.exports = model;