import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("indiaToken");

        const response = await axios.get(`${API}/logs`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setLogs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load activity logs");
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="activity-logs">
      <h2>Recent Activity</h2>

      {error && <p className="error-message">{error}</p>}

      {logs.length === 0 && !error && <p>No activity recorded yet.</p>}

      {logs.map((log) => (
        <div className="activity-item" key={log._id}>
          <strong>{log.action}</strong>
          <p>{log.description}</p>
          <small>{new Date(log.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}