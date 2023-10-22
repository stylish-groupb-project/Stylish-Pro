const getProductDetailHandler = require('../Application/Features/Product/getProductDetailHandler');
// const productService = require('../Service/productService');
module.exports = {
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