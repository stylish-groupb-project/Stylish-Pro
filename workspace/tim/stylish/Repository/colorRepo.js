const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');

module.exports = {
    insertColors: async(colorArrayObj,productId)=>{
        const connection = await connectionPromise;
        try {
            for (let i = 0; i < colorArrayObj.length; i++) {
                const addColorQuery = 'INSERT INTO color(name,code,product_id) VALUES(?,?,?)';
                await connection.execute(addColorQuery, [colorArrayObj[i].name, colorArrayObj[i].code, productId]);
            }
        } catch (error) {
            console.error(error);
        }finally {
            console.log('connection release');
        }
        
    }

}