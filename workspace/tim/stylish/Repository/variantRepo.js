// const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
module.exports = {
    insertVariants: async(res,variantArrayObj,productId,connection)=>{
        try {
            for (let i = 0; i < variantArrayObj.length; i++) {
                const addVariantQuery = 'INSERT INTO variant(color_code,size,stock,product_id) VALUES(?,?,?,?)';
                await connection.execute(addVariantQuery, [variantArrayObj[i].color_code, variantArrayObj[i].size, variantArrayObj[i].stock, productId]);
            }
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
        
    },
    findByColorAndSizeAndPid: async(res,dataObj,connection)=>{
        try {
            const {color ,size ,product_id} = dataObj;
            const findQuery = 'SELECT  * FROM variant WHERE product_id = ? AND color_code = ? AND size = ?';
            const [result] = await connection.execute(findQuery, [product_id, color , size]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
        
    },
    updateVariantStock: async(res,qty,variant_id,connection)=>{
        try {
            const updateQuery = 'UPDATE variant SET stock = stock - ? WHERE id = ?';
            await connection.execute(updateQuery, [qty,variant_id]);
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
    }

}