import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditStudent.css'; // CSS for styling

const EditStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    rollno: '',
    class: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student details by ID when the component mounts
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/students/${id}`);
        setStudentDetails(response.data); // Update state with fetched details
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/students/${id}`, studentDetails);
      navigate('/student/studentdetails'); // Navigate back to student details page after submission
    } catch (error) {
      console.error('Error updating student details:', error);
    }
  };

  return (
    <div className="edit-student-container">
      <h2>Edit Student</h2>
      <form className="edit-student-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="save-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;