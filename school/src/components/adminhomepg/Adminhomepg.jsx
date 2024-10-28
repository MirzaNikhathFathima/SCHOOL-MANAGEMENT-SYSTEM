import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import './Adminhomepg.css';
import { IoPersonCircleOutline } from 'react-icons/io5';
import adminphoto from '../../assets/Images/adminprofile.jpg'; 
import axios from 'axios'; // Import axios for API requests

const Adminhomepg = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutConfirmVisible, setIsLogoutConfirmVisible] = useState(false); // Logout confirmation state
  const [studentCount, setStudentCount] = useState(0); // State for student count
  const [teacherCount, setTeacherCount] = useState(0); // State for teacher count
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch the student count from the backend
    axios.get('/api/student/count')
      .then(response => {
        setStudentCount(response.data.count); // Update student count state
      })
      .catch(error => {
        console.error("There was an error fetching the student count!", error);
      });

    // Fetch the teacher count from the backend
    axios.get('/api/teacher/count')
      .then(response => {
        setTeacherCount(response.data.count); // Update teacher count state
      })
      .catch(error => {
        console.error("There was an error fetching the teacher count!", error);
      });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfileClick = () => {
    navigate('/adminhomepg/dashboard');
  };

  const handleLogoutClick = () => {
    setIsLogoutConfirmVisible(true); // Show confirmation modal
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmVisible(false); // Hide confirmation modal
  };

  const handleConfirmLogout = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="admin-home-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            &#9776;
          </button>
          <h1>SCHOOL MANAGEMENT</h1>
        </div>
        <div className="header-right">
          <IoPersonCircleOutline className="profile-pic-header" onClick={handleProfileClick} />
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="user-info">
          <img src={adminphoto} alt="Admin" className="img-fluid rounded-circle mx-auto d-block pt-2" />
        </div>
        <ul className="nav-links">
          <li><Link to="/adminhomepg/dashboard">Dashboard</Link></li>
          <li><Link to="/adminhomepg/teacher">Teacher</Link></li>
          <li><Link to="/adminhomepg/student">Student</Link></li>
        </ul>
        <button className="btn btn-primary logout-btn" onClick={handleLogoutClick}>Logout</button>
      </div>

      {/* Main content */}
      <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        {/* Show cards only if on /adminhomepg path */}
        {location.pathname === '/adminhomepg' && (
          <div className="custom-card-container">
            {/* Card for Total Teachers */}
            <div className="custom-info-card">
              <img
                src="https://static.vecteezy.com/system/resources/previews/004/654/732/original/young-woman-teacher-teaching-cartoon-character-free-vector.jpg"
                alt="Teacher Icon"
                className="card-icon"
              />
              <h3>Total Teachers</h3>
              <h5>{teacherCount}</h5> {/* Display fetched teacher count */}
            </div>

            {/* Card for Total Students */}
            <div className="custom-info-card">
              <img
                src="https://w7.pngwing.com/pngs/878/170/png-transparent-student-cartoon-kids-child-people-reading-thumbnail.png"
                alt="Student Icon"
                className="card-icon"
              />
              <h3>Total Students</h3>
              <h5>{studentCount}</h5> {/* Display fetched student count */}
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
            <div className="logout-confirm-buttons">
              <button className="btn btn-secondary" onClick={handleCancelLogout}>
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

export default Adminhomepg;
