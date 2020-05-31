let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/nodejs-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let schema = new Schema({
	name: String,
	desc: String,
	slug: String,
	price: String,
	image: String,
	categories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'category',
		},
	],
	supplier: [
		{
			type: Schema.Types.ObjectId,
			ref: 'supplier',
		},
	],
});

let model = mongoose.model('inventory', schema);

module.exports = model;
