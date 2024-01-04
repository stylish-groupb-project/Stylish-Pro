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
    let finalResponse = null;
    let uuid = null;

    if (!data) return errorMsg.inputEmpty(res);
    const { prime, order } = data;
    if (order.list.length === 0)
      return errorMsg.notContainAnyProductInOrder(res);

    // Check flash sale status using Redis

    const SECKILL_GOOD_PREFIX = "seckill_good_";

    const colorCode = order.list[0].color.code;
    const seckillKeyJson = `${SECKILL_GOOD_PREFIX}${order.list[0].id}_${colorCode}_${order.list[0].size}_info`;
    const seckillKeyHash = `${SECKILL_GOOD_PREFIX}${order.list[0].id}_${colorCode}_${order.list[0].size}`;
    const seckillData = await redis.getCacheByKey(seckillKeyJson);

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

    // Lock to prevent multiple users from processing the order simultaneously
    const lockKey = `${SECKILL_GOOD_PREFIX}${order.userId}:${order.list[0].id}_${colorCode}_${order.list[0].size}:lock`;
    uuid = uuidv4();
    const expireTime = moment(seckillData.end_time).diff(moment(), "minutes");
    const tryLock = await redis.evalScript(
      lock,
      2, // KEYS count
      lockKey,
      "releaseTime",
      uuid,
      expireTime
    );
    console.log("tryLock", tryLock);

    try {
      if (tryLock === 1) {
        // Check if flash sale product is sold out using Lua script

        const stockScriptResult = await redis.evalScript(
          stock,
          2, // KEYS count
          seckillKeyHash,
          "amount"
        );

        if (stockScriptResult <= 0) {
          return res.status(400).json({ error: "該產品已售完" });
        }

        // Write to the database after successful purchase
        const result = await orderService.insertNewOrder(
          res,
          order,
          order.userId
          //   loginUserId
        );

        // await orderService.updateOrderIsPaid(res, true, result.insertId);
        finalResponse = await orderCheckRes.customize(result);
        console.log("finalResponse", finalResponse);

        return finalResponse;
      }
    } catch (e) {
      await redis.evalScript(unlock, 1, [lockKey, uuid]);
      throw e;
    }
  },
};
