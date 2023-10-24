const productRepo = require('../Repository/productRepo');
const colorRepo = require('../Repository/colorRepo');
const sizeRepo = require('../Repository/sizeRepo');
const imageRepo = require('../Repository/imageRepo');
const variantRepo = require('../Repository/variantRepo');
const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    getProductDetail: async (res, sql_condition_obj, productRedisKey) => {
        const result = await productRepo.getProductByCondition(res, sql_condition_obj, productRedisKey);
        if (result.length == 0) return res.status(403).json("product doesn't exist");
        return result;
    },
    searchByTitle: async (res, sql_condition_obj) => {
        const result = await productRepo.getProductByCondition(res, sql_condition_obj);
        return result;
    },
    getFilteredProductList: async (res, sql_condition_obj) => {
        const result = await productRepo.getProductByCondition(res, sql_condition_obj);
        return result;
    },
    insertNewProduct: async (res, productDataObj, mainImageUrl, otherImageUrls) => {
        const connection = await connectionPromise.getConnection();
        try {
            //transaction 
            await connection.beginTransaction();

            const result = await productRepo.insertNewProduct(res, productDataObj, mainImageUrl, connection);
            const newProductId = result.insertId;
            const insertConcurrency = [
                colorRepo.insertColors(res, productDataObj.colors, newProductId ,connection),
                sizeRepo.insertSizes(res, productDataObj.sizes, newProductId, connection),
                variantRepo.insertVariants(res, productDataObj.variants, newProductId, connection),
                imageRepo.insertImages(res, otherImageUrls, newProductId, connection)
            ];
            await Promise.all(insertConcurrency);

            await connection.commit();

            return result;
        } catch (error) {
            await connection.rollback();
            console.error(error);
            errorMsg.query(res);
        } finally {
            console.log('connection release');
            connection.release();
        }
    }

}