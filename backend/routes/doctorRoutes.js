const express = require("express");
const { getPatientsForDoctor, providePrescription } = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all patients who requested prescriptions (Doctor only)
router.get("/patients", authMiddleware, getPatientsForDoctor);

// Doctor provides a prescription
router.post("/prescribe/:patientId", authMiddleware, providePrescription); // Updated route

module.exports = router;
