const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {hospital: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Hospital",
  required: true,
},
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    wardName: {
      type: String,
      required: true,
      trim: true,
    },

    wardCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    wardType: {
      type: String,
      enum: [
        "General",
        "Private",
        "ICU",
        "HDU",
        "Emergency",
      ],
      default: "General",
    },

    totalBeds: {
      type: Number,
      default: 0,
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
mongoose.model("Ward", wardSchema);