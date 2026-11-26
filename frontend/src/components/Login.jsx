
import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const saveSession = (data) => {
    localStorage.setItem("indiaToken", data.token);
    localStorage.setItem("indiaUser", JSON.stringify(data.user));
    onLogin(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, {
        email,
        password
      });

      saveSession(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleDemo = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/google-demo`, {
        name: "Demo Traveller",
        email: "demo.traveller@gmail.com"
      });

      saveSession(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Demo login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-panel">
      <h2>Welcome Back!</h2>
      <p>Login to your Incredible India account.</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <button
        type="button"
        className="google-login"
        onClick={handleGoogleDemo}
        disabled={loading}
      >
        G Continue with Google (Demo)
      </button>

      <p>
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Register
        </button>
      </p>
    </div>
  );
}
