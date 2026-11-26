const express = require("express");
const ActivityLog = require("../models/ActivityLog");
const auth = require("../middleware/auth");

const router = express.Router();

// GET CURRENT USER ACTIVITY LOGS
router.get("/", auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find({
      user: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;