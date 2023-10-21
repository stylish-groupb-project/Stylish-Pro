const product = require('../Model/product_model');
module.exports = {
    addProduct: async (req, res) => {
        try {
            const { data} = req.body;
            const uploadedPictures = req.files;
            const result=await product.addProduct(res,data,uploadedPictures);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const {paging} = req.query;
            const result=await product.getProduct(res, "null" ,Number(paging) ? paging : 0);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    },
    getMenProduct: async (req, res) => {
        try {
            const {paging} = req.query;
            const result=await product.getProduct(res, "men" ,Number(paging) ? paging : 0);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    },
    getWomenProduct: async (req, res) => {
        try {
            const {paging} = req.query;
            const result=await product.getProduct(res, "women" ,paging ? Number(paging) : 0);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    },
    getAccessories: async (req, res) => {
        try {
            const {paging} = req.query;
            const result=await product.getProduct(res, "accessories" ,paging ? Number(paging) : 0);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    },
    search: async(req,res)=>{
        try {
            const {keyword,paging} = req.query;
            const result=await product.search(res,keyword,paging ? Number(paging) : 0);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }

    },
    getProductDetail: async(req,res)=>{
        try {
            const {id} = req.query;
            const result=await product.getProductDetail(res,id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }
}