import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Teacher.css';

const Teacher = () => {
  const [showForm, setShowForm] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState({
    subject: '',
    class: '',
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Simulating fetching schoolId from user or context
  const schoolId = "Your_School_ID"; // Replace with the actual school ID or fetch from context/user

  // Show the Add Teacher form
  const handleAddTeacherClick = () => {
    setShowForm(true);
  };

  // Handle input changes in form
  const handleChange = (e) => {
    setTeacherDetails({
      ...teacherDetails,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission to save teacher details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Separate the password field for internal purposes (e.g., hashing in the backend)
      const { password, ...detailsWithoutPassword } = teacherDetails;

      // Data to be sent to backend including the school ID
      const dataToSend = {
        ...detailsWithoutPassword,
        school: schoolId, // Attach school ID when sending data to backend
      };

      // Sending the POST request to backend to save the teacher details
      await axios.post('http://localhost:4000/api/teachers', dataToSend);

      // Navigate to the teacher details page after successful submission
      navigate('/teacher/teacherdetails');
    } catch (error) {
      console.error('Error saving teacher details:', error);
    }
  };

  return (
    <div className="teacher-page-container">
      {!showForm ? (
        <div>
          <h1>Teacher Management</h1>
          <button className="add-teacher-btn" onClick={handleAddTeacherClick}>
            Add Teacher
          </button>
        </div>
      ) : (
        <div className="teacher-form-container">
          <h2>Add Teacher</h2>
          <form className="teacher-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                placeholder="Enter Subject"
                value={teacherDetails.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="class">Class:</label>
              <input
                type="text"
                id="class"
                placeholder="Enter Class"
                value={teacherDetails.class}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={teacherDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={teacherDetails.email}
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
                value={teacherDetails.password}
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

export default Teacher;
