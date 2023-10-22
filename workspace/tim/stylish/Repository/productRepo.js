const connectionPromise = require('../utils/db').connectionPromise;
const sql_view = require('../utils/sql_view');
const tool = require('../utils/tool');

module.exports = {
    getProductByCondition: async(sql_condition_obj)=>{
        const connection = await connectionPromise;
        try {
            const selecthQuery = await sql_view.getProducts(sql_condition_obj, 0, 0);
            console.log(selecthQuery);
            const [result] = await connection.execute(selecthQuery);
            return result;
        } catch (error) {
            console.error(error);
        }
        finally {
            console.log('connection release');
        }
    }


}