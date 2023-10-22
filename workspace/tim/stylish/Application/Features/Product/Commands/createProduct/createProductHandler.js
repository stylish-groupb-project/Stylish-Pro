const tool = require('../../../../../utils/tool');
const productService = require('../../../../../Service/productService');
const colorService = require('../../../../../Service/colorService');
const sizeService = require('../../../../../Service/sizeService');
const variantService = require('../../../../../Service/variantService');
const imageService = require('../../../../../Service/imageService');
const createProductResponse = require('./createProductRes');
module.exports = {
    handle: async (res, data, uploadedPictures) => {
        //init
        let response = null;

        //operation
        const data_json = JSON.parse(data);

        const mainImage = uploadedPictures['main_image'][0];
        console.log(mainImage);
        const otherImages = uploadedPictures['other_images'];
        const mainImageUrl = await tool.uploadToS3(mainImage);
        const otherImageUrls = await Promise.all(otherImages.map(tool.uploadToS3));
        console.log("檔案全部上傳到S3成功");

        const result = await productService.insertNewProduct(res,data_json,mainImageUrl);
        console.log(data_json.colors);
        const productId = result.insertId;
        await colorService.addColorIntoProduct(data_json.colors,productId);
        await sizeService.addSizeIntoProduct(data_json.sizes,productId);
        await variantService.addVariantIntoProduct(data_json.variants,productId);
        await imageService.addImageIntoProduct(otherImageUrls,productId);

        response = await createProductResponse.customize(result);
        return response;
    }
}