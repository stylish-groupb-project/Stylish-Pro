const tool = require('../../../../../utils/tool');
const chatBotService = require('../../../../../Service/chatBotService');
const getChatResolutionResponse = require('./getChatResolutionRes');
const redis = require('../../../../../utils/cache');
module.exports = {
    handle: async (res, MsgType) => {
        //init
        let response = null;

        //operation
        let result = null;

        if (MsgType == "hot") {
            const hotProductRedisKey = `hotProduct`;
            let hotProductRedis = await redis.getCacheByKey(hotProductRedisKey);
            if (hotProductRedis == null) {
                result = await chatBotService.getHotestProduct(res, hotProductRedisKey);
            } else {
                result = hotProductRedis;
            }
        }
        if (MsgType == "women"){
            const hotProductByWomenRedisKey = `hotProductByWomen`;
            let hotProductByWomenRedis = await redis.getCacheByKey(hotProductByWomenRedisKey);
            if (hotProductByWomenRedis == null) {
                result = await chatBotService.getHotestProductByWomen(res,hotProductByWomenRedisKey);
            } else {
                result = hotProductByWomenRedis;
            }
        }
        if (MsgType == "men"){
            const hotProductByMenRedisKey = `hotProductByMen`;
            let hotProductByMenRedis = await redis.getCacheByKey(hotProductByMenRedisKey);
            if (hotProductByMenRedis == null) {
                result = await chatBotService.getHotestProductByMen(res,hotProductByMenRedisKey);
            } else {
                result = hotProductByMenRedis;
            }
        }
        
        response = await getChatResolutionResponse.customize(result);
        return response
    }

}