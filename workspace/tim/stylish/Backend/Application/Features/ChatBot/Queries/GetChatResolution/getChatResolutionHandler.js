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
        if (MsgType == "women" || MsgType == "men"){
            const hotProductByGenderRedisKey = `hotProductByGender`;
            let hotProductByGenderRedis = await redis.getCacheByKey(hotProductByGenderRedisKey);
            if (hotProductByGenderRedis == null) {
                result = await chatBotService.getHotestProductByGender(res, MsgType,hotProductByGenderRedisKey);
            } else {
                result = hotProductByGenderRedis;
            }
        }
        
        response = await getChatResolutionResponse.customize(result);
        return response
    }

}