const https = require("https");
const orderCheckRes = require("../OrderCheck/orderCheckRes");
const errorMsg = require("../../../../../utils/error");
const orderService = require("../../../../../Service/orderService");
const moment = require("moment");
const redis = require("../../../../../utils/cache");
const { stock, lock, unlock } = require("../../../../../utils/script/index");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  handle: async (res, loginUserId, data) => {
    //init
    // let tapPayResponse = null;
    let finalResponse = null;
    // let tappayStatus = false;
    // const partner_key = process.env.PARTNER_KEY;
    // const post_options = {
    //   host: "sandbox.tappaysdk.com",
    //   port: 443,
    //   path: "/tpc/payment/pay-by-prime",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-api-key":
    //       "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
    //   },
    // };
    //check
    if (!data) return errorMsg.inputEmpty(res);
    //不確定要不Json.parse ANS: no
    const { prime, order } = data;
    // if (!prime || !order) return errorMsg.inputEmpty(res);
    if (order.list.length === 0)
      return errorMsg.notContainAnyProductInOrder(res);
    console.log(order.list.length);
    // for (let i = 0; i < order.list.length; i++) {
    //   //確保訂單中都有提供正確的 product id
    //   await productService.simpleSearchById(res, order.list[i].id);
    // }

    //operation

    // const result = await orderService.insertNewOrder(res, order, loginUserId);

    // Check flash sale status using Redis

    const SECKILL_GOOD_PREFIX = "seckill_good_";

    const colorCode = order.list[0].color.code;
    const seckillKey = `${SECKILL_GOOD_PREFIX}${order.list[0].id}_${colorCode}_${order.list[0].size}`;
    const seckillData = await redis.getCacheByKey(seckillKey);

    if (!seckillData) {
      return errorMsg.flashSaleNotFound(res);
    }

    // Check if flash sale is valid
    if (!seckillData.is_valid) {
      return errorMsg.flashSaleEnded(res);
    }

    // Check if flash sale has started
    if (moment().isBefore(moment(seckillData.start_time))) {
      return errorMsg.flashSaleNotStarted(res);
    }

    // Check if flash sale has ended
    if (moment().isAfter(moment(seckillData.end_time))) {
      return errorMsg.flashSaleEnded(res);
    }

    if (seckillData.amount === 0) {
      return errorMsg.flashSaleSoldOut(res);
    }

    try {
      // Lock to prevent multiple users from processing the order simultaneously
      const lockKey = `${SECKILL_GOOD_PREFIX}${order.userId}:${order.list[0].id}_${colorCode}_${order.list[0].size}:lock`;
      const uuid = uuidv4();
      const expireTime = moment(seckillData.end_time).diff(moment(), "minutes");
      const tryLock = await redis.evalScript(lock, 2, [
        lockKey,
        "releaseTime",
        uuid,
        expireTime,
      ]);

      if (tryLock === 1) {
        // Check if flash sale product is sold out using Lua script
        console.log(stock);
        console.log(order.list[0].qty);

        const stockScriptResult = await redis.evalScript(
          stock,
          1, // KEYS count
          seckillKey,
          order.list[0].qty
        );

        // Write to the database after successful purchase
        const result = await orderService.insertNewOrder(
          res,
          order,
          order.userId
          //   loginUserId
        );

        // Add your database update logic here
        // For example, update the order status to indicate successful purchase

        await orderService.updateOrderIsPaid(res, true, result.insertId);
        finalResponse = await orderCheckRes.customize(result);

        return finalResponse;
      }
    } catch (e) {
      // Handle exceptions and release the lock using the unlock script
      const lockKey = `${SECKILL_GOOD_PREFIX}${order.userId}:${order.list[0].id}_${colorCode}_${order.list[0].size}:lock`;
      await redis.evalScript(unlock, 1, [lockKey, uuid]);
      return errorMsg.flashSaleSoldOut(res);
    }

    // const post_data = {
    //   prime: prime,
    //   partner_key:
    //     "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
    //   merchant_id: "AppWorksSchool_CTBC",
    //   details: "TapPay Test",
    //   amount: 100,
    //   cardholder: {
    //     phone_number: "+886923456789",
    //     name: "王小明",
    //     email: "LittleMing@Wang.com",
    //     zip_code: "100",
    //     address: "台北市天龍區芝麻街1號1樓",
    //     national_id: "A123456789",
    //   },
    //   remember: true,
    // };
    // tappayStatus = await tool.tappayRequest(post_options, post_data);
    // console.log(tappayStatus);
    // if (tappayStatus === true) {
    //   // No need to update order status here, it's already done above
    // }
  },
};
