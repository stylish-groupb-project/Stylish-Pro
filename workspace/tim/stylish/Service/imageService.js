const imageRepo = require('../Repository/imageRepo');


module.exports = {
    addImageIntoProduct: async(res,otherImageUrls,productId)=>{
        await imageRepo.insertImages(res,otherImageUrls,productId);        
    }
}