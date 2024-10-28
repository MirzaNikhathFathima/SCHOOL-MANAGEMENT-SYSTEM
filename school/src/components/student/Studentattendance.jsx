import React, { useState, useEffect } from 'react';
import './StudentAttendance.css';

const StudentAttendance = ({ rollNo }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching attendance data with hardcoded sample data
    const sampleAttendanceData = [
      { date: '2024-10-01', status: 'Present' },
      { date: '2024-10-02', status: 'Absent' },
      { date: '2024-10-03', status: 'Present' },
      { date: '2024-10-04', status: 'Present' },
      { date: '2024-10-05', status: 'Absent' },
      { date: '2024-10-06', status: 'Present' },
      // Add more sample data as needed
    ];

    setAttendanceData(sampleAttendanceData);
    setLoading(false);
  }, [rollNo]);

  if (loading) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <div className="attendance-container">
      <h2>Attendance for Last 30 Days</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No attendance data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttendance;
