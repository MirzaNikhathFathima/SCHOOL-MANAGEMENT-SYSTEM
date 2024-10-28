import React from "react";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

function Home() {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleSignupClick = () => {
    navigate('/adminregister'); // Navigate to Admin Register page on signup
  };

  return (
    <div className="home">
    <div className="container-fluid home-container">
      <div className="row align-items-center">
        <div className="col-md-6 home-content">
          <h1 className="display-4">Welcome to School Management System</h1>
          <p className="lead">
            Enhance school management by organizing classes, adding students and faculty, 
            and tracking attendance easily. Assess performance, access records, view grades, 
            and communicate smoothly.
          </p>
          <div className="home-buttons">
            <button className="btn btn-primary login-btn" onClick={handleLoginClick}>LOGIN</button>
          </div>
          <div className="signup-link">
            <p>Don't have an account? 
              <span 
                className="text-primary signup-text" 
                style={{ cursor: 'pointer' }} 
                onClick={handleSignupClick}>
                Sign up
              </span>
            </p>
          </div>
        </div>
        <div className="col-md-6 home-image">
          {/* Background image will be applied through CSS */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;