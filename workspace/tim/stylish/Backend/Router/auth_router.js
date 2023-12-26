require("dotenv").config();
const express = require("express");
const session = require('express-session');
const passport = require('passport');

const router = express.Router();

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    }));
router.use(passport.initialize());
router.use(passport.session());

const {
  authenticateGoogle,
  handleGoogleCallback,
  authenticateLine,
  handleLineCallback,
} = require("../Controller/auth_controller");
const userController = require("../Controller/user_controller");

router.get("/google", authenticateGoogle);

router.get(
  "/google/callback",
  handleGoogleCallback,
  userController.signInWithGoogle
);

router.get("/line", authenticateLine);

router.get("/line/callback", handleLineCallback, userController.signInWithLine);

module.exports = router;
