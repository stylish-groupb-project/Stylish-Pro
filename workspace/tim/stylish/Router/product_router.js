const express = require('express');
const router = express.Router();
const productController = require('../Controller/product_controller');

router.post('/addProduct',productController.addProduct);

module.exports = router;