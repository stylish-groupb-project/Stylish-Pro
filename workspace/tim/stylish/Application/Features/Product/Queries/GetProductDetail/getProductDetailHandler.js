const tool = require('../../../../../utils/tool');
const productService = require('../../../../../Service/productService');
const productDetailResponse = require('./getProductDetailRes');
module.exports = {
    handle: async(res,productId)=>{
        //init
        const limit = 0;
        let response = null;

        //operation
        const sql_condition_obj = {
            detail: productId,
            searchKeyword: null,
            filter: null,
            limit: limit,
            paging: 0
        };
        const result = await productService.getProductDetail(res,sql_condition_obj);
        console.log(result);
        response = await productDetailResponse.customize(result);
        return response

    }

}