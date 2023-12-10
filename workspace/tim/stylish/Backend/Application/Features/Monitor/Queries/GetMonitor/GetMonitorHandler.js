const getMonitorRes = require('./GetMonitorRes');
const errorMsg = require('../../../../../utils/error');
const tool = require('../../../../../utils/tool');
const axios = require('axios');
const monitorService = require('../../../../../Service/monitorService');
// require('dotenv').config();
module.exports = {
    handle: async (res) => {
        //init
        let finalResponse = null;

        //check
        let totalRevenue = 0;
        const checkDbforInsertOrNot = await monitorService.simpleSearch();
        if (checkDbforInsertOrNot.length === 0) {
            const responseArray = await tool.fetchOrder();
            const batchSize = 200;
            for (let i = 0; i < responseArray.length; i += batchSize) {
                console.log(responseArray.slice(i, i + batchSize));
                const batch = responseArray.slice(i, i + batchSize)
                await monitorService.insertOrderList(res, batch);
            }
            
        }
        totalRevenue = await monitorService.monitorRevenue(res);
        console.log(totalRevenue);

        const colorMonitor = await monitorService.monitorByColor(res);
        console.log(colorMonitor);
        if (colorMonitor.length == 0) return errorMsg.monitorProblem(res);
        const colorRes = await tool.processColorData(colorMonitor);

        const priceRangeMonitor = await monitorService.monitorByPriceRange(res);
        if (priceRangeMonitor.length == 0) return errorMsg.monitorProblem(res);
        console.log(priceRangeMonitor);

        const topProductSizeMonitor = await monitorService.monitorBySize(res)
        if (topProductSizeMonitor.length == 0) return errorMsg.monitorProblem(res);
        console.log(topProductSizeMonitor);


        const result = {
            totalRevenue: totalRevenue,
            colorResObj: colorRes,
            priceRangeMonitor: priceRangeMonitor,
            topProductSizeMonitor: topProductSizeMonitor
        };




        finalResponse = await getMonitorRes.customize(result);

        return finalResponse;
    }
}