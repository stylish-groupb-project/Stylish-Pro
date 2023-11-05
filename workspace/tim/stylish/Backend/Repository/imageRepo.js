// const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
module.exports = {
    insertImages: async(res,otherImageUrls,productId,connection)=>{
        try {
            for (let i = 0; i < otherImageUrls.length; i++) {
                const addImageQuery = 'INSERT INTO images(url,product_id) VALUES(?,?)';
                await connection.execute(addImageQuery, [otherImageUrls[i], productId]);
            }
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }
    }

}