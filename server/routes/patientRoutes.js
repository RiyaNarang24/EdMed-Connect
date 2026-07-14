const express = require("express");

const protect =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const {

  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,

} = require("../controllers/patientController");

const router = express.Router();

router
.route("/")
.get(
    protect,
    getPatients
)
.post(
    protect,
    authorize("super-admin","hospital-admin"),
    createPatient
);

router
.route("/:id")
.get(getPatient)
.put(
  protect,
  authorize("super-admin","hospital-admin"),
  updatePatient
)
.delete(
  protect,
  authorize("super-admin","hospital-admin"),
  deletePatient
);

module.exports = router;