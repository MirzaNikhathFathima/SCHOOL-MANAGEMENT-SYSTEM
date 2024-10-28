import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import './StudentHomePage.css';
import studentphoto from '../../assets/Images/studentlogo1.jpg'; 

const StudentHomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="student-home-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            &#9776;
          </button>
          <h1>SCHOOL MANAGEMENT</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-primary logout-btn" onClick={handleLogoutClick}>Logout</button>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <img src={studentphoto}alt="Teacher" className="img-fluid rounded-circle mx-auto d-block" style={{ paddingTop: '20px' }} />
        <ul className="nav-links list-unstyled text-center mt-4">
          <li className="nav-item">
            <Link to="/studenthomepage/attendance" className="nav-link">Attendance</Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        {location.pathname === '/studenthomepage' && (
          <div className="card-container">
            <div className="info-box name-box">
              <h3>Student Name</h3>
              <h5>Ravi</h5>
            </div>
            <div className="info-box roll-box">
              <h3>Student Roll No</h3>
              <h5>15</h5>
            </div>
          </div>
        )}
        <Outlet />
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={cancelLogout}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomePage;
