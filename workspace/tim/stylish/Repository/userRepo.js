const tool = require('../utils/tool');
const errorMsg = require('../utils/error');
const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    selectUserByEmail: async(res,email)=>{
        const connection = connectionPromise;
        try {
            const [result] = await connection.execute('SELECT * FROM userInfo WHERE email = ?', [email]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
    },
    insertNewUser: async(res,userInfoObj)=>{
        const connection = connectionPromise;
        try {
            const {name , email, hashedPassword , provider , picture} = userInfoObj;
            const signupQuery = 'INSERT INTO userInfo(name, email, password, provider , picture) VALUES(?,?,?,?,?)';
            const [result] = await connection.execute(signupQuery, [name, email, hashedPassword, provider , picture]); 
            return result;     
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
    }
}