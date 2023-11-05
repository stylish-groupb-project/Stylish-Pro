// const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
module.exports = {
    insertSizes: async(res,sizeArrayObj,productId,connection)=>{
        try {
            for (let i = 0; i < sizeArrayObj.length; i++) {
                const addSizeQuery = 'INSERT INTO product_size(product_id,size) VALUES(?,?)';
                await connection.execute(addSizeQuery, [productId, sizeArrayObj[i]]);
            }
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
        
    }

}