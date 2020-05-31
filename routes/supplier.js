require('dotenv').config();
var express = require('express');
var router = express.Router();
var model = require('../models/index');
let multer = require('multer');
let { slug, response, storage } = require('../helper');
let valid = require('validator');
let jimp = require('jimp');
let path = require('path');

const postValidate = async function (body) {
  var errors = {};
  if (!body.name) errors['name']['messages'] = ['not defined'];
  if (valid.isEmpty(body.name)) errors['name']['messages'] = ['name is empty', ...errors.name.messages];
  const unique = await model.supplier.find({
		slug: slug(body.name),
  });
  if (unique.length > 0) errors.name = [];
  console.log(errors);
  return
  if (Object.keys(errors).length > 0) {
    return errors
  }
  return true
}

const validating = function (req) {
  if (postValidate(req.body) !== true) {
    return false
  }
}

var upload = multer({ 
	storage: storage,
  fileFilter: async function (req, file, cb) {
    const next = validating(req) !== true ? cb(null, false) : cb(null, true);
    next;
  },
});

/* GET tag list. */
router.get('/', async function (req, res, next) {
	// untuk dapetin document limit dari request
	let limit = req.query.limit ? Number.parseInt(req.query.limit) : 20;
	// untuk dapet offset dari request
	let offset = req.query.page > 1 ? (Number.parseInt(req.query.page) - 1) * limit : 0;
	// query untuk get all data document mongod dengan paginate
	let find = await model.supplier.find({}).skip(offset).limit(limit);
	// cek kalau data nggk ada atau gagal
	if (!find) {
		return response(res, 422);
	}
	// return data
	return response(res, 200, { data: find });
});

// GET single
router.get('/:supplierSlug', async function (req, res, next) {
	// get param tag slug dari url
	let { supplierSlug } = req.params;
	// terus cari ada nggk di database
	let find = await model.supplier.find({
		slug: supplierSlug,
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
router.post('/', upload.single('image'), async function (req, res, next) {
  let error = [];
  
  return

	if (!req.body.name) error.push({ name: ['property is empty'] });
	if (valid.isEmpty(req.body.name)) error.push({ name: ['required'] });

	if (error.length > 0) {
		return response(res, 422, error);
	}

	// cek duplicate input
	const unique = await model.supplier.find({
		slug: slug(req.body.name),
	});
	if (unique.length > 0) {
		return res.status(422).json({
			message: 'Duplicate ' + req.body.name,
			success: 0,
			code: 422,
		});
	}

	// postUpload(req, res, (nx) => {
	//   console.log(nx);
	// })

	let { name, address, image, noTelp } = req.body;
	// kemudian ambil foot directory
	let root = path.dirname(require.main.filename || process.mainModule.filename);
	// karena output di atas /node-api/config kita perlu mengubahnya menjadi /nodejs-api
	let rootDir = path.join(root, '..');
	// define variabel gambarnya dulu
	let finalImage = null;
	// cek ada nggk imagenya
	if (image) {
		// kemudian generate random text
		let randomText = require('crypto').randomBytes(32).toString('hex') + '.' + readImage.getExtension();
		// kemudian define tempat gambar akan di simpan
		let pathImage = rootDir + '/public/images/' + randomText;
		// kemudian menaruh hasilnya ke variabel finalimage tadi
		// jimpRead itu fungsi untuk compress dan cover jadi ukuran tertentu
		jimpRead(image, pathImage);
		finalImage = process.env.DOMAIN + '/images/' + randomText;
	}
	// cek ada nggk gambar di disini
	if (req.file) {
		const re = jimpRead(req.file.path, req.file.path);
		console.log(re);
		finalImage = process.env.DOMAIN + '/images/' + req.file.filename;
	}

	const create = await model.supplier.create({
		name: name,
		slug: slug(name),
		address: address,
		image: finalImage,
		noTelp: noTelp,
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

async function jimpRead(image, pathImage) {
	let readImage = await jimp.read(image);
	let result = readImage.quality(60).cover(700, 550).write(pathImage);
	return result;
}

// UPDATE u
router.put('/:slugSupplier', async function (req, res, next) {
	let { slugSupplier } = req.params;
	let find = await model.supplier.find({
		slug: slugSupplier,
	});
	if (find.length < 1) {
		return res.status(404).json({
			message: 'data not found',
			success: 0,
			code: 404,
		});
	}

	// cek duplicate input
	const unique = await model.supplier.find({
		slug: slug(req.body.name),
	});
	if (unique.length > 0) {
		return res.status(422).json({
			message: 'Duplicate ' + req.body.name,
			success: 0,
			code: 422,
		});
	}

	const update = await model.supplier.findOneAndUpdate(
		{
			slug: slugSupplier,
		},
		{
			name: req.body.name,
			slug: slug(req.body.name),
			address: req.body.address,
			// image: image,
			noTelp: req.body.noTelp,
		}
	);
	if (!update) {
		return response(res, 422);
	}

	return response(res, 200, { data: update });
});

// DELETE d
router.delete('/:slugSupplier', async function (req, res, next) {
	let { slugSupplier } = req.params;
	const destroy = await model.supplier.deleteOne({ slug: slugSupplier });
	if (!destroy) {
		return response(res, 501);
	}
	return response(res, 200);
});

module.exports = router;
