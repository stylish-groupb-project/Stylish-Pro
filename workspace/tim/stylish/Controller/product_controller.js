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
    },
    getAllProduct: async (req, res) => {
        try {
            const {paging} = req.query;
            const result=await product.getAllProduct(res, paging ? paging : 0);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }
    // getMenProduct: async (req, res) => {
    //     try {
    //         const { data} = req.body;
    //         const uploadedPictures = req.files;
    //         const filenames = uploadedPictures.map((img) => img.filename);
    //         console.log(filenames[0]);
    //         console.log(filenames.length);
    //         const result=await product.addProduct(res,data,filenames);
    //         res.status(200).json(result);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
    // getWomenProduct: async (req, res) => {
    //     try {
    //         const { data} = req.body;
    //         const uploadedPictures = req.files;
    //         const filenames = uploadedPictures.map((img) => img.filename);
    //         console.log(filenames[0]);
    //         console.log(filenames.length);
    //         const result=await product.addProduct(res,data,filenames);
    //         res.status(200).json(result);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
    // getAccessories: async (req, res) => {
    //     try {
    //         const { data} = req.body;
    //         const uploadedPictures = req.files;
    //         const filenames = uploadedPictures.map((img) => img.filename);
    //         console.log(filenames[0]);
    //         console.log(filenames.length);
    //         const result=await product.addProduct(res,data,filenames);
    //         res.status(200).json(result);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}