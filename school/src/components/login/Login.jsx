import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import './Login.css'; // Your custom CSS

function Login() {
  const navigate = useNavigate();
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    // Trigger the page transition when the component mounts
    setPageTransition(true);
  }, []);

  const handleAdminLogin = () => {
    navigate('/adminlogin');
  };

  const handleStudentLogin = () => {
    navigate('/studentlogin');
  };

  const handleTeacherLogin = () => {
    navigate('/teacherlogin');
  };

  return (
    <div className={`App ${pageTransition ? 'page-transition' : ''}`}>
      <div className="card-container">
        {/* Top Row with 2 Cards */}
        <div className="card-row">
          <div className="card" onClick={handleAdminLogin} transition-style="in:diamond:center">
            <div className="icon-container">
              <IoPersonCircleSharp size="2.5em" />
            </div>
            <h3 className="text-dark">Admin</h3>
            <p>Login as an administrator to access the dashboard to manage app data.</p>
          </div>
          <div className="card" onClick={handleStudentLogin} transition-style="in:diamond:center">
            <div className="icon-container">
              <PiStudentFill size="2.5em" />
            </div>
            <h3 className="text-dark">Student</h3>
            <p>Login as a student to explore course materials and assignments.</p>
          </div>
        </div>

        {/* Bottom Centered Card */}
        <div className="card" onClick={handleTeacherLogin} transition-style="in:diamond:center">
          <div className="icon-container">
            <GiTeacher size="2.5em" />
          </div>
          <h3 className="text-dark">Teacher</h3>
          <p>Login as a teacher to create courses, assignments, and track student progress.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
