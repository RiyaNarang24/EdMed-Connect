const Ward = require("../models/Ward");
const Room = require("../models/Room");

const getRooms = async (req, res) => {
  try {

    const filter = {};

if (req.user.role === "hospital-admin") {

  filter.hospital = req.user.hospital;

}

if (req.query.ward) {

  filter.ward = req.query.ward;

}

    const rooms = await Room.find(filter)
      .populate({
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
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: rooms,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getRoom = async (req, res) => {

  try {

    const room = await Room.findById(req.params.id)
      .populate({
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
      });

    if (!room) {

      return res.status(404).json({
        success: false,
        message: "Room not found",
      });

    }

    res.json({
      success: true,
      data: room,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const createRoom = async (req, res) => {

  try {
 const ward = await Ward.findById(req.body.ward);

if (!ward) {

  return res.status(404).json({

    success: false,

    message: "Ward not found",

  });

}
    const room = await Room.create({...req.body,

  hospital: ward.hospital,});

    const populatedRoom =
      await Room.findById(room._id)
        .populate({
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
        });

    res.status(201).json({
      success: true,
      data: populatedRoom,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const updateRoom = async (req, res) => {

  try {

    const room =
      await Room.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      ).populate({
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
      });

    if (!room) {

      return res.status(404).json({

        success: false,

        message: "Room not found",

      });

    }

    res.json({

      success: true,

      data: room,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

const deleteRoom = async (req, res) => {

  try {

    const room =
      await Room.findById(req.params.id);

    if (!room) {

      return res.status(404).json({

        success: false,

        message: "Room not found",

      });

    }

    await room.deleteOne();

    res.json({

      success: true,

      message: "Room deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};