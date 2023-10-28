const orderRepo = require('../Repository/orderRepo');
const variantRepo = require('../Repository/variantRepo');
const recipientRepo = require('../Repository/recipientRepo');
const cartItemRepo = require('../Repository/cartItemRepo');
const connectionPromise = require('../utils/db').connectionPromise;
const errorMsg = require('../utils/error');
module.exports = {
    insertNewOrder: async (res, dataObj , userId) => {
        const connection = await connectionPromise.getConnection();
        try {
            //transaction 
            await connection.beginTransaction();
            const {shipping , payment , subtotal , freight , total ,recipient , list} = dataObj;
            const orderObj ={
                shipping_way: shipping,
                payment_way: payment,
                subtotal: subtotal,
                freight: freight,
                total: total,
                userId: userId
            };
            const result = await orderRepo.insertNewOrder(res,orderObj,connection);
            const newOrderId = result.insertId;
            const concurrencyQuery =[
                recipientRepo.insertNewRecipient(res,recipient , newOrderId ,connection),
                cartItemRepo.updateCartItems(res, userId, newOrderId ,connection)
            ];
            await Promise.all(concurrencyQuery);
            for (let i=0;i<list.length;i++){
                const variantObj = {
                    color: list[i].color.code,
                    size: list[i].size,
                    product_id: list[i].id
                };
                const findVariant = await variantRepo.findByColorAndSizeAndPid(res,variantObj,connection);
                if(findVariant.length === 0) return errorMsg.variantProblem(res);
                //可能剛好同時兩個人下單那個貨物而貨物只剩1
                if(findVariant.stock - list[i].qty <= 0) return errorMsg.stockProblem(res);
                await variantRepo.updateVariantStock(res,list[i].qty,list[i].id,connection);
            }
            await connection.commit();
            return result;

        }catch (error) {
            await connection.rollback();
            console.error(error);
            errorMsg.query(res);
        } finally {
            console.log('connection release');
            connection.release();
        }
    }
}