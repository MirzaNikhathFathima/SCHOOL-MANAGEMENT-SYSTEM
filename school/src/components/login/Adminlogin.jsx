import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import adminlogin from '../../assets/Images/adminlogin.jpg';
import './Adminlogin.css'; // Importing the custom CSS file

function Adminlogin() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message before submitting

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to Admin home page upon successful login
        navigate('/adminhomepg');
      } else {
        // Set error message to be displayed on the page
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    // Navigate to Adminregister when "Sign Up" is clicked
    navigate('/adminregister');
  };

  return (
    <div className="main d-flex align-items-center justify-content-center vh-100 adminlogin-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <div className="d-flex justify-content-center mb-4 mb-md-0">
                <img
                  src={adminlogin}
                  alt="Person working on computer"
                  className="img-fluid"
                  style={{ maxWidth: '80%' }}
                />
              </div>
              <div className="card login-card shadow ms-md-4" style={{ backgroundColor: '#4A148C', borderRadius: '15px', width: '325px', height: '500px' }}>
                <div className="card-body p-4">
                  <h3 className="text-center text-white mb-4">Admin Login</h3>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        style={{ borderRadius: '25px' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                  </form>
                  <button onClick={handleSignUpClick} className="btn btn-link mt-3">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
