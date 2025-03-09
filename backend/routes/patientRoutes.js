const express = require("express");
const { addPatient, getPatients,submitPatientRequest } = require("../controllers/patientController");  // Make sure patientController.js exists and is correctly imported
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/submit", submitPatientRequest);
router.post("/add", authMiddleware, addPatient);  // Ensure 'addPatient' is properly imported
router.get("/list", authMiddleware, getPatients);  // Ensure 'getPatients' is properly imported

module.exports = router;

