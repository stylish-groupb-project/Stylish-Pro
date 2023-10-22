const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');

module.exports = {
    insertImages: async(otherImageUrls,productId)=>{
        const connection = await connectionPromise;
        try {
            for (let i = 0; i < otherImageUrls.length; i++) {
                const addImageQuery = 'INSERT INTO images(url,product_id) VALUES(?,?)';
                await connection.execute(addImageQuery, [otherImageUrls[i], productId]);
            }
        } catch (error) {
            console.error(error);
        }finally {
            console.log('connection release');
        }
    }

}