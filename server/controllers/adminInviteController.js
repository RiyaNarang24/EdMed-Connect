const AdminInvite = require("../models/AdminInvite");
const User = require("../models/User");
const createHospitalAdminInvite = async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      hospital,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !hospital
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });

    }

    const exists =
      await AdminInvite.findOne({
        $or: [
          { email },
          { phone },
        ],
      });

    if (exists) {

      return res.status(400).json({
        success: false,
        message: "Hospital Admin already invited.",
      });

    }

    const invite =
      await AdminInvite.create({

        fullName,

        email,

        phone,

        hospital,

        role: "hospital-admin",

        createdBy: req.user._id,

      });

    res.status(201).json({

      success: true,

      message:
        "Hospital Admin invitation created.",

      data: invite,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ==========================================
// DELETE HOSPITAL ADMIN
// ==========================================

const deleteHospitalAdmin = async (req, res) => {

  try {

    const invite = await AdminInvite.findById(
      req.params.id
    );

    if (!invite) {

      return res.status(404).json({

        success: false,

        message: "Hospital Admin not found.",

      });

    }

    // Delete registered user if exists

    const user = await User.findOne({

      email: invite.email,

      role: "hospital-admin",

    });

    if (user) {

      await user.deleteOne();

    }

    await invite.deleteOne();

    res.status(200).json({

      success: true,

      message:
        "Hospital Admin deleted successfully.",

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ======================================
// GET ALL HOSPITAL ADMINS
// ======================================

const getHospitalAdmins = async (req, res) => {

  try {

    const admins =
      await AdminInvite.find({

        role: "hospital-admin",

      })

      .populate(
        "hospital",
        "hospitalName"
      )

      .sort({

        createdAt: -1,

      });

    res.status(200).json({

      success: true,

      data: admins,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
module.exports = {

  getHospitalAdmins,

  createHospitalAdminInvite,

  deleteHospitalAdmin,

};