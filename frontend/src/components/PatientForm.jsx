import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    problem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mern-xt3s.onrender.comapi/patients/submit", formData);
      alert("Prescription request submitted successfully");
      navigate("/");
    } catch (error) {
      alert("Error submitting request");
    }
  };

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
      marginBottom: "10px",
    },
    logo: {
      width: "80px",
    },
    hospitalName: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#fff",
    },
    subheading: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "15px",
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
    textarea: {
      width: "94%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.9)",
      color: "#222",
      height: "80px",
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
    closeButton: {
      background: "#dc3545",
    },
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
      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2777/2777139.png"
            alt="Hospital Logo"
            style={styles.logo}
          />
          <h1 style={styles.hospitalName}>MediCare Hospital</h1>
          <h2 style={styles.subheading}>Patient OP - Enter Details</h2>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="problem"
            placeholder="Describe your problem"
            value={formData.problem}
            onChange={handleChange}
            required
            style={styles.textarea}
          ></textarea>
          <button type="submit" style={styles.button}>
            Ask Prescription
          </button>
          <button
            type="button"
            onClick={() => navigate("/patient")}
            style={{ ...styles.button, ...styles.closeButton }}
          >
            Close
          </button>
        </form>
      </div>
      <div style={styles.footer}>
        📧 <strong>Contact:</strong> medicare@gmail.com | 📞 +1 987 654 3210
      </div>
    </div>
  );
};

export default PatientForm;
