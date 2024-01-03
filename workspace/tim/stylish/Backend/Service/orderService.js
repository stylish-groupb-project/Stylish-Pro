const orderRepo = require("../Repository/orderRepo");
const variantRepo = require("../Repository/variantRepo");
const recipientRepo = require("../Repository/recipientRepo");
const cartItemRepo = require("../Repository/cartItemRepo");
const prizeRepo = require("../Repository/prizeRepo");
const connectionPromise = require("../utils/db").connectionPromise;
const errorMsg = require("../utils/error");
module.exports = {
  insertNewOrder: async (res, dataObj, userId) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      await connection.beginTransaction();
      const { shipping, payment, subtotal, freight, total, recipient, list } =
        dataObj;
      const orderObj = {
        shipping_way: shipping,
        payment_way: payment,
        subtotal: subtotal,
        freight: freight,
        total: total,
        user_id: userId,
      };
      console.log(orderObj);
      const result = await orderRepo.insertNewOrder(res, orderObj, connection);
      const newOrderId = result.insertId;
      console.log(newOrderId);
      const concurrencyQuery = [
        recipientRepo.insertNewRecipient(
          res,
          recipient,
          newOrderId,
          connection
        ),
        cartItemRepo.updateCartItems(res, userId, newOrderId, connection),
      ];
      await Promise.all(concurrencyQuery);
      for (let i = 0; i < list.length; i++) {
        const variantObj = {
          color: list[i].color.code,
          size: list[i].size,
          product_id: list[i].id,
        };
        console.log(variantObj);
        const findVariant = await variantRepo.findByColorAndSizeAndPid(
          res,
          variantObj,
          connection
        );
        if (findVariant.length === 0) return errorMsg.variantProblem(res);
        //可能剛好同時兩個人下單那個貨物而貨物只剩1
        console.log("here: " + findVariant[0]);
        if (findVariant[0].stock - list[i].qty < 0)
          return errorMsg.stockProblem(res);
        await variantRepo.updateVariantStock(
          res,
          list[i].qty,
          findVariant[0].id,
          connection
        );
      }
      await connection.commit();
      return result;
    } catch (error) {
      console.log(error);
      await connection.rollback();
      errorMsg.query(res);
    } finally {
      console.log("connection release");
      connection.release();
    }
  },
  updateOrderIsPaid: async (res, status, orderId) => {
    await orderRepo.updateOrderPaidStatus(res, status, orderId);
  },
  insertNewPrize: async (res, dataObj, userId) => {
    const { prize, time } = dataObj;

    // Assuming `expirationDate` is set to 7 days from the obtained time
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const prizeDataObj = {
      prize: prize,
      used: 0, // Assuming the default value for 'used' is 0 (not used)
      obtainedTime: time,
      expirationDate: expirationDate.toISOString(),
      userId: userId,
    };

    console.log(prizeDataObj);

    await prizeRepo.insertNewPrize(res, prizeDataObj);
  },
  updatePrizeIsUsed: async (res, loginUserId, prizeId) => {
    await prizeRepo.updatePrizeUsedStatus(res, loginUserId, prizeId);
  },

  checkTodayPrize: async (res, userId) => {
    const result = await prizeRepo.checkTodayPrize(res, userId);
    return result;
  },
  getAllUnusedPrizes: async (res, userId) => {
    const result = await prizeRepo.getAllUnusedPrizesByUserId(res, userId);
    return result;
  },
};
