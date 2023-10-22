const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');

module.exports = {
    insertSizes: async(sizeArrayObj,productId)=>{
        const connection = await connectionPromise;
        try {
            for (let i = 0; i < sizeArrayObj.length; i++) {
                const addSizeQuery = 'INSERT INTO product_size(product_id,size) VALUES(?,?)';
                await connection.execute(addSizeQuery, [productId, sizeArrayObj[i]]);
            }
        } catch (error) {
            console.error(error);
        }finally {
            console.log('connection release');
        }
        
    }

}