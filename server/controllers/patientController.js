const Patient = require("../models/Patient");

const getPatients = async (req, res) => {

  try {

    const filter = {};

if (req.user.role === "hospital-admin") {

  filter.hospital = req.user.hospital;

}

if (req.query.department) {

  filter.department = req.query.department;

}

    const patients = await Patient.find(filter)
      .populate({
        path: "bed",
        select: "bedNumber room",
        populate: {
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
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: patients,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getPatient = async (req, res) => {

  try {

    const patient = await Patient.findById(req.params.id)
      .populate({
        path: "bed",
        select: "bedNumber room",
        populate: {
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
        },
      });

    if (!patient) {

      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });

    }

    res.json({
      success: true,
      data: patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const createPatient = async (req, res) => {

  try {

    const patient =
      await Patient.create(req.body);

    const populatedPatient =
      await Patient.findById(patient._id)
        .populate({
          path: "bed",
          select: "bedNumber room",
          populate: {
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
          },
        });

    res.status(201).json({
      success: true,
      data: populatedPatient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const updatePatient = async (req, res) => {

  try {

    const patient =
      await Patient.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      ).populate({
        path: "bed",
        select: "bedNumber room",
        populate: {
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
        },
      });

    if (!patient) {

      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });

    }

    res.json({
      success: true,
      data: patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const deletePatient = async (req, res) => {

  try {

    const patient =
      await Patient.findById(req.params.id);

    if (!patient) {

      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });

    }

    await patient.deleteOne();

    res.json({
      success: true,
      message: "Patient deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};