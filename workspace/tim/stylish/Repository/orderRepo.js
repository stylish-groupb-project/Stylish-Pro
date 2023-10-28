const errorMsg = require('../utils/error');
module.exports = {
    insertNewOrder: async (res, orderDataObj, connection) => {
        try {
            const { shipping_way, payment_way, subtotal,  freight,total, user_id } = orderDataObj;
            const insertOrderQuery = 'INSERT INTO orders(shipping_way, payment_way, subtotal,  freight,total, user_id) VALUES(?,?,?,?,?,?)';
            const [result] = await connection.execute(insertOrderQuery, [shipping_way, payment_way, subtotal,  freight,total, user_id]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }

    }
}