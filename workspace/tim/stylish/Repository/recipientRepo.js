const errorMsg = require('../utils/error');
module.exports = {
    insertNewRecipient: async (res, recipientDataObj, order_id,connection) => {
        try {
            const { name, phone, email , address , time } = recipientDataObj;
            const insertRecipientQuery = 'INSERT INTO recipients(name, phone, email , address,  prefer_time, order_id) VALUES(?,?,?,?,?,?)';
            const [result] = await connection.execute(insertRecipientQuery, [name, phone, email , address , time, order_id]);
            return result;
        } catch (error) {
            console.error(error);
            errorMsg.query(res)
        }

    }
}