import React, { useState, useEffect } from 'react';
import './AssignmentsPage.css';

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [className, setClassName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulated fetching of assignments (You can replace this with your desired data)
  useEffect(() => {
    // Simulated assignments data
    const fetchAssignments = async () => {
      setLoading(true);
      const simulatedAssignments = [
        { _id: '1', title: 'Math Homework', description: 'Complete exercises 1-10', dueDate: '2024-10-30', class: 'Math 101' },
        { _id: '2', title: 'Science Project', description: 'Group project on ecosystems', dueDate: '2024-11-05', class: 'Science 102' },
      ];
      setAssignments(simulatedAssignments);
      setLoading(false);
    };

    fetchAssignments();
  }, []);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();

    const newAssignment = {
      title,
      description,
      dueDate,
      class: className,
      teacherId: 'teacher-id-placeholder', // Replace with actual teacher ID from session
    };

    // Simulated successful creation of assignment
    setAssignments((prevAssignments) => [...prevAssignments, { ...newAssignment, _id: Date.now().toString() }]);
    setMessage('Assignment has been created successfully');
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setClassName('');
  };

  return (
    <div className="assignments-page">
      <h2>Assignments</h2>

      {/* Form to create a new assignment */}
      <form onSubmit={handleCreateAssignment} className="assignment-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Class:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="form-control"
            placeholder="Enter class"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Assignment</button>
      </form>

      {message && <p className="alert alert-info">{message}</p>}

      {/* Display the list of assignments */}
      <h3>Existing Assignments</h3>
      {loading ? (
        <p>Loading assignments...</p>
      ) : (
        <div className="assignment-list">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="assignment-item">
              <h4>{assignment.title}</h4>
              <p>{assignment.description}</p>
              <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p>Class: {assignment.class}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
