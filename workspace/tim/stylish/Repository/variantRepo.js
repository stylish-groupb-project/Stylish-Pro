const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
module.exports = {
    insertVariants: async(res,variantArrayObj,productId)=>{
        const connection = await connectionPromise;
        try {
            for (let i = 0; i < variantArrayObj.length; i++) {
                const addVariantQuery = 'INSERT INTO variant(color_code,size,stock,product_id) VALUES(?,?,?,?)';
                await connection.execute(addVariantQuery, [variantArrayObj[i].color_code, variantArrayObj[i].size, variantArrayObj[i].stock, productId]);
            }
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }finally {
            console.log('connection release');
        }
        
    }

}