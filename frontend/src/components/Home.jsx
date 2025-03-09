import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Inline Styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: "#f8f9fa",
    },
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#007bff",
      padding: "15px 40px",
      color: "white",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
      fontSize: "18px",
      cursor: "pointer",
    },
    hero: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "50px",
      background: "linear-gradient(135deg, #007bff, #00c6ff)",
      color: "white",
      borderRadius: "10px",
      margin: "20px",
    },
    heroText: {
      flex: 1,
    },
    heroTitle: {
      fontSize: "2.5rem",
      marginBottom: "10px",
    },
    heroImage: {
      width: "300px",
      borderRadius: "10px",
    },
    cardsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      margin: "40px 0",
    },
    card: {
      width: "300px",
      padding: "20px",
      background: "white",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    },
    cardTitle: {
      marginBottom: "10px",
    },
    cardButton: {
      margin: "5px",
      padding: "10px 15px",
      border: "none",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "background 0.3s ease-in-out",
    },
    doctorButton: {
      background: "#007bff",
    },
    patientButton: {
      background: "#28a745",
    },
    about: {
      textAlign: "center",
      padding: "40px",
      background: "#f8f9fa",
    },
    gallerySection: {
        textAlign: "center",
        padding: "40px",
        background: "#f8f9fa",
      },
    gallery: {
        textAlign: "center",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px",
        padding: "20px 40px",
      },
      galleryImage: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
    contact: {
      textAlign: "center",
      padding: "20px",
      background: "#007bff",
      color: "white",
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img
            src="https://marketplace.canva.com/EAE8K0GX7fY/1/0/1600w/canva-minimalist-hospital-and-medical-health-logo-0zwcZG1ITOE.jpg"
            alt="Hospital Logo"
            width="50px"
          />
          <h2>MediCare Hospital</h2>
        </div>
        <div style={styles.navLinks}>
          <p onClick={() => window.scrollTo(0, 0)}>Home</p>
          <p onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>
            About
          </p>
          <p onClick={() => document.getElementById("gallery").scrollIntoView({ behavior: "smooth" })}>
            Gallery
          </p>
          <p onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
            Contact
          </p>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Welcome to MediCare Hospital</h1>
          <p>Providing Quality Healthcare, Anytime, Anywhere.</p>
          <p>MediCare Hospital, established in 1992, is Telangana's first cardiothoracic super-specialty hospital, dedicated to advancing healthcare in the Medchal-Malkajgiri District. Located in Ghanpur Village, Medchal Mandal, the hospital has continually evolved to address the unique needs of the region. The hospital offers comprehensive healthcare services, including promotive, preventive, and curative care, maternal and child health, immunization, cataract blindness prevention, population control, and reproductive health promotion. It also serves as a teaching hospital, conducting programs as part of the MediCiti Institute of Medical Sciences, established in 2002.</p>
        </div>
        <img
          src="https://static3.depositphotos.com/1001992/255/i/950/depositphotos_2552495-stock-photo-successful-doctor-with-stethoscope.jpg"
          alt="Doctor"
          style={styles.heroImage}
        />
      </header>

      {/* Doctor & Patient Sections */}
      <div style={styles.cardsContainer}>
        {/* Doctor Card */}
        <div style={styles.card} className="card">
          <h3 style={{ ...styles.cardTitle, color: "#007bff" }}>👨‍⚕️ I am a Doctor</h3>
          <p>Manage patients, provide prescriptions, and track records.</p>
          <button
            style={{ ...styles.cardButton, ...styles.doctorButton }}
            onClick={() => navigate("/doctor-login")}
          >
            Login
          </button>
          <button
            style={{ ...styles.cardButton, ...styles.doctorButton }}
            onClick={() => navigate("/doctor-register")}
          >
            Register
          </button>
        </div>

        {/* Patient Card */}
        <div style={styles.card} className="card">
          <h3 style={{ ...styles.cardTitle, color: "#28a745" }}>🩺 I am a Patient</h3>
          <p>Book appointments, view prescriptions, and manage health records.</p>
          <button
            style={{ ...styles.cardButton, ...styles.patientButton }}
            onClick={() => navigate("/patient-login")}
          >
            Login
          </button>
          <button
            style={{ ...styles.cardButton, ...styles.patientButton }}
            onClick={() => navigate("/patient-register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* About Section */}
      <section id="about" style={styles.about}>
        <h2 style={{ color: "#007bff" }}>About Our Hospital</h2>
        <p>
        MediCare Hospital, established in 1992, is Telangana's first cardiothoracic super-specialty hospital, dedicated to advancing healthcare in the Medchal-Malkajgiri District. Located in Ghanpur Village, Medchal Mandal, the hospital has continually evolved to address the unique needs of the region. The hospital offers comprehensive healthcare services, including promotive, preventive, and curative care, maternal and child health, immunization, cataract blindness prevention, population control, and reproductive health promotion. It also serves as a teaching hospital, conducting programs as part of the MediCiti Institute of Medical Sciences, established in 2002. 
MediCare is equipped with state-of-the-art facilities, including various intensive care units (MICU, SICU, ICCU, OBGY ICU, NICU, PICU, RICU, and Burns ICU), advanced diagnostic tools like MRI, CT scans, mammography, color Doppler, ultrasounds, and an 800 MA X-ray with image intensifier. The hospital also features a state-of-the-art Cath Lab, reinforcing its dedication to delivering exceptional healthcare services. 
With a highly qualified and experienced clinical faculty, MediCiti Hospital serves over 1,200 outpatients daily and maintains an inpatient bed occupancy exceeding 80%, handling a wide variety of clinical cases. Recognized under the State Government's "Rajiv Arogya Sri" program, the hospital is a trusted treatment center for the community. 

        </p>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={styles.gallerySection}>
        <h2 style={{ color: "#007bff" }}>Gallery</h2>
        <div style={styles.gallery}>
          <img src="https://thumbs.dreamstime.com/b/hospital-room-patient-bed-monitor-generative-ai-two-monitors-wall-s-foreground-visible-273732697.jpg" alt="Gallery" style={styles.galleryImage} />
          <img src="https://hmcarchitects.com/wp-content/uploads/1359024000_N23_hmchigh.jpg" alt="Gallery" style={styles.galleryImage} />
          <img src="https://www.ataa-int.com/images/easyblog_articles/8/b2ap3_large_Hospital-Supplies-Medical-Equipment-2021.jpg" alt="Gallery" style={styles.galleryImage} />
          <img src="https://www.oncologynurseadvisor.com/wp-content/uploads/sites/13/2020/05/nurses_G_493216353.jpg" alt="Gallery" style={styles.galleryImage} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.contact}>
        📍 123 Health St, City | 📞 +1 234 567 890 | ✉️ contact@medicare.com
      </section>
    </div>
  );
};

export default Home;
