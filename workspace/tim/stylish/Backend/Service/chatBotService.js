const chatBotRepo = require('../Repository/chatBotRepo');

module.exports = {
    getHotestProduct: async(res,hotProductRedisKey)=>{
        const result = await chatBotRepo.getHotestProduct(res,hotProductRedisKey);     
        return result;   
    },
    getHotestProductByWomen: async(res,hotestWomenProductRedisKey)=>{
        const result = await chatBotRepo.getHotestProductByWomen(res,hotestWomenProductRedisKey);     
        return result;   
    },
    getHotestProductByMen: async(res,hotestMenProductRedisKey)=>{
        const result = await chatBotRepo.getHotestProductByMen(res,hotestMenProductRedisKey);     
        return result;   
    }
    // getHotestMenProduct: async(res,hotestMenProductRedisKey)=>{
    //     const result = await chatBotRepo.getHotestProductByGender(res,hotestMenProductRedisKey);     
    //     return result;   
    // }
}