import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './TeacherAttendance.css';

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showRollNumbers, setShowRollNumbers] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState('');

  const handleClassSelect = (event) => {
    setSelectedClass(event.target.value);
    setShowRollNumbers(true);
  };

  const handleAttendanceToggle = (rollno) => {
    setAttendance(prevState => ({
      ...prevState,
      [rollno]: prevState[rollno] === 'Absent' ? 'Present' : 'Absent',
    }));
  };

  const handleSubmit = async () => {
    try {
      const attendanceData = {
        date: selectedDate,
        class: selectedClass,
        attendance,
      };
      await axios.post('http://localhost:4000/api/attendance', attendanceData);
      setMessage('Attendance has been recorded successfully');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setMessage('Failed to record attendance');
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Mark Attendance</h2>

      <div className="mb-3">
        <label>Select Date:</label>
        <input
          type="date"
          className="form-control mx-auto w-50" // Set width to 50%
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>

      {!showRollNumbers && (
        <div className="mb-3">
          <label>Select Class:</label>
          <select
            className="form-select mx-auto w-50" // Set width to 50%
            value={selectedClass}
            onChange={handleClassSelect}
            required
          >
            <option value="">--Select Class--</option>
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>Class {i + 1}</option>
            ))}
          </select>
        </div>
      )}

      {showRollNumbers && (
        <div className="student-grid d-flex flex-wrap justify-content-center mb-4">
          {[...Array(30).keys()].map(i => {
            const rollno = i + 1;
            return (
              <div
                key={rollno}
                className={`rollno-box d-flex align-items-center justify-content-center ${attendance[rollno] === 'Absent' ? 'absent' : ''}`}
                onClick={() => handleAttendanceToggle(rollno)}
              >
                {rollno}
              </div>
            );
          })}
        </div>
      )}

      {showRollNumbers && (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Attendance
        </button>
      )}

      {message && (
        <div className="alert alert-info mt-3">
          {message}
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;
