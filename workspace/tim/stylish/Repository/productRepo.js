const connectionPromise = require('../utils/db').connectionPromise;
const sql_view = require('../utils/sql_view');
const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
const redis = require('../utils/cache');

module.exports = {
    /**
     * Implement Read/Write Through strategy
     * @param {Object} res - The obj response for client
     * @param {Object} sql_condition_obj -customize insert sql
     * @param {string} productRedisKey -The key of product redis
     * @returns {Array || error}
     */
    getProductByCondition: async (res, sql_condition_obj, productRedisKey) => {
        const connection = await connectionPromise;
        try {
            const selectQuery = await sql_view.getProducts(sql_condition_obj);
            console.log(selectQuery);
            const [result] = await connection.execute(selectQuery);
            await redis.updateCache(productRedisKey, result);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    },
    insertNewProduct: async (res, productDataObj, mainImageUrl) => {
        const connection = await connectionPromise;
        try {
            const { category, title, description, price, texture, wash, place, note, story } = productDataObj;
            const insertProductQuery = 'INSERT INTO product(category,title,description,price,texture, wash, place, note, story ,main_image) VALUES(?,?,?,?,?,?,?,?,?,?)';
            const [result] = await connection.execute(insertProductQuery, [category, title, description, price, texture, wash, place, note, story, mainImageUrl]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    }


}