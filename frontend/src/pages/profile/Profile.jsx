import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Profile.css'; // Import the CSS file

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        (async () => {
            const email = localStorage.getItem('user_email');

            if (!email) {
                navigate('/login');
                window.location.reload();
                return;
            }

            const response = await axios.post('http://localhost:3000/api/profile', { email });
            setUserData(response.data.user);
        })();
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-item">
                    <strong>Name:</strong> {userData?.name || 'Loading...'}
                </div>
                <div className="profile-item">
                    <strong>Email:</strong> {userData?.email || 'Loading...'}
                </div>
                <div className="profile-item">
                    <strong>Phone Number:</strong> {userData?.phone_number || 'Loading...'}
                </div>
                <button type="button" className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;