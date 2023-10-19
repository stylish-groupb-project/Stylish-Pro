const express = require('express');
const tool = require('../utils/tool');
const router = express.Router();

const productController = require('../Controller/product_controller');

router.post('/addProduct',tool.uploadPicture().array('pictures', Infinity),productController.addProduct);

module.exports = router;