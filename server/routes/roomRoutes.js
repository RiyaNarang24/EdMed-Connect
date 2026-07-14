const express = require("express");

const protect =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const {

getRooms,
getRoom,
createRoom,
updateRoom,
deleteRoom,

} =
require("../controllers/roomController");

const router = express.Router();

router
.route("/")
.get(
    protect,
    getRooms
)
.post(
    protect,
    authorize("super-admin","hospital-admin"),
    createRoom
);

router
.route("/:id")
.get(getRoom)
.put(
protect,
authorize("super-admin","hospital-admin"),
updateRoom
)
.delete(
protect,
authorize("super-admin","hospital-admin"),
deleteRoom
);

module.exports = router;