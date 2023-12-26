require("dotenv").config();
const qs = require("qs");
const { default: axios } = require("axios");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LineStrategy = require("passport-line").Strategy;
const OAuth2Strategy = require("passport-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 此處可以處理驗證成功後的操作
      // 例如將使用者資料存進資料庫
      console.log("accessToken");
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.use(
  new LineStrategy(
    {
      channelID: process.env.LINE_CHANNEL_ID,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
      callbackURL: "http://localhost:3000/auth/line/callback",
      scope: ['profile', 'openid', 'email'],
      botPrompt: "normal",
      uiLocales: "zh-TW",
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ lineId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log("accessToken");
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      return done(null, profile);
    }
  )
);

// 封裝 Passport.authenticate("google") 的 middleware
const authenticateGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});

// 處理 Google 登入後的回調
const handleGoogleCallback = passport.authenticate("google", {
  session: false,
});

const authenticateLine = passport.authenticate("line");

const handleLineCallback = passport.authenticate("line", {
  session: false,
});

module.exports = {
  authenticateGoogle,
  handleGoogleCallback,
  authenticateLine,
  handleLineCallback,
};
