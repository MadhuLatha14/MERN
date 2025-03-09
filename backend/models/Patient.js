const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  problem: { type: String, required: true },
});

module.exports = mongoose.model("Patient", patientSchema);
