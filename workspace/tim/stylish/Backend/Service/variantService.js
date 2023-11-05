const variantRepo = require('../Repository/variantRepo');

module.exports = {
    addVariantIntoProduct: async(res,variantArrayObj,productId)=>{
        await variantRepo.insertVariants(res,variantArrayObj,productId);        
    }
}