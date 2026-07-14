const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
      trim: true,
    },

    doctorCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    specialization: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    availability: {
      type: String,
      enum: [
        "Available",
        "On Leave",
        "Unavailable",
      ],
      default: "Available",
    },

    profileImage: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
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

module.exports = mongoose.model(
  "Doctor",
  doctorSchema
);