const errorMsg = require('../../../../../utils/error');
const tool = require('../../../../../utils/tool');

const orderService = require('../../../../../Service/orderService');
const orderManageRes = require('./orderManageRes');
module.exports = {
    handle: async (res) => {
        //init
        let response = null;
        //check
        
        //operation
        const getOrderdata = await orderService.getAllOrder(res);
        response = await orderManageRes.customize(getOrderdata);
        return response;
    }
}