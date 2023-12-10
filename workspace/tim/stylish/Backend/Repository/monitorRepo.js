const errorMsg = require('../utils/error');
const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    insertOrderList: async (res, order, connection) => {
        try {
            console.log(order);
            //(?,?,?,?,?,?)
            // const query = 'INSERT INTO order_product (price, color_code, color_name, size, qty ,product_id) VALUES ?';
            const query = 'INSERT INTO order_product (price, color_code, color_name, size, qty ,product_id) VALUES (?,?,?,?,?,?)';
            
            // // order.price, order.color_code, order.color_name, order.size , order.qty , order.product_id
            
            await connection.execute(query, [order.price, order.color_code, order.color_name, order.size , order.qty , order.product_id]);

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
            const query = 'SELECT price, qty FROM order_product';
            const [result] = await connection.execute(query);
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
            const query = `
                SELECT op.product_id, op.size, SUM(op.qty) as total_qty
                FROM order_product op
                INNER JOIN (
                    SELECT product_id
                    FROM order_product
                    GROUP BY product_id
                    ORDER BY SUM(qty) DESC
                    LIMIT 5
                ) top_products ON op.product_id = top_products.product_id
                GROUP BY op.product_id, op.size
                ORDER BY SUM(qty) DESC;
            `;
            const [result] = await connection.execute(query);
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
            return result[0];
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    }
}