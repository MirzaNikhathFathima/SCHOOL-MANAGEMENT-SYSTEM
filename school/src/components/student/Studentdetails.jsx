import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Studentdetails.css'; // CSS for styling
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Studentdetails = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const navigate = useNavigate();

  const schoolId = 'Your_School_ID'; // Replace with the actual school ID

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/students?schoolId=${schoolId}`);
      setStudents(response.data); // Update student list
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Fetch students when the component mounts
  }, [schoolId]);

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/students/${selectedStudentId}`);
      setStudents(students.filter((student) => student._id !== selectedStudentId)); // Remove from the list
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Open confirmation modal
  const openModal = (id) => {
    setSelectedStudentId(id);
    setShowModal(true); // Show modal for confirmation
  };

  // Close the modal without deleting
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle navigation to the edit page
  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`); // Navigate to EditStudent page with the student ID
  };

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollno}</td>
              <td>{student.class}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(student._id)}>
                  <FaEdit style={{ color: 'white' }} /> Edit
                </button>
                <button className="delete-btn" onClick={() => openModal(student._id)}>
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

export default Studentdetails;