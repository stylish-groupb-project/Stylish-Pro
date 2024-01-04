// const orderCheckHandler = require('../Application/Features/Order/Commands/OderCheck/orderCheckHandler');
const orderCheckHandler = require("../Application/Features/Order/Commands/OrderCheck/orderCheckHandler");
const secKillHandler = require("../Application/Features/Order/Commands/SecKill/secKillHandler");
const prizeHandler = require("../Application/Features/Order/Commands/Prize/prizeHandler");

module.exports = {
  checkout: async (req, res) => {
    try {
      const loginUserId = req.decodedToken.id;
      const { prime, order, isSeckill = false } = req.body;
      const data = {
        prime: prime,
        order: order,
      };
      console.log(prime);
      console.log(order);

      console.log("isSecKill", isSeckill);
      if (isSeckill) {
        const secKillResult = await secKillHandler.handle(
          res,
          loginUserId,
          data
        );
        res.status(200).json(secKillResult);
      } else {
        const response = await orderCheckHandler.handle(res, loginUserId, data);
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
  prize: async (req, res) => {
    try {
      const loginUserId = req.decodedToken.id;
      const { data } = req.body;

      const response = await prizeHandler.handle(res, loginUserId, data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  checkTodayPrize: async (req, res) => {
    try {
      const loginUserId = req.decodedToken.id;

      const response = await prizeHandler.check(res, loginUserId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  updatePrizeStatus: async (req, res) => {
    try {
      const loginUserId = req.decodedToken.id;
      const prizeId = req.params.prizeId;
      console.log(loginUserId);
      console.log(prizeId);

      const response = await prizeHandler.updatePrizeStatus(
        res,
        loginUserId,
        prizeId
      );
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllUnusedPrizes: async (req, res) => {
    try {
      const loginUserId = req.decodedToken.id;

      const response = await prizeHandler.getAllUnusedPrizes(res, loginUserId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
