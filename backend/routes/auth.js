
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const createToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "incredible-india-secret",
    { expiresIn: "7d" }
  );
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  googleDemo: user.googleDemo,
  savedPlaces: user.savedPlaces,
  createdAt: user.createdAt
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters"
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    const token = createToken(user);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed"
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: (email || "").toLowerCase().trim()
    });

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password || "",
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = createToken(user);

    res.json({
      message: "Login successful",
      token,
      user: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed"
    });
  }
});

// SIMULATED GOOGLE LOGIN
// This is a demo, NOT real Google authentication.
router.post("/google-demo", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Demo name and email are required"
      });
    }

    let user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        googleDemo: true,
        password: null
      });
    }

    const token = createToken(user);

    res.json({
      message: "Demo Google login successful",
      token,
      user: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({
      message: "Google demo login failed"
    });
  }
});

// GET PERSONAL PROFILE
router.get("/profile", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "incredible-india-secret"
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      user: publicUser(user)
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired session. Please login again."
    });
  }
});

module.exports = router;
