import React, { useState, useEffect, useMemo } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import scooters from '../data/ankara-scooters.json';
import { useNavigate } from 'react-router-dom';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const MapboxExample = () => {
    const [selectedScooter, setSelectedScooter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Scooters data:', scooters);
    }, []);

    const pins = useMemo(
        () =>
            scooters.map((scooter) => (
                <Marker
                    key={scooter.id}
                    coordinates={[scooter.longitude, scooter.latitude]}
                ></Marker>
            )),
        [scooters],
    );

    useEffect(() => {
        console.log('Scooters:', scooters);
        console.log('Pins:', pins);
    }, [scooters, pins]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div style={{ margin: '10px' }}>
            <Map
                center={[32.866287, 39.925533]} // Swapped latitude and longitude
                zoom={[20]} // Adjust zoom for better visibility
                style="mapbox://styles/mapbox/streets-v10"
                containerStyle={{
                    height: '98vh', // Adjusted height
                    width: '94vw', // Adjusted width
                }}
            >
                {pins}

                <Layer
                    type="symbol"
                    id="scooters"
                    layout={{
                        'text-field': 'SCOOTER',
                        'text-size': 12,
                        'text-offset': [0, 0.6],
                        'text-anchor': 'top',
                    }}
                    paint={{
                        'text-color': '#ffffff', // Change text color for better contrast
                    }}
                >
                    {scooters.map((scooter) => (
                        <Feature
                            key={scooter.id}
                            coordinates={[scooter.longitude, scooter.latitude]}
                            onClick={() => setSelectedScooter(scooter)}
                        />
                    ))}
                </Layer>

                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ 'icon-image': 'marker-15' }}
                >
                    <Feature coordinates={[32.866287, 39.925533]} />
                </Layer>

                {selectedScooter && (
                    <Popup
                        coordinates={[
                            selectedScooter.longitude,
                            selectedScooter.latitude,
                        ]}
                        offset={{
                            bottom: [0, -40],
                        }}
                        onClose={() => setSelectedScooter(null)}
                    >
                        <div>
                            <h3>Scooter ID: {selectedScooter.id}</h3>
                            <p>Battery: {selectedScooter.battery}%</p>
                        </div>
                    </Popup>
                )}
            </Map>

            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleProfile}>Profile</button>
            </div>
        </div>
    );
};

export default MapboxExample;
