const express = require("express");

const router = express.Router();

const protect =
  require("../middlewares/authMiddleware");

const authorize =
  require("../middlewares/roleMiddleware");

const {

  createContact,

  getContacts,

  updateContact,

  deleteContact,

} = require("../controllers/contactController");

// ======================================
// PUBLIC
// ======================================

// Anyone can submit contact form

router.post(
  "/",
  createContact
);

// ======================================
// ADMIN
// ======================================

// Only Super Admin can manage contact messages

router.get(
  "/",
  protect,
  authorize("super-admin"),
  getContacts
);

router.put(
  "/:id",
  protect,
  authorize("super-admin"),
  updateContact
);

router.delete(
  "/:id",
  protect,
  authorize("super-admin"),
  deleteContact
);

module.exports = router;