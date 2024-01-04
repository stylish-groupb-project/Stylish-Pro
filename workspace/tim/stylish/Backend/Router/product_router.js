const express = require("express");
const tool = require("../utils/tool");
const router = express.Router();

const productController = require("../Controller/product_controller");
//get
router.get("/all", productController.getAllProduct);
router.get("/women", productController.getWomenProduct);
router.get("/men", productController.getMenProduct);
router.get("/accessories", productController.getAccessories);
router.get("/flash", productController.getFlash);
router.get("/search", productController.search);
router.get("/details", productController.getProductDetail);
router.get("/secKill", productController.getSecKill);

//post

// router.post('/addProduct',tool.uploadPicture().array('pictures', Infinity),productController.addProduct);
router.post(
  "/addProduct",
  tool.uploadPicture().fields([
    { name: "main_image", maxCount: 1 },
    { name: "other_images", maxCount: Infinity },
  ]),
  productController.addProduct
);

module.exports = router;
