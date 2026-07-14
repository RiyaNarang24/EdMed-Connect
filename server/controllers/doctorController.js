const Doctor = require("../models/Doctor");

// ==============================
// GET ALL DOCTORS
// ==============================
const getDoctors = async (req, res) => {

  try {

    const filter = {};

if (req.user.role === "hospital-admin") {

  filter.hospital = req.user.hospital;

} else if (req.query.hospital) {

  filter.hospital = req.query.hospital;

}

if (req.query.department) {

  filter.department = req.query.department;

}

    const doctors = await Doctor.find(filter)
      .populate("hospital", "hospitalName")
      .populate("department", "departmentName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: doctors,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// GET SINGLE DOCTOR
// ==============================
const getDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.findById(req.params.id)
      .populate("hospital", "hospitalName")
      .populate("department", "departmentName");

    if (!doctor) {

      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });

    }

    res.json({
      success: true,
      data: doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// CREATE DOCTOR
// ==============================
const createDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      success: true,
      data: doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// UPDATE DOCTOR
// ==============================
const updateDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doctor) {

      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });

    }

    res.json({
      success: true,
      data: doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// DELETE DOCTOR
// ==============================
const deleteDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {

      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });

    }

    await doctor.deleteOne();

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};