const tool = require('../../../../../utils/tool');
const productService = require('../../../../../Service/productService');
const fileredProductResponse = require('./getFilteredProductRes');
module.exports = {
    handle: async(res, type, paging)=>{
        //init
        const limit = 6;
        let response = null;

        // operation
        const sql_condition_obj = {
            detail: null,
            searchKeyword: null,
            filter: type,
            limit: limit,
            paging: paging
        };
        const result = await productService.getFilteredProductList(res,sql_condition_obj);
        console.log(result);
        response = await fileredProductResponse.customize(result,limit,paging);
        return response

    }
}