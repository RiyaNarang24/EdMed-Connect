const express = require("express");

const protect =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/",
  protect,
  authorize(
    "super-admin",
    "hospital-admin"
  ),
  getDashboardStats
);

module.exports = router;