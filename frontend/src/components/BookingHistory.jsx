import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("indiaToken");

        const response = await axios.get(`${API}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load bookings");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-history">
      <h2>My Bookings</h2>

      {error && <p className="error-message">{error}</p>}

      {bookings.length === 0 && !error && (
        <p>No bookings yet. Start planning your next trip!</p>
      )}

      {bookings.map((booking) => (
        <div className="booking-card" key={booking._id}>
          <h3>{booking.destination}</h3>
          <p>Booking ID: {booking.bookingId}</p>
          <p>Traveller: {booking.travelerName}</p>
          <p>Travellers: {booking.travelers}</p>
          <p>Amount: ₹{booking.totalAmount.toLocaleString("en-IN")}</p>
          <p>Status: {booking.bookingStatus}</p>
          <p>Payment: {booking.paymentStatus}</p>
          <small>
            Booked on: {new Date(booking.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}