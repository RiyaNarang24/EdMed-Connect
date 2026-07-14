const express = require("express");

const router = express.Router();

const protect =
require("../middlewares/authMiddleware");

const authorize =
  require("../middlewares/roleMiddleware");

const {
  getHospitalAdmins,
  createHospitalAdminInvite,
  deleteHospitalAdmin,
} = require("../controllers/adminInviteController");
console.log("protect:", typeof protect);
console.log("authorize:", typeof authorize);
console.log("getHospitalAdmins:", typeof getHospitalAdmins);
console.log("deleteHospitalAdmin:", typeof deleteHospitalAdmin);
router
  .route("/hospital-admin")

  .get(

    protect,

    authorize("super-admin"),

    getHospitalAdmins

  )

  .post(

    protect,

    authorize("super-admin"),

    createHospitalAdminInvite

  );
router.delete(
  "/hospital-admin/:id",
  protect,
  authorize("super-admin"),
  deleteHospitalAdmin
);

module.exports = router;