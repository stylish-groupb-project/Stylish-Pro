// const orderCheckHandler = require('../Application/Features/Order/Commands/OderCheck/orderCheckHandler');
const orderCheckHandler = require("../Application/Features/Order/Commands/OrderCheck/orderCheckHandler");
const secKillHandler = require("../Application/Features/Order/Commands/SecKill/secKillHandler");

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
};
