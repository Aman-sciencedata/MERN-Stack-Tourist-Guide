import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Register({ onRegister, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API}/auth/register`, {
        name,
        email,
        password
      });

      localStorage.setItem("indiaToken", response.data.token);
      localStorage.setItem("indiaUser", JSON.stringify(response.data.user));

      onRegister(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-panel">
      <h2>Join Incredible India</h2>
      <p>Create your account and start exploring India.</p>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already registered?{" "}
        <button type="button" onClick={onSwitch}>
          Login
        </button>
      </p>
    </div>
  );
}