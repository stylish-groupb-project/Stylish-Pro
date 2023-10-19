const product = require('../Model/product_model');
module.exports = {
    addProduct: async (req, res) => {
        try {
            const { data} = req.body;
            const uploadedPictures = req.files;
            const filenames = uploadedPictures.map((img) => img.filename);
            console.log(filenames[0]);
            console.log(filenames.length);
            const result=await product.addProduct(res,data,filenames);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }
}