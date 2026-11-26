const express = require("express");
const crypto = require("crypto");

const Booking = require("../models/Booking");
const ActivityLog = require("../models/ActivityLog");
const auth = require("../middleware/auth");

const router = express.Router();

// CONFIRM SIMULATED CHECKOUT
router.post("/checkout", auth, async (req, res) => {
  try {
    const {
      destination,
      travelerName,
      travelerEmail,
      travelers,
      startDate,
      endDate,
      totalAmount
    } = req.body;

    if (
      !destination ||
      !travelerName ||
      !travelerEmail ||
      !Number.isInteger(Number(travelers)) ||
      Number(travelers) < 1 ||
      !Number.isFinite(Number(totalAmount)) ||
      Number(totalAmount) < 0
    ) {
      return res.status(400).json({
        message: "Please provide valid booking details"
      });
    }

    const booking = await Booking.create({
      bookingId: "IND-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
      user: req.user.id,
      destination,
      travelerName,
      travelerEmail,
      travelers: Number(travelers),
      startDate,
      endDate,
      totalAmount: Number(totalAmount),
      paymentStatus: "Simulated Payment Successful",
      bookingStatus: "Confirmed"
    });

    await ActivityLog.create({
      user: req.user.id,
      action: "BOOKING",
      description: `Booking confirmed for ${destination}. Booking ID: ${booking.bookingId}`
    });

    res.status(201).json({
      message: "Simulated checkout successful!",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET MY BOOKINGS
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;