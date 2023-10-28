const https = require('https');
const productService = require('../../../../../Service/productService');
const orderCheckRes = require('./orderCheckRes');
const errorMsg = require('../../../../../utils/error');
const orderService = require('../../../../../Service/orderService');
// require('dotenv').config();
module.exports = {
    handle: async (res, loginUserId, data) => {
        //init
        let tapPayResponse = null;
        let finalResponse = null;
        // const partner_key = process.env.PARTNER_KEY;
        const post_options = {
            host: 'sandbox.tappaysdk.com',
            port: 443,
            path: '/tpc/payment/pay-by-prime',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
            }
        };
        //check
        if(!data) return errorMsg.inputEmpty(res);
        //不確定要不Json.parse
        const { prime, order } = data;
        if(!prime || !order) return errorMsg.inputEmpty(res);
        // const orderObj = JSON.parse(order);
        if(order.list.length === 0) return errorMsg.notContainAnyProductInOrder(res);
        for(let i=0;i<order.list.length;i++){
            //確保訂單中都有提供正確的 product id
            await productService.simpleSearchById(order.list[i].id);
        }

        //operation
        const post_data = {
            "prime": prime,
            "partner_key": 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
            "merchant_id": "AppWorksSchool_CTBC",
            "details": "TapPay Test",
            "amount": 100,
            "cardholder": {
                "phone_number": "+886923456789",
                "name": "王小明",
                "email": "LittleMing@Wang.com",
                "zip_code": "100",
                "address": "台北市天龍區芝麻街1號1樓",
                "national_id": "A123456789"
            },
            "remember": true
        };

        const post_req = https.request(post_options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (body) {
                tapPayResponse = JSON.parse(body);
                // return res.json({
                //     result: JSON.parse(body)
                // })
            });
        });
        post_req.write(JSON.stringify(post_data));
        post_req.end();
        console.log(tapPayResponse);

        const result = await orderService.insertNewOrder(res,order,loginUserId);
        finalResponse = await orderCheckRes.customize(result);
        return finalResponse;
    }
}