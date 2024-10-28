// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Register a new admin
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role, schoolName, phoneNumber } = req.body;

    // Validate required fields
    if (!username || !email || !password || !schoolName || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with admin role
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      role: role || 'admin', // Default to admin role if not specified
      schoolName, 
      phoneNumber 
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Admin registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

module.exports = router;
