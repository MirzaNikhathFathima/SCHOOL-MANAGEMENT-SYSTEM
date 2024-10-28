import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditTeacher.css';

const EditTeacher = () => {
  const { id } = useParams(); // Get teacher ID from the URL
  const [teacher, setTeacher] = useState({
    subject: '',
    class: '',
    name: '',
    email: '',
    school: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the teacher details from the backend
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/teachers/${id}`);
        setTeacher(response.data); // Populate the form with fetched data
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the teacher details in the backend
      await axios.put(`http://localhost:4000/api/teachers/${id}`, teacher);

      // After updating, navigate back to Teacherdetails page
      navigate('/teacher/teacherdetails');
    } catch (error) {
      console.error('Error updating teacher details:', error);
    }
  };

  return (
    <div className="edit-teacher-card">
      <h2>Edit Teacher Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={teacher.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Class:</label>
          <input
            type="text"
            name="class"
            value={teacher.class}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={teacher.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={teacher.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTeacher;
