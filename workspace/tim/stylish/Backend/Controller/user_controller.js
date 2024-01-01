const userSignUpHandler = require("../Application/Features/UserInfo/Commands/UserSignUp/userSignUpHandler");
const userSignInHandler = require("../Application/Features/UserInfo/Commands/UserSignIn/userSignInHandler");
const userSignOauth = require("../Application/Features/UserInfo/Commands/UserSignOauth/userSignOauth");
const getUserProfileHandler = require("../Application/Features/UserInfo/Queries/GetUserProfile/getUserProfileHandler");
const userForgetPasswordHandler = require("../Application/Features/UserInfo/Commands/UserForgetPassword/userForgetPasswordHandler");
const userResetPasswordHandler = require("../Application/Features/UserInfo/Commands/UserResetPassword/userResetPasswordHandler");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const response = await userSignUpHandler.handle(
        res,
        name,
        email,
        password
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  signIn: async (req, res) => {
    try {
      const { provider, email, password } = req.body;
      const response = await userSignInHandler.handle(
        res,
        provider,
        email,
        password
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  signInWithGoogle: async (req, res) => {
    console.log("signInWithGoogle");
    console.log(req.user);

    // return res.status(200).json(req.user);
    try {
      const user = {
        name: req.user.displayName,
        email: req.user.emails[0].value,
        picture: req.user.photos[0].value,
        provider: req.user.provider,
        hashedPassword: req.user.id,
      };
      const response = await userSignOauth.handle(res, user);
      console.log(response);
      const maxAge = 60 * 60 * 1000;
      const { access_token } = response.data;
      const { id, name, email, picture } =
        response.data.user;
      res.cookie("token", access_token, maxAge);
      res.cookie("user_id", id, maxAge);
      res.cookie("user_name", name, maxAge);
      res.cookie("user_email", email, maxAge);
      res.cookie("user_picture", picture, maxAge);

      // 跳轉到登入成功頁面
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
  signInWithLine: async (req, res) => {
    console.log("signInWithLine");
    console.log(req.user);

    return res.status(200).json(req.user);
  },
  getProfile: async (req, res) => {
    try {
      const loginUserId = req.decodedToken.id;
      const response = await getUserProfileHandler.handle(res, loginUserId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword:async (req, res) => {
    try {
      console.log(req.body);
      const { email } = req.body;
      const response = await userForgetPasswordHandler.handle(res, email);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  resetPassword:async (req, res) => {
    try {
      console.log(req.body);
      const { newPassword, resetToken } = req.body;
      const response = await userResetPasswordHandler.handle(res, resetToken, newPassword);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
