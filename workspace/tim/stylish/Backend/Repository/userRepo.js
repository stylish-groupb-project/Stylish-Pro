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
    selectUserById: async(res,userId)=>{
        const connection = connectionPromise;
        try {
            const [result] = await connection.execute('SELECT * FROM userInfo WHERE id = ?', [userId]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
    },
    insertNewUser: async(res,userInfoObj, connection)=>{
        try {
            const {name , email, hashedPassword , provider , picture} = userInfoObj;
            const signupQuery = 'INSERT INTO userInfo(name, email, password, provider , picture, line_id) VALUES(?,?,?,?,?,?)';
            const [result] = await connection.execute(signupQuery, [name, email, hashedPassword, provider , picture, null]);
            return result;     
        } catch (error) {
            console.error(error);
            errorMsg.query(res);
        }
    },
    resetUserPassword: async(res, userId, password) =>{
        const connection = connectionPromise;
        try {
          const updateQuery = 'UPDATE userInfo SET password = ? WHERE id = ?';
          const [result] = await connection.execute(updateQuery, [password, userId]);
          return result;
        } catch (error) {
          console.error(error);
          errorMsg.query(res);
        }
    },
    createUserResetToken: async (res, userId, userInfoObj) => {
        const connection = connectionPromise;
        try {
          const { resetPasswordToken, resetPasswordExpire } = userInfoObj;
          const updateQuery = 'INSERT INTO user_reset_tokens (reset_password_token, reset_password_expire, user_id) VALUES(?,?,?)';
          const [result] = await connection.execute(updateQuery, [resetPasswordToken, resetPasswordExpire, userId]);
          return result;
        } catch (error) {
          console.error(error);
          errorMsg.query(res);
        }
    },
    updateUserResetToken: async (res, userId, userInfoObj) => {
        const connection = connectionPromise;
        try {
          const { resetPasswordToken, resetPasswordExpire } = userInfoObj;
          const updateQuery = 'UPDATE user_reset_tokens SET reset_password_token = ?, reset_password_expire = ? WHERE user_id = ?';
          const [result] = await connection.execute(updateQuery, [resetPasswordToken, resetPasswordExpire, userId]);
          return result;
        } catch (error) {
          console.error(error);
          errorMsg.query(res);
        }
    },
    updateLineId: async (res, lineId, userId) => {
        const connection = connectionPromise;
        try {
          const updateQuery = 'UPDATE userInfo SET line_id = ? WHERE id = ?';
          const [result] = await connection.execute(updateQuery, [lineId, userId]);
          return result;
        } catch (error) {
          console.error(error);
          errorMsg.query(res);
        }
    },
    deleteUserResetToken: async (res, userId) => {
        const connection = connectionPromise;
        try {
          const [result] = await connection.execute('DELETE FROM user_reset_tokens WHERE user_id = ?', [userId]);
          return result;
        } catch (error) {
          console.error(error);
          errorMsg.query(res);
        }
    },
    selectUserByResetToken: async (res, resetToken) => {
        const connection = connectionPromise;
        try {
          const [result] = await connection.execute('SELECT * FROM user_reset_tokens WHERE reset_password_token = ?', [resetToken]);
          return result;
        } catch (error) {
          console.error(error);
          errorMsg.query(res);
        }
    },      
}