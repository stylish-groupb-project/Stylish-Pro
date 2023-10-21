const express = require('express');
const tool = require('../utils/tool');
const router = express.Router();

const productController = require('../Controller/product_controller');
//get 
router.get('/all',productController.getAllProduct);
router.get('/women',productController.getWomenProduct);
router.get('/men',productController.getMenProduct);
router.get('/accessories',productController.getAccessories);

//post
router.post('/addProduct',tool.uploadPicture().array('pictures', Infinity),productController.addProduct);

module.exports = router;