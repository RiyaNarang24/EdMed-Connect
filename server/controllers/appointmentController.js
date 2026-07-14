const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
// ==============================
// GET ALL APPOINTMENTS
// ==============================
const getAppointments = async (req, res) => {

  try {

    const filter = {};

if (req.user.role === "hospital-admin") {

  filter.hospital = req.user.hospital;

} else if (req.query.hospital) {

  filter.hospital = req.query.hospital;

}
    const appointments =
     await Appointment.find(filter)

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
    appointmentDate: 1,
  });
    res.status(200).json({

      success: true,

      data: appointments,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ==============================
// GET LOGGED-IN PATIENT APPOINTMENTS
// ==============================
const getMyAppointments = async (req, res) => {

  try {

    const appointments =
      await Appointment.find({

        patient: req.user._id,

      })

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
        "doctorName specialization photo"
      )

      .sort({

        appointmentDate: 1,

      });

    res.status(200).json({

      success: true,

      data: appointments,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ==============================
// GET SINGLE APPOINTMENT
// ==============================
const getAppointment = async (req, res) => {

  try {

    const appointment =
      await Appointment.findById(
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
  "fullName email phone"
);

    if (!appointment) {

      return res.status(404).json({

        success: false,

        message:
          "Appointment not found",

      });

    }

    res.json({

      success: true,

      data: appointment,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==============================
// CREATE
// ==============================
const createAppointment = async (req, res) => {

  try {

    const {

      hospital,

      department,

      doctor,

      appointmentDate,

      appointmentTime,

      reason,

    } = req.body;

    // --------------------------
    // Basic Validation
    // --------------------------

    if (
      !hospital ||
      !department ||
      !doctor ||
      !appointmentDate ||
      !appointmentTime
    ) {

      return res.status(400).json({

        success: false,

        message: "Please fill all required fields.",

      });

    }

    // --------------------------
    // Verify Doctor
    // --------------------------

    const selectedDoctor =
      await Doctor.findById(doctor);

    if (!selectedDoctor) {

      return res.status(404).json({

        success: false,

        message: "Doctor not found.",

      });

    }

    // --------------------------
    // Hospital Check
    // --------------------------

    if (
      selectedDoctor.hospital.toString() !==
      hospital
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Doctor does not belong to the selected hospital.",

      });

    }

    // --------------------------
    // Department Check
    // --------------------------

    if (
      selectedDoctor.department.toString() !==
      department
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Doctor does not belong to the selected department.",

      });

    }

    // --------------------------
    // Logged-in Patient
    // --------------------------

    const patient =
      req.user._id;

    // --------------------------
    // Save Appointment
    // --------------------------

    const appointment = await Appointment.create({

  hospital,

  department,

  doctor,

  patient,

  appointmentDate,

  appointmentTime,

  reason,

  createdBy: req.user._id,

});
// --------------------------
// SEND EMAILS
// --------------------------

try {

  const patientUser =
    await User.findById(patient);

  if (
    selectedDoctor.email &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS
  ) {

    await sendEmail({

      to: selectedDoctor.email,

      subject: "New Appointment Booked",

      html: `

        <h2>New Appointment Request</h2>

        <p><strong>Patient:</strong> ${patientUser.fullName}</p>

        <p><strong>Email:</strong> ${patientUser.email}</p>

        <p><strong>Date:</strong> ${new Date(
          appointmentDate
        ).toLocaleDateString()}</p>

        <p><strong>Time:</strong> ${appointmentTime}</p>

        <p><strong>Reason:</strong> ${
          reason || "Not Provided"
        }</p>

        <hr/>

        <p>
          Please login to EdMed Connect
          to manage this appointment.
        </p>

      `,

    });

  }

  if (
    patientUser.email &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS
  ) {

    await sendEmail({

      to: patientUser.email,

      subject: "Appointment Confirmation",

      html: `

        <h2>Appointment Confirmed</h2>

        <p>Hello ${patientUser.fullName},</p>

        <p>Your appointment has been booked successfully.</p>

        <table
          border="1"
          cellpadding="8"
          cellspacing="0"
          style="border-collapse:collapse;"
        >

          <tr>

            <td><strong>Doctor</strong></td>

            <td>Dr. ${selectedDoctor.doctorName}</td>

          </tr>

          <tr>

            <td><strong>Date</strong></td>

            <td>${new Date(
              appointmentDate
            ).toLocaleDateString()}</td>

          </tr>

          <tr>

            <td><strong>Time</strong></td>

            <td>${appointmentTime}</td>

          </tr>

        </table>

        <br/>

        <p>
          Thank you for choosing
          <strong>EdMed Connect</strong>.
        </p>

      `,

    });

  }

}

catch (emailError) {

  console.error(
    "Email sending failed:",
    emailError.message
  );

}


    res.status(201).json({

      success: true,

      message:
        "Appointment booked successfully.",

      data: appointment,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};// =======UPDATE====================
const updateAppointment = async (req, res) => {

  try {

    const appointment =
      await Appointment.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      data: appointment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// DELETE
// ==============================
const deleteAppointment =
async (req, res) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {

      return res.status(404).json({

        success: false,

        message:
          "Appointment not found",

      });

    }

    await appointment.deleteOne();

    res.json({

      success: true,

      message:
        "Appointment deleted successfully",

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

  getAppointments,

  getMyAppointments,

  getAppointment,

  createAppointment,

  updateAppointment,

  deleteAppointment,

};