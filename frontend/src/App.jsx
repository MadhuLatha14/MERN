import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PatientRegister from "./components/PatientRegister";
import PatientLogin from "./components/PatientLogin";
import DoctorRegister from "./components/DoctorRegister";
import DoctorLogin from "./components/DoctorLogin";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientPage from "./pages/PatientPage";
import PatientForm from "./components/PatientForm";
import DoctorPrescriptionForm from "./components/DoctorPrescriptionForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/patient-form" element={<PatientForm />} />
        <Route path="/doctor-prescription" element={<DoctorPrescriptionForm />} />
      </Routes>
    </Router>
  );
}

export default App;
