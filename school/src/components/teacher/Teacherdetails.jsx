import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Teacherdetails.css'; // CSS file for styling
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Teacherdetails = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const navigate = useNavigate();

  const schoolId = 'Your_School_ID'; // Replace with the actual school ID

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/teachers?schoolId=${schoolId}`);
      setTeachers(response.data); // Update teacher list
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
  };

  useEffect(() => {
    fetchTeachers(); // Fetch teachers when the component mounts
  }, [schoolId]);

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/teachers/${selectedTeacherId}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== selectedTeacherId)); // Remove from the list
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  // Open confirmation modal
  const openModal = (id) => {
    setSelectedTeacherId(id);
    setShowModal(true); // Show modal for confirmation
  };

  // Close the modal without deleting
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle navigation to the edit page
  const handleEdit = (id) => {
    navigate(`/edit-teacher/${id}`); // Navigate to EditTeacher page with the teacher ID
  };

  return (
    <div className="teacher-details-container">
      <h2>Teacher Details</h2>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Class</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.subject}</td>
              <td>{teacher.class}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(teacher._id)}>
                  <FaEdit style={{ color: 'white' }} /> Edit
                </button>
                <button className="delete-btn" onClick={() => openModal(teacher._id)}>
                  <MdDelete style={{ color: 'white' }} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Small confirmation modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="small-modal-content">
            <h4>Are you sure you want to delete it?</h4>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleDelete}>
                Yes
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacherdetails;
