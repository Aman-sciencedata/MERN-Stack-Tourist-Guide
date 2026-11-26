const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    travelerName: {
      type: String,
      required: true
    },
    travelerEmail: {
      type: String,
      required: true
    },
    travelers: {
      type: Number,
      required: true,
      min: 1
    },
    startDate: String,
    endDate: String,
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentStatus: {
      type: String,
      default: "Simulated Payment Successful"
    },
    bookingStatus: {
      type: String,
      default: "Confirmed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);