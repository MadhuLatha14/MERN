const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Patient = require("../models/Patient");
const sendEmailWithAttachment = require("../utils/sendEmail");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// SEND PRESCRIPTION (TEXT EMAIL)
router.post("/prescribe/:patientId", async (req, res) => {
  try {
    const { prescription } = req.body;
    const patientId = req.params.patientId;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    // Save the prescription to the patient's record
    patient.prescriptions.push({ prescription });
    await patient.save();

    // Send the prescription via email
    await sendEmail(patient.email, "Your Prescription", prescription);

    res.status(200).json({ message: "Prescription created and sent to patient!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating prescription" });
  }
});

module.exports = router;
