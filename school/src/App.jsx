import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Adminlogin from './components/login/Adminlogin';
import Teacherlogin from './components/login/Teacherlogin';
import Studentlogin from './components/login/Studentlogin';
import Adminregister from './components/register/Adminregister';
import Adminhomepg from './components/adminhomepg/Adminhomepg';
import Dashboard from './components/dashboard/Dashboard';
import Teacher from './components/teacher/Teacher';
import Teacherdetails from './components/teacher/Teacherdetails';
import Student from './components/student/Student';
import RoutingError from './components/RoutingError';
import Studenthomepage from './components/student/Studenthomepage';
import Studentattendance from './components/student/Studentattendance';
import Teacherhomepage from './components/teacher/Teacherhomepage';
import TeacherAttendance from './components/teacher/TeacherAttendance'; 
import Studentpage from './components/student/Studentpage';
import Syllabus from './components/student/Syllabus';
import EditTeacher from './components/teacher/EditTeacher';
import Studentdetails from './components/student/Studentdetails';
import EditStudent from './components/student/EditStudent';
import AssignmentsPage from './components/teacher/AssignmentsPage';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <RoutingError />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'adminlogin',
      element: <Adminlogin />,
    },
    {
      path: 'teacherlogin',
      element: <Teacherlogin />,
    },
    {
      path: 'studentlogin',
      element: <Studentlogin />,
    },
    {
      path: 'studentpage',
      element: <Studentpage />,
    },
    {
      path: 'syllabus',
      element: <Syllabus />,
    },
    {
      path: 'studenthomepage',
      element: <Studenthomepage />,
      children: [
        {
          path: 'attendance',
          element: <Studentattendance />,
        },
      ],
    },
    {
      path: 'teacherhomepage',
      element: <Teacherhomepage />,
      children: [
        {
          path: 'attendance',
          element: <TeacherAttendance />,
        },
        {
          path: 'assignments',  // Correct route for assignments under teacherhomepage
          element: <AssignmentsPage />,  // Display AssignmentsPage component here
        },
      ],
    },
    {
      path: 'adminregister',
      element: <Adminregister />,
    },
    {
      path: 'adminhomepg',
      element: <Adminhomepg />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'teacher',
          element: <Teacher />,
        },
        {
          path: 'student',
          element: <Student />,
        },
      ],
    },
    {
      path: 'teacher/teacherdetails',
      element: <Teacherdetails />,
    },
    {
      path: 'edit-teacher/:id',
      element: <EditTeacher />,
    },
    {
      path: 'student/studentdetails',
      element: <Studentdetails />,
    },
    {
      path: 'edit-student/:id',
      element: <EditStudent />,
    },
    {
      path: '*',
      element: <RoutingError />,
    },
  ]);

  return (
    <UserProvider>
      <div className="main">
        <RouterProvider router={browserRouter} />
      </div>
    </UserProvider>
  );
}

export default App;
