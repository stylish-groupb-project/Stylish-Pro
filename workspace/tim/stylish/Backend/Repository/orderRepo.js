const errorMsg = require('../utils/error');
const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    insertNewOrder: async (res, orderDataObj, connection) => {
        try {
            const { shipping_way, payment_way, subtotal,  freight,total, user_id } = orderDataObj;
            const insertOrderQuery = 'INSERT INTO orders(shipping_way, payment_way, subtotal,  freight,total, user_id , isPaid) VALUES(?,?,?,?,?,?,?)';
            const [result] = await connection.execute(insertOrderQuery, [shipping_way, payment_way, subtotal,  freight,total, user_id , 0]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }

    },
    updateOrderPaidStatus: async(res, status, orderId) => {
        try {
            const connection = await connectionPromise;
            const updateOrderQuery = 'UPDATE orders SET isPaid = ? WHERE id = ?';
            await connection.execute(updateOrderQuery, [ status ? 1:0, orderId]);
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }

    },
    getOrderList: async(res, userId) => {
        const connection = await connectionPromise;
        try {
            const selectQuery = 'SELECT * FROM orders WHERE user_id = ?';
            const [result] = await connection.execute(selectQuery, [userId]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        } finally {
            console.log('connection release');
        }
    },
}