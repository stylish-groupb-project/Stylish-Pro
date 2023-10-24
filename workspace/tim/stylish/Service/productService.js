const productRepo = require('../Repository/productRepo');
const colorRepo = require('../Repository/colorRepo');
const sizeRepo = require('../Repository/sizeRepo');
const imageRepo = require('../Repository/imageRepo');
const variantRepo = require('../Repository/variantRepo');
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
    insertNewProduct: async(res,productDataObj,mainImageUrl,otherImageUrls)=>{
        const result = await productRepo.insertNewProduct(res,productDataObj,mainImageUrl);
        const newProductId = result.insertId;
        const insertConcurrency = [
            colorRepo.insertColors(res, productDataObj.colors, newProductId),
            sizeRepo.insertSizes(res, productDataObj.sizes, newProductId),
            variantRepo.insertVariants(res,productDataObj.variants, newProductId),
            imageRepo.insertImages(res,otherImageUrls,newProductId)
        ];
        await Promise.all(insertConcurrency);
        return result;
    }

}