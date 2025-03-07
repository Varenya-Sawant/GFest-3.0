import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload()
  }

  useEffect(() => {
    (async () => {
      const response = await axios.post('http://localhost:3000/api/profile', { email: localStorage.getItem('user_email') });
      setUserData(response.data.user)

    })()

  }, [])


  return <>
    <div>Name: {userData?.name}</div>
    <div>Email: {userData?.email}</div>
    <div>Phone Number: {userData?.phone_number}</div>
    <div>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  </>
};

export default Profile;