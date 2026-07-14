const express = require("express");

const router = express.Router();

const protect =
  require("../middlewares/authMiddleware");

const authorize =
  require("../middlewares/roleMiddleware");

const {

  getAppointments,

  getMyAppointments,

  getAppointment,

  createAppointment,

  updateAppointment,

  deleteAppointment,

} = require(
  "../controllers/appointmentController"
);

// =======================================
// PATIENT + ADMIN
// =======================================

// Patients can book appointments.
// Hospital Admin & Super Admin can also create appointments.

router
  .route("/")
  .get(
    protect,
    getAppointments
  )
  .post(
    protect,
    authorize(
      "patient",
      "hospital-admin",
      "super-admin"
    ),
    createAppointment
  );
// =======================================
// LOGGED-IN PATIENT APPOINTMENTS
// =======================================

router.get(
  "/me",
  protect,
  authorize("patient"),
  getMyAppointments
);
// =======================================
// SINGLE APPOINTMENT
// =======================================

router
  .route("/:id")
  .get(
    protect,
    getAppointment
  )
  .put(
    protect,
    authorize(
      "hospital-admin",
      "super-admin"
    ),
    updateAppointment
  )
  .delete(
    protect,
    authorize(
      "hospital-admin",
      "super-admin"
    ),
    deleteAppointment
  );

module.exports = router;