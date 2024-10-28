import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Dashboard.css';

function Dashboard() {
  const { userData } = useContext(UserContext); // Use the admin data from UserContext
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/profile?email=${userData.email}`);
        const data = await response.json();

        if (response.ok) {
          setAdminProfile(data);
        } else {
          console.error('Error fetching admin profile:', data.message);
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    if (userData) {
      fetchAdminProfile(); // Fetch admin profile using the email stored in userData
    }
  }, [userData]);

  if (!userData || !adminProfile) {
    return <div>Loading admin profile...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Admin Dashboard</h1>
      <div className="card">
        <p><strong>Name:</strong> {adminProfile.username}</p>
        <p><strong>School Name:</strong> {adminProfile.schoolName}</p>
        <p><strong>Email:</strong> {adminProfile.email}</p>
        <p><strong>Phone Number:</strong> {adminProfile.phoneNumber}</p>
      </div>
    </div>
  );
}

export default Dashboard;
