const asyncHandler = require("express-async-handler");
const validator = require("validator");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const AdminInvite =
require("../models/AdminInvite");
// ===============================
// REGISTER USER
// ===============================
const registerUser = asyncHandler(async (req, res) => {

 const {
  fullName,
  email,
  password,
  phone,
  gender,
  role,
} = req.body;

  if (!fullName || !email || !password) {

    res.status(400);

    throw new Error(
      "Please fill all required fields."
    );

  }

  if (!validator.isEmail(email)) {

    res.status(400);

    throw new Error(
      "Invalid email address."
    );

  }

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {

    res.status(400);

    throw new Error(
      "User already exists."
    );

  }
// ===============================
// ADMIN INVITATION CHECK
// ===============================

let invite = null;

if (
  role === "super-admin" ||
  role === "hospital-admin"
) {

 invite =
await AdminInvite.findOne({

  fullName,

  email,

  phone,

  role,

  used: false,

});

  if (!invite) {

    return res.status(403).json({

      success: false,

      message:
        "You are not authorized to register as this role.",

    });

  }

}
  const user = await User.create({
  fullName,
  email,
  password,
  phone,
  gender,
  role: role || "patient",

hospital:
  invite?.hospital || null,
});
if (invite) {

  invite.used = true;

  await invite.save();

}

  res.status(201).json({

  success: true,

  message:
    "Registration successful.",

  token:
    generateToken(
      user._id,
      user.role
    ),

  user: {

    id: user._id,

    fullName: user.fullName,

    email: user.email,

    phone: user.phone,

    role: user.role,

  },

});

});

// ===============================
// LOGIN USER
// ===============================
const loginUser = asyncHandler(async (req, res) => {

  const {
  email,
  password,
  role,
} = req.body;

  const user =
    await User.findOne({ email });

  if (
    !user ||
    !(await user.matchPassword(password))
  ) {

    res.status(401);

    throw new Error(
      "Invalid email or password."
    );

  }
if (role && user.role !== role) {

  res.status(403);

  throw new Error(
    `This account is registered as ${user.role}. Please select the correct role.`
  );

}
  const token =
    generateToken(
      user._id,
      user.role
    );

  res.status(200).json({

    success: true,

    token,

   user: {

  id: user._id,

  fullName: user.fullName,

  email: user.email,

  phone: user.phone,

  gender: user.gender,

  bloodGroup: user.bloodGroup,

  role: user.role,

  hospital: user.hospital,

  profileImage: user.profileImage,

},

  });

});

// ===============================
// FORGOT PASSWORD
// ===============================
const forgotPassword =
asyncHandler(async (req, res) => {

  const { email } = req.body;

  const user =
    await User.findOne({ email });

  if (!user) {

    res.status(404);

    throw new Error(
      "User not found."
    );

  }

  const resetToken =
    crypto
      .randomBytes(32)
      .toString("hex");

  user.resetPasswordToken =
    crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  user.resetPasswordExpire =
    Date.now() +
    10 * 60 * 1000;

  await user.save();

  const resetUrl =

    `${process.env.CLIENT_URL || "http://localhost:3000"}` +

    `/reset-password/${resetToken}`;

  await sendEmail({

  to: user.email,

  subject: "Reset Your Password",

  html: `
    <h2>Password Reset</h2>

    <p>Hello ${user.fullName},</p>

    <p>Click the button below to reset your password.</p>

    <a
      href="${resetUrl}"
      style="
        display:inline-block;
        padding:12px 24px;
        background:#dc2626;
        color:white;
        text-decoration:none;
        border-radius:8px;
      "
    >
      Reset Password
    </a>

    <p>This link will expire in 10 minutes.</p>

    <p>If you didn't request this, you can safely ignore this email.</p>

    <hr/>

    <p>EdMed Connect</p>
  `,

});

res.status(200).json({

  success: true,

  message:
    "Password reset link has been sent to your email.",

});

});

// ===============================
// RESET PASSWORD
// ===============================
const resetPassword =
asyncHandler(async (req, res) => {

  const hashedToken =

    crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

  const user =
    await User.findOne({

      resetPasswordToken:
        hashedToken,

      resetPasswordExpire: {

        $gt: Date.now(),

      },

    });

  if (!user) {

    res.status(400);

    throw new Error(
      "Invalid or expired reset link."
    );

  }

  user.password =
    req.body.password;

  user.resetPasswordToken =
    undefined;

  user.resetPasswordExpire =
    undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({

    success: true,

    message:
      "Password updated successfully.",

  });

});
// ===============================
// GET MY PROFILE
// ===============================

const getProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id)
    .select("-password");

  res.status(200).json({

    success: true,

    user,

  });

});

// ===============================
// UPDATE PROFILE
// ===============================

const updateProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);

  if (!user) {

    res.status(404);

    throw new Error("User not found.");

  }

  user.fullName =
    req.body.fullName || user.fullName;

  user.email =
    req.body.email || user.email;

  user.phone =
    req.body.phone || user.phone;

  if (req.body.gender) {

    user.gender = req.body.gender;

  }
  if (req.body.bloodGroup) {

  user.bloodGroup = req.body.bloodGroup;

}

  await user.save();

  res.status(200).json({

    success: true,

    user: {

  id: user._id,

  fullName: user.fullName,

  email: user.email,

  phone: user.phone,

  gender: user.gender,

  bloodGroup: user.bloodGroup,

  role: user.role,

  hospital: user.hospital,

  profileImage: user.profileImage,

},

  });

});
module.exports = {

  registerUser,

  loginUser,

  forgotPassword,

  resetPassword,

  getProfile,

  updateProfile,

};