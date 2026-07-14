const Hospital = require("../models/Hospital");
const Department = require("../models/Department");
const Ward = require("../models/Ward");
const Room = require("../models/Room");
const Bed = require("../models/Bed");
const Patient = require("../models/Patient");

const getDashboardStats = async (req, res) => {

  try {

    const isHospitalAdmin =
      req.user.role === "hospital-admin";

    const hospitalFilter =
      isHospitalAdmin
        ? { hospital: req.user.hospital }
        : {};

    const patientFilter =
      isHospitalAdmin
        ? { hospital: req.user.hospital }
        : {};

    const [

      hospitals,
      departments,
      wards,
      rooms,
      beds,
      patients,
      occupiedBeds,
      admittedPatients,
      dischargedPatients,
      malePatients,
      femalePatients,
      otherPatients,
      bloodGroups,
      recentPatients,
      recentHospitals,
      recentDepartments,

    ] = await Promise.all([

      isHospitalAdmin
        ? Promise.resolve(0)
        : Hospital.countDocuments(),

      Department.countDocuments(hospitalFilter),

      Ward.countDocuments(hospitalFilter),

      Room.countDocuments(hospitalFilter),

      Bed.countDocuments(hospitalFilter),

      Patient.countDocuments(patientFilter),

      Bed.countDocuments({
        ...hospitalFilter,
        status: "Occupied",
      }),

      Patient.countDocuments({
        ...patientFilter,
        status: "Admitted",
      }),

      Patient.countDocuments({
        ...patientFilter,
        status: "Discharged",
      }),

      Patient.countDocuments({
        ...patientFilter,
        gender: "Male",
      }),

      Patient.countDocuments({
        ...patientFilter,
        gender: "Female",
      }),

      Patient.countDocuments({
        ...patientFilter,
        gender: "Other",
      }),

      Patient.aggregate([
        {
          $match: patientFilter,
        },
        {
          $group: {
            _id: "$bloodGroup",
            count: { $sum: 1 },
          },
        },
      ]),

      Patient.find(patientFilter)
        .sort({ createdAt: -1 })
        .limit(5)
        .populate({
          path: "bed",
          select: "bedNumber",
        }),

      isHospitalAdmin
        ? Promise.resolve([])
        : Hospital.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("hospitalName city state createdAt"),

      Department.find(hospitalFilter)
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("hospital", "hospitalName")
        .select("departmentName hospital createdAt"),

    ]);

    res.json({

      success: true,

      stats: {

        hospitals,
        departments,
        wards,
        rooms,
        beds,
        patients,

      },

      analytics: {

        occupiedBeds,

        availableBeds:
          beds - occupiedBeds,

        admittedPatients,

        dischargedPatients,

        gender: {

          Male: malePatients,

          Female: femalePatients,

          Other: otherPatients,

        },

        bloodGroups,

      },

      recentPatients,

      recentHospitals,

      recentDepartments,

      lastUpdated: new Date(),

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
  getDashboardStats,
};