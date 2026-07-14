const Consultation = require("../models/Consultation");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ======================================
// GET ALL CONSULTATIONS
// ======================================

const getConsultations = async (req, res) => {

  try {

    const filter = {};

    if (req.query.hospital) {
      filter.hospital = req.query.hospital;
    }

    if (req.user.role === "patient") {
      filter.patient = req.user._id;
    }

    const consultations =
      await Consultation.find(filter)

        .populate(
          "hospital",
          "hospitalName"
        )

        .populate(
          "department",
          "departmentName"
        )

        .populate(
          "doctor",
          "doctorName email specialization"
        )

        .populate(
          "patient",
          "fullName email phone"
        )

        .sort({
          createdAt: -1,
        });

    res.status(200).json({

      success: true,

      data: consultations,

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
// GET SINGLE
// ======================================

const getConsultation = async (req, res) => {

  try {

    const consultation =
      await Consultation.findById(
        req.params.id
      )

        .populate(
          "hospital",
          "hospitalName"
        )

        .populate(
          "department",
          "departmentName"
        )

        .populate(
          "doctor",
          "doctorName email specialization"
        )

        .populate(
          "patient",
          "fullName email"
        );

    if (!consultation) {

      return res.status(404).json({

        success: false,

        message:
          "Consultation not found.",

      });

    }

    res.json({

      success: true,

      data: consultation,

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
// CREATE
// ======================================

const createConsultation = async (req, res) => {

  try {

    const {

      hospital,

      department,

      doctor,

      symptoms,

      preferredDate,

    } = req.body;

    if (

      !hospital ||

      !department ||

      !doctor ||

      !symptoms ||

      !preferredDate

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all required fields.",

      });

    }

    const selectedDoctor =
      await Doctor.findById(doctor);

    if (!selectedDoctor) {

      return res.status(404).json({

        success: false,

        message:
          "Doctor not found.",

      });

    }

    const consultation =
      await Consultation.create({

        patient: req.user._id,

        hospital,

        department,

        doctor,

        symptoms,

        preferredDate,

        createdBy: req.user._id,

      });

    const patient =
      await User.findById(req.user._id);

    try {

      if (

        process.env.EMAIL_USER &&

        process.env.EMAIL_PASS

      ) {

        if (selectedDoctor.email) {

          await sendEmail({

            to: selectedDoctor.email,

            subject:
              "New Consultation Request",

            html: `

              <h2>New Consultation Request</h2>

              <p><strong>Patient:</strong> ${patient.fullName}</p>

              <p><strong>Email:</strong> ${patient.email}</p>

              <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>

              <p><strong>Symptoms:</strong></p>

              <p>${symptoms}</p>

            `,

          });

        }

        await sendEmail({

          to: patient.email,

          subject:
            "Consultation Request Received",

          html: `

            <h2>Hello ${patient.fullName}</h2>

            <p>

            Your consultation request has been submitted successfully.

            </p>

            <p>

            <strong>Doctor:</strong>

            Dr. ${selectedDoctor.doctorName}

            </p>

            <p>

            <strong>Status:</strong>

            Pending

            </p>

            <p>

            Our hospital will contact you soon.

            </p>

          `,

        });

      }

    }

    catch (emailError) {

      console.log(
        emailError.message
      );

    }

    res.status(201).json({

      success: true,

      message:
        "Consultation requested successfully.",

      data: consultation,

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
// UPDATE
// ======================================

const updateConsultation = async (
  req,
  res
) => {

  try {

    const consultation =
      await Consultation.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

          new: true,

          runValidators: true,

        }

      );

    if (!consultation) {

      return res.status(404).json({

        success: false,

        message:
          "Consultation not found.",

      });

    }

    res.json({

      success: true,

      data: consultation,

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
// DELETE
// ======================================

const deleteConsultation = async (
  req,
  res
) => {

  try {

    const consultation =
      await Consultation.findById(
        req.params.id
      );

    if (!consultation) {

      return res.status(404).json({

        success: false,

        message:
          "Consultation not found.",

      });

    }

    await consultation.deleteOne();

    res.json({

      success: true,

      message:
        "Consultation deleted successfully.",

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

  getConsultations,

  getConsultation,

  createConsultation,

  updateConsultation,

  deleteConsultation,

};