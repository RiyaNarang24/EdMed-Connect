const express = require("express");

const router = express.Router();

const protect =
  require("../middlewares/authMiddleware");

const authorize =
  require("../middlewares/roleMiddleware");

const {

  getConsultations,

  getConsultation,

  createConsultation,

  updateConsultation,

  deleteConsultation,

} = require("../controllers/consultationController");

// ======================================
// CONSULTATIONS
// ======================================

// Patients can create consultation requests.
// Hospital Admin & Super Admin can view/manage.

router
  .route("/")
  .get(
    protect,
    authorize(
      "patient",
      "hospital-admin",
      "super-admin"
    ),
    getConsultations
  )
  .post(
    protect,
    authorize("patient"),
    createConsultation
  );

router
  .route("/:id")
  .get(
    protect,
    authorize(
      "patient",
      "hospital-admin",
      "super-admin"
    ),
    getConsultation
  )
  .put(
    protect,
    authorize(
      "hospital-admin",
      "super-admin"
    ),
    updateConsultation
  )
  .delete(
    protect,
    authorize(
      "hospital-admin",
      "super-admin"
    ),
    deleteConsultation
  );

module.exports = router;