
const userRepo = require('../Repository/userRepo');
const errorMsg = require('../utils/error');
module.exports = {
    signUp: async (res, userIfoObj) => {
        console.log(userIfoObj);
        const checkResult = await userRepo.selectUserByEmail(userIfoObj.email);
        if (checkResult.length > 0) {
            return errorMsg.emailExist(res);
        }
        const insertResult = await userRepo.insertNewUser(res,userIfoObj);
        return insertResult;
    }
}