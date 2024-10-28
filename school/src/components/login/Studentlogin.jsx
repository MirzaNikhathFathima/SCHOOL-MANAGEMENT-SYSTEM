import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import studentlogin from '../../assets/Images/student.jpg'; // Assuming you have a student login image
import './Studentlogin.css'; // Import custom CSS for styling

function Studentlogin() {
  const [studentRollNo, setStudentRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Use useEffect to validate form on input changes
  useEffect(() => {
    validateForm();
  }, [studentRollNo, password]);

  // Function to handle form validation
  const validateForm = () => {
    // Check if both fields are filled
    if (studentRollNo.trim() !== '' && password.trim() !== '') {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., authentication)
    
    // For now, we assume the login is successful
    // After successful login, navigate to the Student page
    navigate('/studentpage');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 studentlogin-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <div className="d-flex justify-content-center mb-4 mb-md-0">
                <img
                  src={studentlogin}
                  alt="Student working on a computer"
                  className="img-fluid"
                  style={{ maxWidth: '80%' }}
                />
              </div>
              <div
                className="card login-card shadow ms-md-4"
                style={{
                  backgroundColor: '#4A148C',
                  borderRadius: '15px',
                  width: '325px',
                  height: '450px',
                }}
              >
                <div className="card-body p-4">
                  <h3 className="text-center text-white mb-4">Student Login</h3>
                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Roll No"
                        value={studentRollNo} // Controlled component
                        onChange={(e) => setStudentRollNo(e.target.value)} // Handle changes
                        style={{ borderRadius: '25px' }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password} // Controlled component
                        onChange={(e) => setPassword(e.target.value)} // Handle changes
                        style={{ borderRadius: '25px' }}
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
                        disabled={!isFormValid} // Disable button if form is invalid
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

export default Studentlogin;