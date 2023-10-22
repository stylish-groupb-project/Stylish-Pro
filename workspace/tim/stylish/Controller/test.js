// const getProductDetailHandler = require('../Application/Features/Product/Queries/getProductDetail/getProductDetailHandler');
// const searchProductHandler = require('../Application/Features/Product/Queries/searchProduct/searchProductHandler');

// module.exports = {
//     getProductDetail: async(req,res)=>{
//         try {
//             const {id} = req.query;
//             const response=await getProductDetailHandler.handle(res,id);
//             res.status(200).json(response);
//         } catch (error) {
//             console.log(error)
//         }
//     },
//     search: async(req,res)=>{
//         try {
//             const {keyword,paging} = req.query;
//             const result=await searchProductHandler.handle(res,keyword,paging ? Number(paging) : 0);
//             res.status(200).json(result);
//         } catch (error) {
//             console.log(error)
//         }

//     },

// }