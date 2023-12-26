
const userSignUpHandler = require('../Application/Features/UserInfo/Commands/UserSignUp/userSignUpHandler');
const userSignInHandler = require('../Application/Features/UserInfo/Commands/UserSignIn/userSignInHandler');
const getUserProfileHandler = require('../Application/Features/UserInfo/Queries/GetUserProfile/getUserProfileHandler');

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
    },
    signInWithGoogle: async(req,res)=>{
        console.log("signInWithGoogle");
        console.log(req.user);

        return res.status(200).json(req.user);
        // try {
        //     const user = {
        //         id: req.user.id,
        //         name: req.user.displayName,
        //         email: req.user.emails[0].value,
        //         photo: req.user.photos[0].value,
        //         provider: req.user.provider,
        //     };
        //     const { provider , email , password } = req.body;
        //     const response=await userSignInHandler.handle(res, provider , email , password);
        //     res.status(200).json(response);
        // } catch (error) {
        //     console.log(error)
        // }
    },
    signInWithLine: async(req,res)=>{
        console.log("signInWithLine");
        console.log(req.user);

        return res.status(200).json(req.user);
    },
    getProfile: async(req,res)=>{
        try {
            const loginUserId = req.decodedToken.id;
            const response=await getUserProfileHandler.handle(res, loginUserId);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }

    }

}