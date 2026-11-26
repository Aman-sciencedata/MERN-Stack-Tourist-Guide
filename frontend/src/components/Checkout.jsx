import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Checkout({ trip, onClose, onSuccess }) {
  const user = JSON.parse(localStorage.getItem("indiaUser") || "{}");

  const destination =
    typeof trip?.destination === "string"
      ? trip.destination
      : trip?.destination?.name || trip?.destination?.title || "India trip";

  const [travelerName, setTravelerName] = useState(user.name || "");
  const [travelerEmail, setTravelerEmail] = useState(user.email || "");
  const [travelers, setTravelers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = Number(trip?.budget) || 0;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("indiaToken");

      const response = await axios.post(
        `${API}/bookings/checkout`,
        {
          destination,
          travelerName,
          travelerEmail,
          travelers: Number(travelers),
          startDate: trip?.startDate || "",
          endDate: trip?.endDate || "",
          totalAmount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      onSuccess(response.data.booking);
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-panel">
      <h2>Complete Your Booking</h2>

      <div className="checkout-summary">
        <h3>{destination}</h3>
        <p>Start date: {trip?.startDate || "Not specified"}</p>
        <p>End date: {trip?.endDate || "Not specified"}</p>
        <h3>Estimated total: ₹{totalAmount.toLocaleString("en-IN")}</h3>
      </div>

      <form onSubmit={handleCheckout}>
        <input
          type="text"
          placeholder="Traveller name"
          value={travelerName}
          onChange={(e) => setTravelerName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Traveller email"
          value={travelerEmail}
          onChange={(e) => setTravelerEmail(e.target.value)}
          required
        />

        <label>Number of travellers</label>
        <input
          type="number"
          min="1"
          max="20"
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          required
        />

        <p className="payment-note">
          Demo checkout only. No real payment will be collected.
        </p>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}