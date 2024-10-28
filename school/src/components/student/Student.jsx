import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Student.css'; // CSS file for styling

const Student = () => {
  const [showForm, setShowForm] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    rollno: '',
    class: '',
    password: '',
  });

  const navigate = useNavigate();

  // Simulating fetching schoolId from user or context
  const schoolId = "Your_School_ID"; // Replace with the actual school ID or fetch from context/user

  const handleAddStudentClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { password, ...detailsWithoutPassword } = studentDetails;
      const dataToSend = {
        ...detailsWithoutPassword,
        school: schoolId, // Attach school ID when sending data to backend
      };

      await axios.post('http://localhost:4000/api/students', dataToSend);
      navigate('/student/studentdetails'); // Navigate to student details page after submission
    } catch (error) {
      console.error('Error saving student details:', error);
    }
  };

  return (
    <div className="student-page-container">
      {!showForm ? (
        <div>
          <h1>Student Management</h1>
          <button className="add-student-btn" onClick={handleAddStudentClick}>
            Add Student
          </button>
        </div>
      ) : (
        <div className="student-form-container">
          <h2>Add Student</h2>
          <form className="student-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={studentDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rollno">Roll No:</label>
              <input
                type="text"
                id="rollno"
                placeholder="Enter Roll No"
                value={studentDetails.rollno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="class">Class:</label>
              <input
                type="number"
                id="class"
                placeholder="Enter Class"
                value={studentDetails.class}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={studentDetails.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group add-btn-container">
              <button type="submit" className="register-btn">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Student;