const express = require("express");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

router
.route("/")
.get(
    protect,
    getDoctors
)
.post(
    protect,
    authorize("super-admin","hospital-admin"),
    createDoctor
);
  

router
  .route("/:id")
  .get(getDoctor)
  .put(
    protect,
    authorize("super-admin","hospital-admin"),
    updateDoctor
  )
  .delete(
    protect,
    authorize("super-admin","hospital-admin"),
    deleteDoctor
  );

module.exports = router;