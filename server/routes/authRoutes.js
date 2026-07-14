const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const protect =
  require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post(
  "/forgot-password",
  forgotPassword
);

router.put(
  "/reset-password/:token",
  resetPassword
);
router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

module.exports = router;