const tool = require('../../../../../utils/tool');
const productService = require('../../../../../Service/productService');
const searchProductResponse = require('./searchProductRes');
module.exports = {
    handle: async(res,keyword, paging)=>{
        //init
        const limit = 6;
        let response = null;

        //operation
        const sql_condition_obj = {
            detail: null,
            searchKeyword: keyword,
            filter: "null",
            limit: limit,
            paging: paging
        };
        const result = await productService.searchByTitle(res,sql_condition_obj);
        console.log(result);
        response = await searchProductResponse.customize(result,limit,paging);
        return response
        
    }

}