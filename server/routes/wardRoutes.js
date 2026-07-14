const express = require("express");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {

  getWards,

  getWard,

  createWard,

  updateWard,

  deleteWard,

} = require("../controllers/wardController");

const router = express.Router();

router
.route("/")
.get(
    protect,
    getWards
)
.post(
    protect,
    authorize("super-admin","hospital-admin"),
    createWard
);

router
.route("/:id")
.get(getWard)
.put(
protect,
authorize("super-admin","hospital-admin"),
updateWard
)
.delete(
protect,
authorize("super-admin","hospital-admin"),
deleteWard
);

module.exports = router;