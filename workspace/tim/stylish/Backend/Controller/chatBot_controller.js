const getChatResolutionHandler = require('../Application/Features/ChatBot/Queries/GetChatResolution/getChatResolutionHandler');
module.exports = {
    getChatResolution: async(req,res)=>{
        try {
            const { MsgType } = req.query;
            console.log(MsgType);
            const response = await getChatResolutionHandler.handle(res,MsgType);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    }



}