const express=require("express");

const protect=require("../middlewares/authMiddleware");

const authorize=require("../middlewares/roleMiddleware");

const {

getBeds,
getBed,
createBed,
updateBed,
deleteBed,

}=require("../controllers/bedController");

const router=express.Router();

router
.route("/")
.get(
    protect,
    getBeds
)
.post(
    protect,
    authorize("super-admin","hospital-admin"),
    createBed
);

router
.route("/:id")
.get(getBed)
.put(
protect,
authorize("super-admin","hospital-admin"),
updateBed
)
.delete(
protect,
authorize("super-admin","hospital-admin"),
deleteBed
);

module.exports=router;