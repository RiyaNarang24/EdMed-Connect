const Department = require("../models/Department");
const Ward = require("../models/Ward");
const getWards = async (req, res) => {
  try {
const filter = {};

if (req.user.role === "hospital-admin") {

  filter.hospital = req.user.hospital;

}

if (req.query.department) {

  filter.department = req.query.department;

}
    const wards = await Ward.find(filter)
      .populate({
        path: "department",
        select: "departmentName hospital",
        populate: {
          path: "hospital",
          select: "hospitalName",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: wards,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getWard = async (req, res) => {
  try {

    const ward = await Ward.findById(req.params.id)
      .populate({
        path: "department",
        select: "departmentName hospital",
        populate: {
          path: "hospital",
          select: "hospitalName",
        },
      });

    if (!ward) {

      return res.status(404).json({
        success: false,
        message: "Ward not found",
      });

    }

    res.json({
      success: true,
      data: ward,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const createWard = async (req, res) => {

  try {

    const department = await Department.findById(
  req.body.department
);

if (!department) {

  return res.status(404).json({

    success: false,

    message: "Department not found",

  });

}

const ward = await Ward.create({

  ...req.body,

  hospital: department.hospital,

});

    const populatedWard =
      await Ward.findById(ward._id)
        .populate({
          path: "department",
          select: "departmentName hospital",
          populate: {
            path: "hospital",
            select: "hospitalName",
          },
        });

    res.status(201).json({
      success: true,
      data: populatedWard,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const updateWard = async (req, res) => {

  try {

    const ward =
      await Ward.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      ).populate({
        path: "department",
        select: "departmentName hospital",
        populate: {
          path: "hospital",
          select: "hospitalName",
        },
      });

    if (!ward) {

      return res.status(404).json({

        success: false,

        message: "Ward not found",

      });

    }

    res.json({

      success: true,

      data: ward,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

const deleteWard = async (req, res) => {

  try {

    const ward =
      await Ward.findById(req.params.id);

    if (!ward) {

      return res.status(404).json({

        success: false,

        message: "Ward not found",

      });

    }

    await ward.deleteOne();

    res.json({

      success: true,

      message: "Ward deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {
  getWards,
  getWard,
  createWard,
  updateWard,
  deleteWard,
};