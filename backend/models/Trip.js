
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  startDate: String,
  endDate: String,
  budget: Number,
  activities: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model("Trip", tripSchema);
