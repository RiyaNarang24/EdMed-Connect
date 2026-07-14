const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const hospitalRoutes = require("./routes/hospitalRoutes");
const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to EdMed Connect API 🚀"
    });
});
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
module.exports = app;