import { useNavigate } from "react-router-dom";

const PatientPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Hospital Title */}
      <h1 style={styles.title}>City Hospital</h1>

      {/* Centered Form Button */}
      <div style={styles.formContainer}>
      <button onClick={() => navigate("/patient-form")} style={buttonStyle}>
    Fill the Form
    </button>

      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Email: support@cityhospital.com</p>
        <p>Contact: +91 98765 43210</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#cce7ff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footer: {
    position: "absolute",
    bottom: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default PatientPage;
