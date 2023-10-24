const productRepo = require('../Repository/productRepo');


module.exports = {
    getProductDetail: async(res,sql_condition_obj,productRedisKey)=>{
        const result = await productRepo.getProductByCondition(res,sql_condition_obj,productRedisKey);
        if (result.length == 0) return res.status(403).json("product doesn't exist");
        return result;
    },
    searchByTitle: async(res,sql_condition_obj)=>{
        const result = await productRepo.getProductByCondition(res,sql_condition_obj);
        return result;
    },
    getFilteredProductList: async(res,sql_condition_obj)=>{
        const result = await productRepo.getProductByCondition(res,sql_condition_obj);
        return result;
    },
    insertNewProduct: async(res,productDataObj,mainImageUrl)=>{
        const result = await productRepo.insertNewProduct(res,productDataObj,mainImageUrl);
        return result;
    }

}