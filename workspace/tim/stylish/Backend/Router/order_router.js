const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const orderController = require("../Controller/order_controller");

//post

router.post("/checkout", auth.verifyToken, orderController.checkout);
router.post("/prize", auth.verifyToken, orderController.prize);
router.get(
  "/checkTodayPrize",
  auth.verifyToken,
  orderController.checkTodayPrize
);

module.exports = router;
