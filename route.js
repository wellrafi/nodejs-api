var route = require('express').Router();
var inventoryRouter = require('./routes/inventory');
var categoryRouter = require('./routes/category');
var supplierRouter = require('./routes/supplier');

route.use('/inventory', inventoryRouter);
route.use('/kategori', categoryRouter);
route.use('/supplier', supplierRouter);

module.exports = route;
