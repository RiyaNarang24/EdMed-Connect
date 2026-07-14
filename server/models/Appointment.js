const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // ======================
    // PATIENT
    // ======================

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ======================
    // HOSPITAL
    // ======================

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // ======================
    // DEPARTMENT
    // ======================

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // ======================
    // DOCTOR
    // ======================

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // ======================
    // DATE
    // ======================

    appointmentDate: {
      type: Date,
      required: true,
    },

    // ======================
    // TIME
    // ======================

    appointmentTime: {
      type: String,
      required: true,
    },

    // ======================
    // REASON
    // ======================

    reason: {
      type: String,
      trim: true,
      default: "",
    },

    // ======================
    // STATUS
    // ======================

    status: {
      type: String,
      enum: [
        "Scheduled",
        "Completed",
        "Cancelled",
      ],
      default: "Scheduled",
    },

    // ======================
    // DOCTOR NOTES
    // ======================

    notes: {
      type: String,
      default: "",
    },

    // ======================
    // CREATED BY
    // ======================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

  },
  {
    timestamps: true,
  }
);

module.exports =
mongoose.model(
  "Appointment",
  appointmentSchema
);