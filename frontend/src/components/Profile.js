import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get('http://localhost:3000/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [token]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', margin: '20px' }}>
            <h2>Profile</h2>
            <p>
                <strong>Username:</strong> {userData.username}
            </p>
            <p>
                <strong>Email:</strong> {userData.email}
            </p>
            <p>
                <strong>Role:</strong> {userData.role}
            </p>
        </div>
    );
};

export default Profile;
