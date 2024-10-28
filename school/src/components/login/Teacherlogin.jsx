import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import teacherlogin from '../../assets/Images/teacher_resized.jpg';
import './TeacherLogin.css'; // Import the custom CSS file

function TeacherLogin() {
  const [teacherEmail, setTeacherEmail] = useState(''); // State for Teacher Email
  const [password, setPassword] = useState(''); // State for Password
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to check if the form is valid
  const isFormValid = () => {
    return teacherEmail !== '' && password !== '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Example of login logic - replace this with your actual API call
      await fetch('/api/teachers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: teacherEmail,
          password: password,
        }),
      });

      // Navigate to Teacherhomepage after successful login
      navigate('/teacherhomepage');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 teacherlogin-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <div className="d-flex justify-content-center mb-4 mb-md-0">
                <img
                  src={teacherlogin} // Use the teacher-specific image
                  alt="Teacher working on computer"
                  className="img-fluid"
                  style={{ maxWidth: '80%' }}
                />
              </div>
              <div className="card login-card shadow ms-md-5" style={{ backgroundColor: '#4A148C', borderRadius: '15px', width: '325px', height: '500px' }}>
                <div className="card-body p-4">
                  <h3 className="text-center text-white mb-4">Teacher Login</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Teacher Mail ID"
                        style={{ borderRadius: '25px' }}
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        style={{ borderRadius: '25px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <a href="#" className="text-white">
                        Forgot your password?
                      </a>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-warning btn-block"
                        style={{ borderRadius: '25px' }}
                        disabled={!isFormValid()} // Disable button if form is not valid
                      >
                        LOGIN
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;