
const userSignUpHandler = require('../Application/Features/UserInfo/Commands/UserSignUp/userSignUpHandler');
module.exports = {
    signUp: async(req,res)=>{
        try {
            const { name , email , password} = req.body;
            const response=await userSignUpHandler.handle(res, name , email , password);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    }

}