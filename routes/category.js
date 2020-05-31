var express = require('express');
var router = express.Router();
var model = require('../models/index');
let { slug, response } = require('../helper');
let valid = require('validator');

/* GET tag list. */
router.get('/', async function (req, res, next) {
	// untuk dapetin document limit dari request
	let limit = req.query.limit ? Number.parseInt(req.query.limit) : 20;
	// untuk dapet offset dari request
	let offset = req.query.page > 1 ? (Number.parseInt(req.query.page) - 1) * limit : 0;
	// query untuk get all data document mongod dengan paginate
	let find = await model.category.find({}).skip(offset).limit(limit);
	// cek kalau data nggk ada atau gagal
	if (!find) {
		return response(res, 422);
	}
	// return data
	return response(res, 200, { data: find });
});

// GET single
router.get('/:categorySlug', async function (req, res, next) {
  // get param tag slug dari url
  let { categorySlug } = req.params;
  // terus cari ada nggk di database
	let find = await model.category.find({
		slug: categorySlug,
  });
  // cek kalau di database nggk ada atau 0
	if (find.length < 1) {
    // return response not found
		return res.status(404).json({
			message: 'data not found',
			success: 0,
			code: 404,
		});
  }
  // jika ketemu return response request success
	return response(res, 200, { data: find });
});

// POST p
router.post('/', async function (req, res, next) {
	let error = [];

	if (!req.body.name) error.push();
	if (valid.isEmpty(req.body.name)) error.push({ name: 'required' });

	if (error.length > 0) {
		return response(res, 422, error);
	}

	// cek duplicate input
	const unique = await model.category.find({
		slug: slug(req.body.name),
	});
	if (unique.length > 0) {
		return res.status(422).json({
			message: 'Duplicate ' + req.body.name,
			success: 0,
			code: 422,
		});
	}

	let { name } = req.body;
	const create = await model.category.create({
		name: name,
		slug: slug(name),
	});
	if (!create) {
		return response(res, 422);
	}
	return res.status(201).json({
		message: 'request success',
		success: 1,
		code: 201,
	});
});

// UPDATE u
router.put('/:categorySlug', async function (req, res, next) {
  
  let { categorySlug } = req.params;

  // cek kalau data ada di database
	let find = await model.category.find({
		slug: categorySlug,
	});
	if (find.length < 1) {
		return res.status(404).json({
			message: 'data not found',
			success: 0,
			code: 404,
		});
	}

	// cek duplicate input
	const unique = await model.category.find({
		slug: slug(req.body.name),
	});
	if (unique.length > 0) {
		return res.status(422).json({
			message: 'Duplicate ' + req.body.name,
			success: 0,
			code: 422,
		});
	}

	const update = await model.category.findOneAndUpdate(
		{
			slug: categorySlug,
		},
		{
			name: req.body.name,
			slug: slug(req.body.name),
		}
	);
	if (!update) {
		return response(res, 422);
	}

	return response(res, 200, { data: update });
});

// DELETE d
router.delete('/:categorySlug', async function (req, res, next) {
	let { categorySlug } = req.params;
	const destroy = await model.category.deleteOne({ slug: categorySlug });
	if (!destroy) {
		return response(res, 501);
	}
	return response(res, 200);
});

module.exports = router;
