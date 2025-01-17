// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }, // Default role is admin
  schoolName: { type: String, required: true }, // School name field
  phoneNumber: { type: String, required: true }, // Phone number field
});

module.exports = mongoose.model("User", userSchema);
