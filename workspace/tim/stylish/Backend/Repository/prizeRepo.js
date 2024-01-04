const errorMsg = require("../utils/error");
const connectionPromise = require("../utils/db").connectionPromise;

module.exports = {
  insertNewPrize: async (res, prizeDataObj) => {
    try {
      const connection = await connectionPromise;

      const { prize, used, obtainedTime, expirationDate, userId } =
        prizeDataObj;

      console.log(prizeDataObj);
      const insertPrizeQuery =
        "INSERT INTO prizes(prize, used, obtainedTime, expirationDate, userId) VALUES(?,?,?,?,?)";

      const [result] = await connection.execute(insertPrizeQuery, [
        prize,
        used,
        obtainedTime,
        expirationDate,
        userId,
      ]);
      console.log(result);

      return result;
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    }
  },

  updatePrizeUsedStatus: async (res, userId, prizeId) => {
    try {
      const connection = await connectionPromise;
      console.log("userId", userId);
      console.log("prizeId", prizeId);

      const updatePrizeQuery =
        "UPDATE prizes SET used = 1 WHERE userId = ? AND id = ?";

      const [result] = await connection.execute(updatePrizeQuery, [
        userId,
        prizeId,
      ]);

      if (result.affectedRows > 0) {
        return { success: true, message: "Prize updated successfully" };
      } else {
        return { success: false, message: "Prize not found or already used" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      console.log("connection release");
    }
  },

  checkTodayPrize: async (res, userId) => {
    try {
      const connection = await connectionPromise;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const checkPrizeQuery =
        "SELECT * FROM prizes WHERE userId = ? AND DATE(obtainedTime) = ?";
      const [result] = await connection.execute(checkPrizeQuery, [
        userId,
        today.toISOString(),
      ]);

      console.log(result);
      console.log("length", result.length);
      console.log("here", result.length > 0);

      return result.length > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllUnusedPrizesByUserId: async (res, userId) => {
    try {
      const connection = await connectionPromise;

      const getAllUnusedPrizesQuery =
        "SELECT * FROM prizes WHERE userId = ? AND used = 0";

      const [result] = await connection.execute(getAllUnusedPrizesQuery, [
        userId,
      ]);

      console.log(result);

      return result;
    } catch (error) {
      console.error(error);
      errorMsg.query(res);
    }
  },
};
