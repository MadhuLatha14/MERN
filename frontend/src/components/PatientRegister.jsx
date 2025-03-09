import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message for success/failure
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://mern-xt3s.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password,role: "patient" }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage({ text: "Registration Successful! Please login.", type: "success" });
      setTimeout(() => navigate("/patient-login"), 1000);
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    }
  };

  // Inline Styles
  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #004e92, #000428)",
      backgroundSize: "cover",
      fontFamily: "Arial, sans-serif",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.3)",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      borderRadius: "15px",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      width: "94%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.9)",
      color: "#222",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      background: "#007bff",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    message: {
      marginTop: "10px",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "0.9rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    success: { background: "lightgreen", color: "green" },
    error: { background: "#f8d7da", color: "#721c24" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h2>Patient Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Name" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        {message && (
          <div style={{ ...styles.message, ...(message.type === "success" ? styles.success : styles.error) }}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRegister;
