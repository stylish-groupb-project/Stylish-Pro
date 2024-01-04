// const errorMsg = require('../../../../../utils/error');
const errorMsg = require("../../../../../utils/error");
const tool = require("../../../../../utils/tool");
const auth = require("../../../../../utils/auth");
const mailService = require("../../../../../utils/mail_service");
const crypto = require("crypto");

const userService = require("../../../../../Service/userService");
const userResetPassword = require("./userResetPasswordRes");
module.exports = {
  handle: async (res, resetToken, newPassword) => {
    //init
    let response = null;

    if (!resetToken || !newPassword) return errorMsg.missInfo(res);

    console.log(resetToken);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    console.log(resetPasswordToken);
    const getUserResetData = await userService.selectUserByResetToken(
      res,
      resetPasswordToken  
    );
    if (getUserResetData.length === 0) return errorMsg.noUser(res);

    // check token expire
    const resetTokenExpire = getUserResetData[0].reset_password_expire;
    if (resetTokenExpire < Date.now() / 1000) {
      return errorMsg.tokenExpired(res);
    }

    const hashedPassword = await tool.generateHashPassword(newPassword);
    
    const updateResult = await userService.resetPassword(
      res,
      getUserResetData[0].user_id,
      hashedPassword
    );
    if (updateResult.affectedRows === 0) {
      return errorMsg.query(res);
    }

    const userId = getUserResetData[0].user_id;
    await userService.deleteUserResetToken(res, userId);

    response = await userResetPassword.customize();
    return response;
  },
};
