const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    hospital: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Hospital",
  required: true,
},
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    bedNumber: {
      type: String,
      required: true,
      trim: true,
    },

    bedType: {
      type: String,
      enum: [
        "General",
        "Private",
        "ICU",
        "Ventilator",
      ],
      default: "General",
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Occupied",
        "Reserved",
        "Maintenance",
      ],
      default: "Available",
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

module.exports =
mongoose.model("Bed", bedSchema);