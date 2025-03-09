import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF library

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescription, setPrescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login");
          navigate("/login");
          return;
        }
  
        const response = await axios.get("https://mern-xt3s.onrender.comapi/doctors/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Store only the patients array
        setPatients(response.data.patients);
        console.log("patients route", response);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [navigate]);

  // useEffect(() => {
  //   const fetchPatients = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.error("No token found, redirecting to login");
  //         navigate("/login");
  //         return;
  //       }

  //       const response = await axios.get("https://mern-xt3s.onrender.comapi/doctors/patients", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setPatients(response.data);
  //       console.log("patients route", response);
  //     } catch (error) {
  //       console.error("Error fetching patients:", error);
  //     }
  //   };
  //   fetchPatients();
  // }, [navigate]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSuccessMessage(""); // Reset message when a new patient is selected
  };

  const handlePrescriptionSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error. Please log in again.");
        navigate("/login");
        return;
      }

      await axios.post(
        `https://mern-xt3s.onrender.comapi/doctors/prescribe/${selectedPatient._id}`, { prescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Prescription submitted successfully!");
      setPrescription("");
    } catch (error) {
      setSuccessMessage("Error submitting prescription. Please try again.");
      console.error(error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error. Please log in again.");
        navigate("/login");
        return;
      }

      await axios.post(
        `https://mern-xt3s.onrender.comapi/doctors/prescribe/${selectedPatient._id}`, { prescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Prescription sent to patient via email!");
    } catch (error) {
      setSuccessMessage("Error sending email. Please try again.");
      console.error(error);
    }
  };

  // Function to generate PDF of the prescription
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Prescription", 20, 20);

    // Add patient details
    doc.setFontSize(12);
    doc.text(`Patient Name: ${selectedPatient.name}`, 20, 40);
    doc.text(`Patient Email: ${selectedPatient.email}`, 20, 50);
    doc.text(`Problem: ${selectedPatient.problem}`, 20, 60);
    doc.text("Prescription:", 20, 70);
    doc.text(prescription || "No prescription provided.", 20, 80);

    // Save the PDF
    doc.save(`${selectedPatient.name}_Prescription.pdf`);
  };

  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #004e92, #000428)",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    table: {
      width: "80%",
      borderCollapse: "collapse",
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    },
    th: {
      background: "rgba(255, 255, 255, 0.3)",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    },
    button: {
      background: "#007bff",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    modal: {
      background: "rgba(255, 255, 255, 0.15)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      width: "300px",
      marginTop: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "none",
      fontSize: "1rem",
      color: "#222",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    successMessage: {
      color: "#28a745",
      background: "rgba(40, 167, 69, 0.2)",
      padding: "10px",
      borderRadius: "5px",
      marginTop: "10px",
    },
    noPatientsMessage: {
      textAlign: "center",
      color: "#f8d7da",
      background: "#f8d7da",
      padding: "10px",
      borderRadius: "5px",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.page}>
      <h2>Doctor Dashboard</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Mobile</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Problem</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="6" style={styles.noPatientsMessage}>
                No patients available.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient._id}>
                <td style={styles.td}>{patient.name}</td>
                <td style={styles.td}>{patient.age}</td>
                <td style={styles.td}>{patient.mobile}</td>
                <td style={styles.td}>{patient.email}</td>
                <td style={styles.td}>{patient.problem}</td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => handleSelectPatient(patient)}>
                    Provide Prescription
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedPatient && (
        <div style={styles.modal}>
          <h3>Prescription Form</h3>
          <input type="text" value={selectedPatient.name} readOnly style={styles.input} />
          <input type="email" value={selectedPatient.email} readOnly style={styles.input} />
          <input type="text" value={selectedPatient.problem} readOnly style={styles.input} />
          <textarea
            placeholder="Enter Prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            style={styles.input}
          ></textarea>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handlePrescriptionSubmit}>
              Submit Prescription
            </button>
            <button style={styles.button} onClick={handleSendEmail}>
              Send Mail
            </button>
            <button style={styles.button} onClick={handleGeneratePDF}>
              Generate PDF
            </button>
            <button style={{ ...styles.button, background: "#dc3545" }} onClick={() => setSelectedPatient(null)}>
              Close
            </button>
          </div>
          {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
