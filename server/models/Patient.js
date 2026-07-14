const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    bed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Other",
      ],
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
      default: "O+",
    },

    diagnosis: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    dischargeDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Admitted",
        "Discharged",
      ],
      default: "Admitted",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
mongoose.model("Patient", patientSchema);