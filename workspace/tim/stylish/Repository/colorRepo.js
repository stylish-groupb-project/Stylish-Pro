const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
module.exports = {
    insertColors: async(res,colorArrayObj,productId)=>{
        const connection = await connectionPromise;
        try {
            for (let i = 0; i < colorArrayObj.length; i++) {
                const addColorQuery = 'INSERT INTO color(name,code,product_id) VALUES(?,?,?)';
                await connection.execute(addColorQuery, [colorArrayObj[i].name, colorArrayObj[i].code, productId]);
            }
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }finally {
            console.log('connection release');
        }
        
    }

}