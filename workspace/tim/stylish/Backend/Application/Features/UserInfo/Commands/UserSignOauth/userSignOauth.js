// const errorMsg = require('../../../../../utils/error');
const errorMsg = require('../../../../../utils/error')
const tool = require('../../../../../utils/tool');
const auth = require('../../../../../utils/auth');

const userService = require('../../../../../Service/userService');
const userSignOauthRes = require('./userSignOauthRes');
module.exports = {
    handle: async (res,userInfo) => {
        //init
        let response = null;

        if(userInfo.provider === "google"){
            //check
            if (!userInfo) return errorMsg.inputEmpty(res);
            if (!userInfo.email) return errorMsg.inputEmpty(res);
            //operation

            const getUserdata = await userService.signInWithGoogle(res,userInfo);
            console.log(getUserdata);
            const accessTokenInfoObj = await auth.generateAccessToken(getUserdata[0].id);
            response = await userSignOauthRes.customize(getUserdata , accessTokenInfoObj)
            return response;
        }
    }
}