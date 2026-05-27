const express = require("express");

const router = express.Router();

const authController = require(
  "../controllers/auth.controller"
);

const {
  isAuthenticated,
} = require("../middleware/auth.middleware");

const User = require(
  "../models/user.model"
);

// REGISTER
router.post(
  "/register",
  authController.register
);

// LOGIN
router.post(
  "/login",
  authController.login
);

// LOGOUT
router.get(
  "/logout",
  authController.logout
);

// PROFILE
router.get(
  "/profile",
  isAuthenticated,
  authController.getProfile
);

module.exports = router;