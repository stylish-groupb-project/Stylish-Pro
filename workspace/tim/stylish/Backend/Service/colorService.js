const colorRepo = require('../Repository/colorRepo');


module.exports = {
    addColorIntoProduct: async(res,colorArrayObj,productId)=>{
        await colorRepo.insertColors(res,colorArrayObj,productId);        
    }
}