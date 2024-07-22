import React, { useState, useEffect, useMemo, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import Map, { Marker, Popup, Layer, Feature } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const MapboxExample = () => {
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [scooters, setScooters] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchScooters() {
      try {
        const response = await axios.get("http://localhost:3000/scooters", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setScooters(response.data);
      } catch (error) {
        setError("Invalid token");
      }
    }
    fetchScooters();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleMarkerClick = (scooter) => {
    console.log("Marker clicked:", scooter);
    setSelectedScooter(scooter);
    console.log("Selected scooter state:", scooter);
  };

  const handleStartRide = async (scooter) => {
    try {
      console.log(token);
      const response = await axios.post(
        `http://localhost:3000/scooters/${selectedScooter.id}/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      setError("Invalid token");
    }
  };

  const handleStopRide = async (scooter) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/scooters/${selectedScooter.id}/stop`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      setError("Invalid token");
    }
  };

  return (
    <div>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        initialViewState={{
          longitude: 32.866287,
          latitude: 39.925533,
          zoom: 14,
        }}
        style={{
          height: "100vh",
          width: "100wh",
        }}
      >
        {scooters.map((scooter) => (
          <Marker
            key={scooter.id}
            longitude={scooter.longitude}
            latitude={scooter.latitude}
            onClick={() => handleMarkerClick(scooter)}
          >
            {/* <div style={{ cursor: "pointer" }}>📍</div> */}
          </Marker>
        ))}

        {selectedScooter && (
          <Popup
            longitude={selectedScooter.longitude}
            latitude={selectedScooter.latitude}
            anchor="bottom"
            offset={{
              bottom: [0, -40],
            }}
            onOpen={() => {
              console.log("Rendering popup for scooter:", selectedScooter);
            }}
            onClose={() => {
              console.log("Popup closed");
              setSelectedScooter(null);
            }}
            closeOnClick={false}
          >
            <div>
              <h3>Scooter ID: {selectedScooter.id}</h3>
              <p>Battery: {selectedScooter.battery_status}%</p>
              <button onClick={() => handleStartRide(selectedScooter)}>
                Start
              </button>
              <button onClick={() => handleStopRide(selectedScooter)}>
                Stop
              </button>
            </div>
          </Popup>
        )}
        <Popup longitude={-100} latitude={40} anchor="bottom">
          You are here
        </Popup>
      </Map>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleProfile}>Profile</button>
      </div>
    </div>
  );
};

export default MapboxExample;
