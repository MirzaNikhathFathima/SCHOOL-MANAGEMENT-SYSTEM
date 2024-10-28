import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import './Teacherhomepage.css';
import teacherPhoto from '../../assets/Images/teacher.jpg'; // Import the teacher photo

const Teacherhomepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutConfirmVisible, setIsLogoutConfirmVisible] = useState(false); // State for logout confirmation
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    setIsLogoutConfirmVisible(true); // Show the confirmation dialog
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmVisible(false); // Hide the confirmation dialog
  };

  const handleConfirmLogout = () => {
    // Logic for logging out (e.g., clearing session, redirecting to login)
    navigate('/login');
  };

  return (
    <div className="teacher-home-container">
      {/* Header */}
      <header className="teacher-header">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            &#9776; {/* Menu icon */}
          </button>
          <h1>SCHOOL MANAGEMENT</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-primary logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <img src={teacherPhoto} alt="Teacher" className="img-fluid rounded-circle mx-auto d-block" style={{ paddingTop: '20px' }} />
        <ul className="nav-links text-center pt-3 fw-bold">
          <li><Link to="/teacherhomepage/attendance">ATTENDANCE</Link></li>
          <li><Link to="/teacherhomepage/assignments">ASSIGNMENTS</Link></li>
        </ul>
      </div>

      {/* Main content */}
      <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        {location.pathname === '/teacherhomepage' && (
          <div className="teacher-info-container"> {/* Container for cards */}
            <div className="teacher-info-card name-card"> {/* Custom CSS class */}
              <h3>Teacher Name</h3>
              <h5>Seetha</h5>
            </div>
            <div className="teacher-info-card id-card"> {/* Custom CSS class */}
              <h3>Teacher ID</h3>
           <h5>TO4</h5>
            </div>
          </div>
        )}
        <Outlet />
      </div>

      {/* Logout confirmation modal */}
      {isLogoutConfirmVisible && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <p>Are you sure you want to logout?</p>
            <div className="d-flex justify-content-between mt-3"> {/* Increased gap between buttons */}
              <button className="btn btn-secondary me-3" onClick={handleCancelLogout}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleConfirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacherhomepage;