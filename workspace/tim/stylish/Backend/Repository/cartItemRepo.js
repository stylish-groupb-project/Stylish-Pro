const errorMsg = require('../utils/error');
module.exports = {
    /**
     * 加入購物車列表用
     * @param {Object} res - The obj response for client
     * @param {Object} itemDataObj - product data
     * @param {string} connection - transaction use
     * @returns {Array || error}
     */
    insertNewItem: async (res, itemDataObj, connection) => {
        try {
            const { id, size, color_code, color_name ,qty ,user_id , order_id} = itemDataObj;

            const insertNewItemQuery = 'INSERT INTO cart_items(size, color_code, color_name ,quantity ,user_id , order_id ,product_id) VALUES(?,?,?,?,?,?,?)';
            const [result] = await connection.execute(insertNewItemQuery, [size, color_code, color_name ,qty ,user_id , order_id ,id]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }
    },
    updateCartItems: async (res,userId,orderId,connection)=>{
        try {
            const updateItemsQuery = 'UPDATE cart_items SET order_id = ? WHERE user_id = ? AND order_id IS NULL';
            await connection.execute(updateItemsQuery, [orderId,userId]);
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }
    },
    getCartItemList: async (res,userId)=>{
        try {
            const getItemsQuery = 'SELECT * FROM cart_items WHERE user_id = ? AND order_id = ?';
            const [result] = await connection.execute(getItemsQuery, [userId,null]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }
    }
}