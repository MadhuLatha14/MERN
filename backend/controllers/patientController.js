const Patient = require("../models/Patient");

const addPatient = async (req, res) => {
  try {
    console.log("Received Data:", req.body);  // Debugging
    const { name, age, email, mobile, problem } = req.body;
    if (!name || !age || !email || !mobile || !problem) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPatient = new Patient({ name, age, email, mobile, problem });
    await newPatient.save();
    
    res.status(201).json({ message: "Patient added successfully", newPatient });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const submitPatientRequest = async (req, res) => {
  try {
    console.log("Received Patient Form Data:", req.body);
    const { name, age, mobile, email, problem } = req.body;

    if (!name || !age || !mobile || !email || !problem) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new Patient({ name, age, mobile, email, problem });
    await newRequest.save();

    res.status(201).json({ message: "Patient request saved successfully", newRequest });
  } catch (error) {
    console.error("Error submitting patient request:", error);
    res.status(500).json({ message: "Error saving patient request", error });
  }
};
module.exports = { addPatient, getPatients ,submitPatientRequest };
