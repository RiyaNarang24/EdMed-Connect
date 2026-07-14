const mongoose = require("mongoose");

const adminInviteSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: [
        "super-admin",
        "hospital-admin",
      ],
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      default: null,
    },

    used: {
      type: Boolean,
      default: false,
    },

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
  "AdminInvite",
  adminInviteSchema
);