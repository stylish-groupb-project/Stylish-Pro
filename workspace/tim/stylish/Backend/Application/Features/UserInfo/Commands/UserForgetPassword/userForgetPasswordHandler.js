// const errorMsg = require('../../../../../utils/error');
const errorMsg = require("../../../../../utils/error");
const tool = require("../../../../../utils/tool");
const auth = require("../../../../../utils/auth");
const mailService = require("../../../../../utils/mail_service");
const crypto = require("crypto");

const userService = require("../../../../../Service/userService");
const userForgetPassword = require("./userForgetPasswordRes");
module.exports = {
  handle: async (res, email) => {
    //init
    let response = null;

    if (!email) return errorMsg.inputEmpty(res);

    const getUserdata = await userService.signIn(res, email);
    console.log(getUserdata);

    if (getUserdata.length === 0) return errorMsg.noUser(res);
    if (getUserdata[0].provider !== "native")
      return errorMsg.notNativeUser(res);

    const resetToken = crypto.randomBytes(20).toString("hex");

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetTokenExpire = new Date(Date.now() + 3600000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // 1 hour

    const userInfoObj = {
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: resetTokenExpire,
    };

    const updateResult = await userService.createUserResetToken(
      res,
      getUserdata[0].id,
      userInfoObj
    );

    if (updateResult.affectedRows === 0) {
      return errorMsg.query(res);
    }

    try {
      const result = await mailService.sendResetLink(email, resetToken);
      if (result.success === false) {
        return errorMsg.failedToSendEmail(res);
      }
    } catch (error) {
      console.log(error);
      return errorMsg.failedToSendEmail(res);
    }

    response = await userForgetPassword.customize();
    return response;
  },
};
