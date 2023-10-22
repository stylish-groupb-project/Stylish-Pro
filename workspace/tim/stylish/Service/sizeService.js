const sizeRepo = require('../Repository/sizeRepo');

module.exports = {
    addSizeIntoProduct: async(res,sizeArrayObj,productId)=>{
        await sizeRepo.insertSizes(sizeArrayObj,productId);        
    }
}