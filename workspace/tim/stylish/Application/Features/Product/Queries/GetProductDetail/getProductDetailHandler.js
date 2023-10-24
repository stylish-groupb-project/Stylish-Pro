const tool = require('../../../../../utils/tool');
const productService = require('../../../../../Service/productService');
const productDetailResponse = require('./getProductDetailRes');
const redis = require('../../../../../utils/cache');
module.exports = {
    handle: async(res,productId)=>{
        //init
        const limit = 0;
        let response = null;
        const productRedisKey = `product_${productId}`;

        //operation
        const sql_condition_obj = {
            detail: productId,
            searchKeyword: null,
            filter: null,
            limit: limit,
            paging: 0
        };
        let result = null;
        let cacheObj = redis.getCacheByKey(productRedisKey);
        if(cacheObj === null){
            //
            // 實作Read/Write Through緩存策略 取得同時更新快取
            result = await productService.getProductDetail(res,sql_condition_obj,productRedisKey);
        }else{
            result = cacheObj;
        }
        console.log(result);
        response = await productDetailResponse.customize(result);
        return response
    }

}