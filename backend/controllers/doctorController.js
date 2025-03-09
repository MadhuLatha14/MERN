const Patient = require("../models/Patient");
const nodemailer = require("nodemailer");
const { jsPDF } = require("jspdf"); // Import jsPDF

// Function to generate a simple prescription PDF
const generatePrescriptionPDF = (patient, prescriptionDetails) => {
  const doc = new jsPDF();
  
  console.log("Generating PDF for patient:", patient.name);  // Log patient details for PDF

  doc.setFont("helvetica", "normal"); // Set the font
  doc.setFontSize(12); // Set font size

  doc.text("Digital Prescription", 20, 10);
  doc.text("-----------------------", 20, 15);
  
  // Patient details
  doc.text(`Patient: ${patient.name}`, 20, 30);
  doc.text(`Age: ${patient.age}`, 20, 35);
  doc.text(`Problem: ${patient.problem}`, 20, 40);

  // Prescription details
  doc.text(`Prescription: ${prescriptionDetails}`, 20, 50);

  // Return the generated PDF as base64 string (this simplifies encoding issues)
  console.log("PDF generation complete");  // Log after PDF is generated
  return doc.output("datauristring"); // Changed to data URI for easier handling in emails
};

// Function to send email with the generated PDF as attachment
const sendPrescriptionEmail = async (patient, pdfBlob) => {
  console.log(`Preparing to send prescription email to ${patient.email}`);

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options with attachment
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: patient.email,
    subject: "Your Digital Prescription",
    text: "Please find your prescription attached as a PDF.",
    attachments: [
      {
        filename: "prescription.pdf",
        content: pdfBlob.split(",")[1],  // Take the base64 part after comma
        encoding: "base64",  // Ensure proper encoding for PDF attachment
      },
    ],
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Prescription emailed successfully to ${patient.email}`);
  } catch (error) {
    console.error(`Error sending prescription email to ${patient.email}:`, error);
    throw new Error("Error sending prescription email");
  }
};

// Provide prescription (separate PDF generation and email sending)
const providePrescription = async (req, res) => {
  try {
    console.log("Starting to provide prescription...");  // Log to track the function execution

    const { patientId } = req.params;
    const { prescriptionDetails } = req.body;

    // Find patient
    const patient = await Patient.findById(patientId);
    if (!patient) {
      console.error("Patient not found!");  // Log if patient is not found
      return res.status(404).json({ message: "Patient not found" });
    }
    console.log("Patient found:", patient.name);  // Log patient found

    // Generate PDF
    const pdfBlob = generatePrescriptionPDF(patient, prescriptionDetails);

    // Send email with the generated PDF
    await sendPrescriptionEmail(patient, pdfBlob);

    res.status(200).json({ message: "Prescription sent successfully to patient email!" });
  } catch (error) {
    console.error("Error providing prescription:", error);  // Log any errors caught
    res.status(500).json({ message: "Error providing prescription", error: error.message });
  }
};


// Function to get all patients who requested prescriptions
const getPatientsForDoctor = async (req, res) => {
  try {
    console.log("Fetching patients for doctor...");

    // Fetch all patients who requested prescriptions (this could be filtered based on a doctor ID)
    const patients = await Patient.find({});  // Replace this with filtering logic if needed (e.g., based on doctor's patients)

    if (!patients) {
      console.error("No patients found!");  // Log if no patients are found
      return res.status(404).json({ message: "No patients found" });
    }

    console.log("Patients found:", patients.length,patients);  // Log number of patients found
    res.status(200).json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);  // Log any errors caught
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

module.exports = { getPatientsForDoctor, providePrescription };
