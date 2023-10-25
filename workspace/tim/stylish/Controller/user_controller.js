
const userSignUpHandler = require('../Application/Features/UserInfo/Commands/UserSignUp/userSignUpHandler');
const userSignInHandler = require('../Application/Features/UserInfo/Commands/UserSignIn/userSignInHandler');

module.exports = {
    signUp: async(req,res)=>{
        try {
            const { name , email , password} = req.body;
            const response=await userSignUpHandler.handle(res, name , email , password);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    signIn: async(req,res)=>{
        try {
            const { provider , email , password } = req.body;
            const response=await userSignInHandler.handle(res, provider , email , password);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    }

}