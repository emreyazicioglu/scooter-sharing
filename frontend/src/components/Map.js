import React, { useState, useEffect, useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import scooters from "../data/ankara-scooters.json";
import { useNavigate } from "react-router-dom";
import Map, { Marker, Popup, Layer, Feature } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const [selectedScooter, setSelectedScooter] = useState(null);
  const navigate = useNavigate();

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

  const pins = () =>
    scooters.map((scooter) => (
      <Marker
        key={scooter.id}
        longitude={scooter.longitude}
        latitude={scooter.latitude}
        onClick={() => handleMarkerClick(scooter)}
      >
        {/* <div style={{ cursor: "pointer" }}>📍</div> */}
      </Marker>
    ));

  useEffect(() => {
    console.log("Selected scooter", selectedScooter);

    return () => {};
  }, [selectedScooter]);

  return (
    <div>
      <Map
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 32.866287,
          latitude: 39.925533,
          zoom: 12,
        }}
        style={{
          height: "100vh",
          width: "100wh",
        }}
      >
        {pins}
        {/* {popups} */}

        {selectedScooter && (
          <div>
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
              //   closeOnClick={true}
            >
              <div>
                <h3>Scooter ID: {selectedScooter.id}</h3>
                <p>Battery: {selectedScooter.battery}%</p>
              </div>
            </Popup>
          </div>
        )}
      </Map>

      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleProfile}>Profile</button>
      </div>
    </div>
  );
};

export default MapboxExample;
