const https = require("https");
const productService = require("../../../../../Service/productService");
const orderCheckRes = require("./orderCheckRes");
const errorMsg = require("../../../../../utils/error");
const tool = require("../../../../../utils/tool");
const orderService = require("../../../../../Service/orderService");
// require('dotenv').config();
module.exports = {
  handle: async (res, loginUserId, data) => {
    //init
    // let tapPayResponse = null;
    let finalResponse = null;
    let tappayStatus = false;
    // const partner_key = process.env.PARTNER_KEY;
    const post_options = {
      host: "sandbox.tappaysdk.com",
      port: 443,
      path: "/tpc/payment/pay-by-prime",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
      },
    };
    //check
    if (!data) return errorMsg.inputEmpty(res);
    //不確定要不Json.parse ANS: no
    const { prime, order } = data;
    if (!prime || !order) return errorMsg.inputEmpty(res);
    if (order.list.length === 0)
      return errorMsg.notContainAnyProductInOrder(res);
    console.log(order.list.length);
    for (let i = 0; i < order.list.length; i++) {
      //確保訂單中都有提供正確的 product id
      await productService.simpleSearchById(res, order.list[i].id);
    }

    //operation

    const result = await orderService.insertNewOrder(res, order, loginUserId);
    console.log(result);

    console.log(result.insertId);

    const post_data = {
      prime: prime,
      partner_key:
        "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
      merchant_id: "AppWorksSchool_CTBC",
      details: "TapPay Test",
      amount: 100,
      cardholder: {
        phone_number: "+886923456789",
        name: "王小明",
        email: "LittleMing@Wang.com",
        zip_code: "100",
        address: "台北市天龍區芝麻街1號1樓",
        national_id: "A123456789",
      },
      remember: true,
    };
    tappayStatus = await tool.tappayRequest(post_options, post_data);
    console.log(tappayStatus);
    if (tappayStatus === true) {
      await orderService.updateOrderIsPaid(res, true, result.insertId);
    }
    console.log("Here");

    finalResponse = await orderCheckRes.customize(result);
    console.log("Here!");
    console.log(finalResponse);

    return finalResponse;
  },
};
