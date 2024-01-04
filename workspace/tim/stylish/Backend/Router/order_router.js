const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const orderController = require("../Controller/order_controller");

//post

router.post("/checkout", auth.verifyToken, orderController.checkout);
router.post("/prize", auth.verifyToken, orderController.prize);
router.put(
  "/updatePrizeStatus/:prizeId",
  auth.verifyToken,
  orderController.updatePrizeStatus
);

router.get(
  "/checkTodayPrize",
  auth.verifyToken,
  orderController.checkTodayPrize
);
router.get(
  "/getAllPrizes",
  auth.verifyToken,
  orderController.getAllUnusedPrizes
);

module.exports = router;
