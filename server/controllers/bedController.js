const Room = require("../models/Room");
const Bed = require("../models/Bed");

const getBeds = async (req, res) => {

  try {

    const filter = {};

if (req.user.role === "hospital-admin") {

  filter.hospital = req.user.hospital;

}

if (req.query.room) {

  filter.room = req.query.room;

}

    const beds = await Bed.find(filter)
      .populate({
        path: "room",
        select: "roomNumber ward",
        populate: {
          path: "ward",
          select: "wardName department",
          populate: {
            path: "department",
            select: "departmentName hospital",
            populate: {
              path: "hospital",
              select: "hospitalName",
            },
          },
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: beds,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getBed = async (req, res) => {

  try {

    const bed = await Bed.findById(req.params.id)
      .populate({
        path: "room",
        select: "roomNumber ward",
        populate: {
          path: "ward",
          select: "wardName department",
          populate: {
            path: "department",
            select: "departmentName hospital",
            populate: {
              path: "hospital",
              select: "hospitalName",
            },
          },
        },
      });

    if (!bed) {

      return res.status(404).json({
        success: false,
        message: "Bed not found",
      });

    }

    res.json({
      success: true,
      data: bed,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const createBed = async (req, res) => {

  try {

   const room = await Room.findById(req.body.room);

if (!room) {

  return res.status(404).json({

    success: false,

    message: "Room not found",

  });

}

const bed = await Bed.create({

  ...req.body,

  hospital: room.hospital,

});

    const populatedBed =
      await Bed.findById(bed._id)
        .populate({
          path: "room",
          select: "roomNumber ward",
          populate: {
            path: "ward",
            select: "wardName department",
            populate: {
              path: "department",
              select: "departmentName hospital",
              populate: {
                path: "hospital",
                select: "hospitalName",
              },
            },
          },
        });

    res.status(201).json({
      success: true,
      data: populatedBed,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const updateBed = async (req, res) => {

  try {

    const bed =
      await Bed.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      ).populate({
        path: "room",
        select: "roomNumber ward",
        populate: {
          path: "ward",
          select: "wardName department",
          populate: {
            path: "department",
            select: "departmentName hospital",
            populate: {
              path: "hospital",
              select: "hospitalName",
            },
          },
        },
      });

    if (!bed) {

      return res.status(404).json({
        success: false,
        message: "Bed not found",
      });

    }

    res.json({
      success: true,
      data: bed,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const deleteBed = async (req, res) => {

  try {

    const bed =
      await Bed.findById(req.params.id);

    if (!bed) {

      return res.status(404).json({
        success: false,
        message: "Bed not found",
      });

    }

    await bed.deleteOne();

    res.json({
      success: true,
      message: "Bed deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getBeds,
  getBed,
  createBed,
  updateBed,
  deleteBed,
};