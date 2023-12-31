const errorMsg = require("../utils/error");
const connectionPromise = require("../utils/db").connectionPromise;
module.exports = {
  insertNewOrder: async (res, orderDataObj, connection) => {
    try {
      const {
        shipping_way,
        payment_way,
        subtotal,
        freight,
        total,
        shipping_status,
        user_id,
      } = orderDataObj;
      const insertOrderQuery =
        "INSERT INTO orders(shipping_way, payment_way, subtotal,  freight,total, shipping_status, user_id , isPaid) VALUES(?,?,?,?,?,?,?,?)";
      const [result] = await connection.execute(insertOrderQuery, [
        shipping_way,
        payment_way,
        subtotal,
        freight,
        total,
        shipping_status,
        user_id,
        0,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    }
  },
  updateOrderPaidStatus: async (res, status, orderId) => {
    try {
      const connection = await connectionPromise;
      const updateOrderQuery = "UPDATE orders SET isPaid = ? WHERE id = ?";
      await connection.execute(updateOrderQuery, [status ? 1 : 0, orderId]);
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
    }
  },
  updateOrderPaidStatus: async (res, status, orderId) => {
    try {
      const connection = await connectionPromise;
      const updateOrderQuery = "UPDATE orders SET isPaid = ? WHERE id = ?";
      await connection.execute(updateOrderQuery, [status ? 1 : 0, orderId]);
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
    }
  },
  getOrderInfo: async (res, orderId) => {
    const connection = await connectionPromise;
    try {
      const selectQuery = "SELECT * FROM orders WHERE id = ?";
      const [result] = await connection.execute(selectQuery, [orderId]);
      return result;
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
    }
  },
  getOrderList: async (res, userId) => {
    const connection = await connectionPromise;
    try {
      const selectQuery = "SELECT * FROM orders WHERE user_id = ?";
      const [result] = await connection.execute(selectQuery, [userId]);
      return result;
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
    }
  },
  getAllOrder: async (res) => {
    const connection = await connectionPromise;
    try {
      const selectQuery = "SELECT * FROM orders";
      const [result] = await connection.execute(selectQuery);
      return result;
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
    }
  },
  updateOrderShippingStatus: async (res, orderId, shippingStatus) => {
    const connection = await connectionPromise;
    try {
      const updateQuery = "UPDATE orders SET shipping_status = ? WHERE id = ?";
      await connection.execute(updateQuery, [shippingStatus, orderId]);
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
    }
  },
};
