const connectionPromise = require('../utils/db').connectionPromise;
const sql_view = require('../utils/sql_view');
const tool = require('../utils/tool');

module.exports = {
    getProductByCondition: async(sql_condition_obj)=>{
        const connection = await connectionPromise;
        try {
            const selectQuery = await sql_view.getProducts(sql_condition_obj);
            console.log(selectQuery);
            const [result] = await connection.execute(selectQuery);
            return result;
        } catch (error) {
            console.error(error);
        }finally {
            console.log('connection release');
        }
    },
    insertNewProduct: async(productDataObj,mainImageUrl)=>{
        const connection = await connectionPromise;
        try {
            const { category, title, description, price, texture, wash, place, note, story }  = productDataObj;
            const insertProductQuery = 'INSERT INTO product(category,title,description,price,texture, wash, place, note, story ,main_image) VALUES(?,?,?,?,?,?,?,?,?,?)';
            const [result] = await connection.execute(insertProductQuery, [category, title, description, price, texture, wash, place, note, story, mainImageUrl]);
            return result;
        } catch (error) {
            console.error(error);
        }finally {
            console.log('connection release');
        }
    }


}