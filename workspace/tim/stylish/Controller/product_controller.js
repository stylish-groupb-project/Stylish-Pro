const getProductDetailHandler = require('../Application/Features/Product/Queries/GetProductDetail/getProductDetailHandler');
const searchProductHandler = require('../Application/Features/Product/Queries/SearchProduct/searchProductHandler');
const getFileredProductHandler = require('../Application/Features/Product/Queries/getFilteredProduct/getFilteredProductHandler');
const createProductHandler = require('../Application/Features/Product/Commands/createProduct/createProductHandler');
module.exports = {
    addProduct: async (req, res) => {
        try {
            const { data} = req.body;
            const uploadedPictures = req.files;
            const response=await createProductHandler.handle(res,data,uploadedPictures);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const {paging} = req.query;
            const response=await getFileredProductHandler.handle(res, "null" ,Number(paging) ? paging : 0);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    getMenProduct: async (req, res) => {
        try {
            const {paging} = req.query;
            const response=await getFileredProductHandler.handle(res, "men" ,Number(paging) ? paging : 0);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    getWomenProduct: async (req, res) => {
        try {
            const {paging} = req.query;
            const response=await getFileredProductHandler.handle(res, "women" ,paging ? Number(paging) : 0);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    getAccessories: async (req, res) => {
        try {
            const {paging} = req.query;
            const response=await getFileredProductHandler.handle(res, "accessories" ,paging ? Number(paging) : 0);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    search: async(req,res)=>{
        try {
            const {keyword,paging} = req.query;
            const response=await searchProductHandler.handle(res,keyword,paging ? Number(paging) : 0);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }

    },
    getProductDetail: async(req,res)=>{
        try {
            const {id} = req.query;
            const response=await getProductDetailHandler.handle(res,id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    }
}