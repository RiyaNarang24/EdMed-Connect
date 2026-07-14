const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
profileImage: {
  type: String,
  default: "",
},
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
  type: String,
  enum: [
    "super-admin",
    "hospital-admin",
    "doctor",
    "nurse",
    "receptionist",
    "patient",
  ],
  default: "patient",
},
hospital: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Hospital",
  default: null,
},
phone: {
  type: String,
  default: "",
},

gender: {
  type: String,
  enum: ["Male", "Female", "Other"],
  default: "Male",
},

dateOfBirth: {
  type: Date,
},

bloodGroup: {
  type: String,
  default: "",
},

address: {
  type: String,
  default: "",
},

city: {
  type: String,
  default: "",
},

state: {
  type: String,
  default: "",
},

emergencyContact: {
  type: String,
  default: "",
},
    isActive: {
      type: Boolean,
      default: true,
    },

    // ---------- NEW ----------

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    // -------------------------

  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

});

userSchema.methods.matchPassword =
async function (password) {

  return await bcrypt.compare(
    password,
    this.password
  );

};

module.exports =
mongoose.model("User", userSchema);