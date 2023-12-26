const connectionPromise = require('../utils/db').connectionPromise;
const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
const redis = require('../utils/cache');
module.exports = {
    getHotestProduct: async (res, hotProductRedisKey) => {
        try {
            const connection = connectionPromise;
            const query = `
                SELECT p.id, p.title, p.description, p.main_image, p.texture, p.place
                FROM product AS p
                JOIN order_product AS op ON p.id = op.product_id
                GROUP BY p.id
                ORDER BY SUM(op.qty) DESC
                LIMIT 1;
            `;
            const [result] =  await connection.execute(query);
            if (hotProductRedisKey != '') {
                await redis.updateCache(hotProductRedisKey, result);
            }
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }

    },
    getHotestProductByMen: async (res,hotestMenProductRedisKey) => {
        try {
            const connection = connectionPromise;
            const query = `
                SELECT p.id, p.title, p.description, p.main_image, p.texture, p.place
                FROM product AS p
                JOIN order_product AS op ON p.id = op.product_id
                WHERE p.category = 'men'
                GROUP BY p.id
                ORDER BY SUM(op.qty) DESC
                LIMIT 1;
            `;
            const [result] =  await connection.execute(query);
            if (hotestMenProductRedisKey != '') {
                await redis.updateCache(hotestMenProductRedisKey, result);
            }
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }
    },
    getHotestProductByWomen: async (res,hotestWomenProductRedisKey) => {
        try {
            const connection = connectionPromise;
            const query = `
                SELECT p.id, p.title, p.description, p.main_image, p.texture, p.place
                FROM product AS p
                JOIN order_product AS op ON p.id = op.product_id
                WHERE p.category = 'women'
                GROUP BY p.id
                ORDER BY SUM(op.qty) DESC
                LIMIT 1;
            `;
            const [result] =  await connection.execute(query);
            if (hotestWomenProductRedisKey != '') {
                await redis.updateCache(hotestWomenProductRedisKey, result);
            }
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }
    }

}