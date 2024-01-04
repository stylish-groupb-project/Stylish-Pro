const errorMsg = require('../../../../../utils/error');
const tool = require('../../../../../utils/tool');

const orderService = require('../../../../../Service/orderService');
const userService = require('../../../../../Service/userService');
const manageShipRes = require('./manageShipRes');
const {client} = require('../../../../../utils/line_bot');

module.exports = {
    handle: async (res, orderId, shippingStatus) => {
        //init
        let response = null;
        //check
        
        //operation
        console.log(shippingStatus);
        await orderService.updateOrderShippingStatus(res, orderId, shippingStatus);
        const getOrderdata = await orderService.getOrderInfo(res, orderId);
        const userId = getOrderdata[0].user_id;
        const getUserdata = await userService.getProfile(res, userId);
        const lineUserId = getUserdata[0].line_id;
        console.log(getOrderdata);
        console.log(lineUserId);
        let status_message = '來自stylish最新訂單通知：';

        // const lineUserId = "U630da0bf5fe7748953c54fdf36d219bd";

        if(shippingStatus === "Shipping"){
           status_message += '\n您的訂單已出貨';
        }else if(shippingStatus === "Delivered"){
           status_message += '\n您的訂單已送達';
        }

       status_message += `\n訂單編號：${orderId}`;
       status_message += `\n運送狀態：${shippingStatus}`;

        const message = {
            type: 'text',
            text: status_message,
        };
       
        try {
            await client.pushMessage(lineUserId, message);
            console.log('Push message successfully sent!');
        } catch (error) {
            console.error('Error sending push message:', error);
        }
        response = await manageShipRes.customize(getOrderdata);
        return response;
    }
}