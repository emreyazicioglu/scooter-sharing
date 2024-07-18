import * as React from "react";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Mapbox() {
  return (
    <Map
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{
        height: "100vh",
        width: "100vw",
      }}
      mapboxAccessToken="pk.eyJ1IjoiZW1yZXlhemljaW9nbHUiLCJhIjoiY2x5aDVzcXdmMDE4ejJrcjNweWJleTMxNyJ9.73EhULRwGnm_MS6bO3uRGA"
    >
      <Marker
        anchor="bottom"
        longitude={-0.48174784604114}
        latitude={51.3233379650232}
      ></Marker>
    </Map>
  );
}

export default Mapbox;
