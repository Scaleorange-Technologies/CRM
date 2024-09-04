import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:9000/roles/getuser", {
          headers: {
            'access_token': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)
        setUserDetails(response.data[0]);

      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!userDetails) {
    return <p>No user details available.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-6xl text-gray-400 dark:text-gray-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center">My Profile</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p><strong>Username: </strong> {userDetails.username}</p>
          <p><strong>Email: </strong> {userDetails.email}</p>
          <p><strong>Phone: </strong> {userDetails.phone}</p>
          <p><strong>Role: </strong>{jwtDecode(userDetails.access_token).rolename}</p>

          
         
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
