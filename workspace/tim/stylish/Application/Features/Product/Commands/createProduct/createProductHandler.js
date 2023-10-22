const tool = require('../../../../../utils/tool');
const productService = require('../../../../../Service/productService');
const colorService = require('../../../../../Service/colorService');
const sizeService = require('../../../../../Service/sizeService');
const variantService = require('../../../../../Service/variantService');
const imageService = require('../../../../../Service/imageService');
const createProductResponse = require('./createProductRes');
const errorMsg = require('../../../../../utils/error');
module.exports = {
    handle: async (res, data, uploadedPictures) => {
        //init
        let response = null;

        //operation
        const data_json = JSON.parse(data);

        const mainImage = uploadedPictures['main_image'][0];
        console.log(mainImage);
        const otherImages = uploadedPictures['other_images'];
        if(!otherImages || !mainImage) return errorMsg.inputEmpty(res);
        const mainImageUrl = await tool.uploadToS3(mainImage);
        const otherImageUrls = await Promise.all(otherImages.map(tool.uploadToS3));
        console.log("檔案全部上傳到S3成功");

        const result = await productService.insertNewProduct(res,data_json,mainImageUrl);
        console.log(data_json.colors);
        const productId = result.insertId;
        await colorService.addColorIntoProduct(res,data_json.colors,productId);
        await sizeService.addSizeIntoProduct(res,data_json.sizes,productId);
        await variantService.addVariantIntoProduct(res,data_json.variants,productId);
        await imageService.addImageIntoProduct(res,otherImageUrls,productId);

        response = await createProductResponse.customize(result);
        return response;
    }
}