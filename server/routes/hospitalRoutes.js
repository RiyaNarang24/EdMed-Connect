const express = require("express");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
  getHospitals,
  getHospital,
  getHospitalBySlug,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalController");

const router = express.Router();

// Public Routes
router.get("/", getHospitals);

// IMPORTANT: keep this ABOVE "/:id"
router.get("/slug/:slug", getHospitalBySlug);

// Admin Routes
router.post(
  "/",
  protect,
  authorize("super-admin"),
  createHospital
);

router
  .route("/:id")
  .get(getHospital)
  .put(
    protect,
    authorize("super-admin"),
    updateHospital
  )
  .delete(
    protect,
    authorize("super-admin"),
    deleteHospital
  );

module.exports = router;