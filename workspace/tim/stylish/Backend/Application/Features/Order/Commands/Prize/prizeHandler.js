const https = require("https");
const orderService = require("../../../../../Service/orderService");
// require('dotenv').config();
module.exports = {
  handle: async (res, loginUserId, data) => {
    const result = await orderService.insertNewPrize(res, data, loginUserId);
    return result;
  },
  check: async (res, loginUserId) => {
    const result = await orderService.checkTodayPrize(res, loginUserId);
    return result;
  },
  getAllUnusedPrizes: async (res, loginUserId) => {
    const result = await orderService.getAllUnusedPrizes(res, loginUserId);
    return result;
  },
  updatePrizeStatus: async (res, loginUserId, prizeId) => {
    const result = await orderService.updatePrizeIsUsed(
      res,
      loginUserId,
      prizeId
    );
    return result;
  },
};
