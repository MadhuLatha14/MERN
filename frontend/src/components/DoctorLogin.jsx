import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message for success/failure
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-xt3s.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setMessage({ text: "Login Successful!", type: "success" });

      setTimeout(() => {
        if (res.data.role === "doctor") navigate("/doctor-dashboard");
        else navigate("/patient-login");
      }, 1000);
    } catch (error) {
      setMessage({ text: "Login Failed. Please check credentials.", type: "error" });
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
    logoContainer: {
      marginBottom: "15px",
    },
    logo: {
      width: "80px",
    },
    hospitalName: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#fff",
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
    buttonHover: {
      transform: "scale(1.05)",
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
    footer: {
      marginTop: "20px",
      padding: "10px",
      color: "#fff",
      fontSize: "0.9rem",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      {/* Login Content */}
      <div style={styles.content}>
        {/* Logo and Hospital Name */}
        <div style={styles.logoContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2777/2777139.png"
            alt="Hospital Logo"
            style={styles.logo}
          />
          <h1 style={styles.hospitalName}>MediCare Hospital</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {/* Success or Error Message */}
        {message && (
          <div style={{ ...styles.message, ...(message.type === "success" ? styles.success : styles.error) }}>
            {message.text}
          </div>
        )}
      </div>

      {/* Footer with Contact Info */}
      <div style={styles.footer}>
        📞 <strong>Emergency? Call Us:</strong> +1 234 567 890 <br />
        📧 <strong>Email:</strong> contact@medicare.com
      </div>
    </div>
  );
};

export default Login;
