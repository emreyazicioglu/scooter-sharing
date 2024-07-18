import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Map = () => {
    const [scooters, setScooters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScooters = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:3000/scooters',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setScooters(response.data);
            } catch (error) {
                console.error('Failed to fetch scooters', error);
            }
        };

        fetchScooters();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile'); // Replace with your profile page route
    };

    return (
        <div className="centered">
            <h2>Map Page</h2>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleProfile}>Profile</button>
            </div>
            <ul>
                {scooters.map((scooter) => (
                    <li key={scooter.id}>
                        {scooter.unique_name} - Battery:{' '}
                        {scooter.battery_status}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Map;
