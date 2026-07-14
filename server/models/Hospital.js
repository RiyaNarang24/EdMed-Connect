const mongoose = require("mongoose");
const slugify = require("slugify");
const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    hospitalCode: {
      type: String,
      required: true,
      unique: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    country: {
    type: String,
    default: "India",
    },

    description: {
     type: String,
     default: "",
    },

    coverImage: {
     type: String,
     default: "",
    },

    specialities: [{
     type: String,
     }],

   rating: {
    type: Number,
    default: 4.5,
   },

  totalBeds: {
    type: Number,
    default: 0,
   },
    address: {
      type: String,
    },

    phone: {
      type: String,
    },

    email: {
      type: String,
    },

    logo: {
      type: String,
      default: "",
    },

    themeColor: {
      type: String,
      default: "#C8102E",
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
hospitalSchema.pre("save", function () {
  if (!this.slug) {
    this.slug = slugify(this.hospitalName, {
      lower: true,
      strict: true,
    });
  }
});
module.exports = mongoose.model("Hospital", hospitalSchema);