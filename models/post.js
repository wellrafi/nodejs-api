let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/nodejs-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let schema = new Schema({
	title: String,
	subTitle: String,
	slug: String,
	image: String,
	categories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'category',
		},
	],
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tag',
		},
	],
});

let model = mongoose.model('post', schema);

module.exports = model;
