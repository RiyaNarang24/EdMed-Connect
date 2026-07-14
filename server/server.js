require("dotenv").config();

const app = require("./app");
const departmentRoutes =
require("./routes/departmentRoutes");
const wardRoutes =
require("./routes/wardRoutes");
const roomRoutes =
require("./routes/roomRoutes");
const bedRoutes =
require("./routes/bedRoutes");
const patientRoutes =
require("./routes/patientRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");
const appointmentRoutes = require(
  "./routes/appointmentRoutes"
);
const doctorRoutes =
require("./routes/doctorRoutes");
const contactRoutes =
  require("./routes/contactRoutes");
  const consultationRoutes =
require("./routes/consultationRoutes");
const adminInviteRoutes =
require("./routes/adminInviteRoutes");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.use(
  "/api/departments",
  departmentRoutes
);
app.use(
"/api/wards",
wardRoutes
);
app.use(
"/api/rooms",
roomRoutes
);
app.use(
"/api/beds",
bedRoutes
);
app.use(
  "/api/patients",
  patientRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/appointments",
  appointmentRoutes
);
app.use(
  "/api/doctors",
  doctorRoutes
);
app.use(
  "/api/contact",
  contactRoutes
);
app.use(
  "/api/consultations",
  consultationRoutes
);
app.use(
"/api/admin-invites",
adminInviteRoutes
);
app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});