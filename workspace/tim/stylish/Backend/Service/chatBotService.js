const chatBotRepo = require('../Repository/chatBotRepo');

module.exports = {
    getHotestProduct: async(res,hotProductRedisKey)=>{
        const result = await chatBotRepo.getHotestProduct(res,hotProductRedisKey);     
        return result;   
    },
    getHotestProductByGender: async(res,gender,hotestProductRedisKey)=>{
        const result = await chatBotRepo.getHotestProductByGender(res,gender,hotestProductRedisKey);     
        return result;   
    },
    // getHotestMenProduct: async(res,hotestMenProductRedisKey)=>{
    //     const result = await chatBotRepo.getHotestProductByGender(res,hotestMenProductRedisKey);     
    //     return result;   
    // }
}