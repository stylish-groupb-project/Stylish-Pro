const productRepo = require('../Repository/productRepo');


module.exports = {
    getProductDetail: async(res,sql_condition_obj)=>{
        const result = await productRepo.getProductByCondition(sql_condition_obj);
        if (result.length == 0) return res.status(403).json("product doesn't exist");
        return result;
    }

}