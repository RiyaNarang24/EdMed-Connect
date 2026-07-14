const express = require("express");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const router = express.Router();

router
  .route("/")
  .get(
    protect,
    getDepartments
  )
  .post(
    protect,
    authorize("super-admin"),
    createDepartment
  );

router
  .route("/:id")
  .get(getDepartment)
  .put(
    protect,
    authorize("super-admin"),
    updateDepartment
  )
  .delete(
    protect,
    authorize("super-admin"),
    deleteDepartment
  );

module.exports = router;