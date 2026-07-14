const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {hospital: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Hospital",
  required: true,
},
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ward",
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    roomType: {
      type: String,
      enum: [
        "General",
        "Private",
        "Deluxe",
        "Suite",
        "ICU",
      ],
      default: "General",
    },

    floor: {
      type: Number,
      default: 1,
    },

    capacity: {
      type: Number,
      default: 1,
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
mongoose.model("Room", roomSchema);