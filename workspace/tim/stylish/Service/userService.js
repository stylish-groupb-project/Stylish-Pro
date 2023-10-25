// Service layer (負責關於資料庫相關的邏輯處理)
const userRepo = require('../Repository/userRepo');
const errorMsg = require('../utils/error');
module.exports = {
    signUp: async (res, userIfoObj) => {
        const checkResult = await userRepo.selectUserByEmail(res,userIfoObj.email);
        if (checkResult.length > 0) {
            return errorMsg.emailExist(res);
        }
        const insertResult = await userRepo.insertNewUser(res,userIfoObj);
        return insertResult;
    },
    signIn: async(res, email)=>{
        const result = await userRepo.selectUserByEmail(res,email);
        if (result.length === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
    getProfile: async(res,userId)=>{
        const result = await userRepo.selectUserById(res,userId);
        if (result.length === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    }
}