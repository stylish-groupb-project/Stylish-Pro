const errorMsg = require('../utils/error');
const monitorRepo = require('../Repository/monitorRepo');
const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    insertOrderList: async (res, dataArray) => {
        const connection = await connectionPromise.getConnection();
        try {
            await connection.beginTransaction();
            await monitorRepo.insertOrderList(res, dataArray, connection);

        } catch (error) {
            console.log(error);
            await connection.rollback();
            errorMsg.query(res);
        } finally {
            console.log('connection release');
            connection.release();
        }
    },
    simpleSearch: async (res) => {
        const result = await monitorRepo.simpleSearch(res);
        return result;
    },
    monitorByColor: async (res) => {
        const result = await monitorRepo.monitorByColor(res);
        return result;
    },
    monitorByPriceRange: async (res) => {
        const result = await monitorRepo.monitorByPriceRange(res);
        console.log(result);
        let prices = [];
        result.forEach(row => {
        for (let i = 0; i < row.qty; i++) {
          prices.push(row.price);
        }
      });
        return prices;
    },
    monitorBySize: async (res) => {
        const result = await monitorRepo.monitorByTopSize(res);
        return result;
    },
    monitorRevenue: async (res) => {
        const result = await monitorRepo.monitorRevenue(res);
        return result;
    },

}
