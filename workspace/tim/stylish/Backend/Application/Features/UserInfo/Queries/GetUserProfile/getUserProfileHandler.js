const errorMsg = require('../../../../../utils/error');
const tool = require('../../../../../utils/tool');

const userService = require('../../../../../Service/userService');
const userProfileRes = require('./getUserProfileRes');
module.exports = {
    handle: async (res, loginUserId) => {
        //init
        let response = null;
        //check
        
        //operation
        const getUserdata = await userService.getProfile(res,loginUserId);
        response = await userProfileRes.customize(getUserdata);
        return response;
    }
}