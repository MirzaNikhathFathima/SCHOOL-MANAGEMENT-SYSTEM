const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/school_management_system")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Schema and Model for Teacher
const teacherSchema = new mongoose.Schema({
  subject: String,
  class: String,
  name: String,
  email: String,
  school: String, // Save the school information
});

const Teacher = mongoose.model("Teacher", teacherSchema);

// Schema and Model for Admin
const adminSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true }, // Unique constraint on email
  password: String,
  role: String,
  schoolName: String, // Save the school information
  phoneNumber: String,
});

const Admin = mongoose.model("Admin", adminSchema);

// Schema and Model for Student
const studentSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  class: String,
  school: String, // Save the school information
});

const Student = mongoose.model("Student", studentSchema);

// Schema for Attendance
const attendanceSchema = new mongoose.Schema({
  class: String,
  date: String,
  attendance: Map, // Store attendance as a map of roll numbers to status (Present/Absent)
});

// Model for Attendance
const Attendance = mongoose.model('Attendance', attendanceSchema);


// Schema for Assignments
const assignmentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  class: String,
  teacher: String, // Name of the teacher
  description: String,
  dueDate: Date,
  school: String, // Save the school information
});

// Model for Assignments
const Assignment = mongoose.model("Assignment", assignmentSchema);



app.post("/api/auth/register", async (req, res) => {
  const { username, email, password, schoolName, phoneNumber } = req.body;

  try {
    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email, schoolName });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists for the given school" });
    }

    // Encrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role: "admin",
      schoolName,
      phoneNumber,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json({ user: savedAdmin });
  } catch (err) {
    console.error("Error saving admin details:", err);
    res.status(400).json({ message: "Error saving admin details" });
  }
});

// POST route for Admin Login with bcrypt password comparison
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the hashed password with the one provided in the login request
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If login is successful, return admin data
    res.status(200).json({ message: "Login successful", admin });
  } catch (err) {
    console.error("Error logging in admin:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to fetch admin profile by email
app.get("/api/admin/profile", async (req, res) => {
  const { email } = req.query;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ message: "Error fetching admin profile" });
  }
});

// GET route to fetch admin details
app.get("/api/admin/:adminId", async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId); // Fetch admin details from database
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (err) {
    console.error("Error fetching admin details:", err);
    res.status(500).json({ message: "Failed to fetch admin details" });
  }
});

// POST route to add a new teacher
app.post("/api/teachers", async (req, res) => {
  const { subject, class: teacherClass, name, email, school } = req.body;

  const newTeacher = new Teacher({
    subject,
    class: teacherClass,
    name,
    email,
    school,
  });

  try {
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    console.error("Error saving teacher details:", err);
    res.status(400).json({ error: "Error saving teacher details" });
  }
});

// GET route to fetch all teacher details by school
app.get("/api/teachers", async (req, res) => {
  const { schoolId } = req.query;

  try {
    const teachers = await Teacher.find({ school: schoolId });
    res.json(teachers);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ message: "Error fetching teachers" });
  }
});

// PUT route to update teacher details by ID
app.put("/api/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const { subject, class: teacherClass, name, email, school } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { 
        subject: subject || undefined, 
        class: teacherClass || undefined, 
        name: name || undefined, 
        email: email || undefined, 
        school: school || undefined
      },
      { new: true, runValidators: true } // Return the updated document and validate before saving
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(updatedTeacher);
  } catch (err) {
    console.error("Error updating teacher details:", err);
    res.status(500).json({ message: "Error updating teacher details" });
  }
});


// DELETE route to remove a teacher by ID
app.delete("/api/teachers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error("Error deleting teacher:", err);
    res.status(500).json({ message: "Error deleting teacher" });
  }
});


// POST route to add a new student
app.post("/api/students", async (req, res) => {
  const { name, rollno, class: studentClass, school } = req.body;

  const newStudent = new Student({
    name,
    rollno,
    class: studentClass,
    school,
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    console.error("Error saving student details:", err);
    res.status(400).json({ error: "Error saving student details" });
  }
});

// GET route to fetch all student details by school
app.get("/api/students", async (req, res) => {
  const { schoolId } = req.query;

  try {
    const students = await Student.find({ school: schoolId });
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// PUT route to update a student by ID
app.put("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, rollno, class: studentClass } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, rollno, class: studentClass },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ message: "Error updating student" });
  }
});


// DELETE route to remove a student by ID
app.delete("/api/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ message: "Error deleting student" });
  }
});


// POST route to mark attendance
app.post('/api/attendance', async (req, res) => {
  const { class: studentClass, date, attendance } = req.body;

  const newAttendance = new Attendance({
    class: studentClass,
    date,
    attendance,
  });

  try {
    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (err) {
    console.error('Error saving attendance:', err);
    res.status(400).json({ message: 'Error saving attendance' });
  }
});





// POST route for attendance
app.post("/api/attendance", async (req, res) => {
  const { class: teacherClass, date, attendance } = req.body;

  try {
    const newAttendance = new Attendance({
      class: teacherClass,
      date,
      attendance,
    });

    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (err) {
    console.error("Error saving attendance:", err);
    res.status(500).json({ message: "Failed to record attendance" });
  }
});







// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
