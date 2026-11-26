
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Existing API routes
app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/trips", require("./routes/trips"));

// New API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/logs", require("./routes/logs"));

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Incredible India API!",
    status: "Server is running"
  });
});

// MongoDB connection and server startup
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected!");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
