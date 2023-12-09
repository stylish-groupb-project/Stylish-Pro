const errorMsg = require('../utils/error');
const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    insertOrderList: async (res, dataArray, connection) => {
        try {
            console.log(dataArray);
            const query = 'INSERT INTO order_product (price, color_code, color_name, size, qty ,product_id) VALUES ?';
            const [result] = await connectionPromise.execute(query, dataArray);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }
    },
    simpleSearch: async (res) => {
        const connection = await connectionPromise;
        try {
            const selectQuery = 'SELECT * FROM order_product LIMIT 5';
            const [result] = await connection.execute(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    },
    monitorByColor: async (res) => {
        const connection = await connectionPromise;
        try {
            const selectQuery = 'SELECT color_code, color_name, COUNT(*) AS total_count FROM order_product GROUP BY color_code, color_name';
            const [result] = await connection.execute(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    },
    monitorByPriceRange: async (res) => {
        const connection = await connectionPromise;
        try {
            const selectQuery = `
            SELECT 
                FLOOR((price - 500) / 20) AS price_range,
                COUNT(*) AS total_quantity
            FROM order_product
            WHERE price >= 500
            GROUP BY price_range
            ORDER BY price_range;
            `;
            const [result] = await connection.execute(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    },
    monitorByTopSize: async (res) => {
        const connection = await connectionPromise;
        try {
            const selectQuery = `
                SELECT product_id, size, SUM(qty) as total_qty
                FROM order_product
                GROUP BY product_id, size
                ORDER BY SUM(qty) DESC
                LIMIT 5;
            `;
            const [result] = await connection.execute(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    },
    monitorRevenue: async (res) => {
        const connection = await connectionPromise;
        try {
            const selectQuery = `
                SELECT SUM(price * qty) AS totalRevenue
                FROM order_product;
            `;
            const [result] = await connection.execute(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    }
}