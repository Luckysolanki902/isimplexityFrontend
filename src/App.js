import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from "./data.json"; // Your JSON data
import Legend from "./Legend";
import './App.css'

const getColor = (d) => {
  return d > 5000 ? { fill: "rgba(8, 81, 156, 0.9)", border: "rgb(8, 81, 156)" } :
    d > 1000 ? { fill: "rgba(49, 130, 189, 0.9)", border: "rgb(49, 130, 189)" } :
      d > 500 ? { fill: "rgba(107, 174, 214, 0.9)", border: "rgb(107, 174, 214)" } :
        d > 0 ? { fill: "rgba(189, 215, 231, 0.9)", border: "rgb(189, 215, 231)" } :
          { fill: "rgba(239, 243, 255, 0.9)", border: "rgb(239, 243, 255)" };
};

const calculateRadius = (d, zoom) => {
  const baseRadius = d > 5000 ? 15 :
    d > 1000 ? 10 :
      d > 500 ? 6 :
        5;
  return baseRadius * zoom;
}; 

const CircleMarkers = ({ data, zoom }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [clickedRegion, setClickedRegion] = useState(null);

  const handleMouseOver = (region) => {
    setHoveredRegion(region);
  };

  const handleMouseOut = () => {
    setHoveredRegion(null);
  };

  const handleClick = (region) => {
    if (clickedRegion === region) {
      setClickedRegion(null);
    } else {
      setClickedRegion(region);
    }
  };

  return (
    <>
      {data.map((item) => {
        const colors = getColor(item.data);
        return (
          <CircleMarker
            key={item.id}
            center={item.coordinates}
            radius={calculateRadius(item.data, zoom)}
            fillColor={colors.fill}
            color={colors.border}
            weight={1}
            opacity={1}
            fillOpacity={0.8}
            interactive={true}
            eventHandlers={{
              mouseover: () => handleMouseOver(item.region),
              mouseout: handleMouseOut,
              click: () => handleClick(item.region),
              
            }}
          >
            {(hoveredRegion === item.region || clickedRegion === item.region) && (
              <Popup>
                <div>
                  <h2>{item.region}</h2>
                  <p>Data Usage: {item.data}</p>
                </div>
              </Popup>
            )}
          </CircleMarker>
        );
      })}
    </>
  );
};

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [zoom, setZoom] = useState(2);
  const map = useMap();

  useEffect(() => {
    fetch("/world-110m.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error fetching geojson:", error));
  }, []);

  useEffect(() => {
    const handleZoom = () => {
      setZoom(map.getZoom());
    };

    map.on("zoom", handleZoom);
    return () => {
      map.off("zoom", handleZoom);
    };
  }, [map]);

  const style = {
    fillColor: "#fff",
    color: "#fff",
    weight: 1,
    opacity: 0,
    fillOpacity: 0,
  };

  return (
    <>
      {geoData && (
        <>
          <GeoJSON data={geoData} style={style} />
          <CircleMarkers data={data} zoom={zoom} />
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <div>
      <h2>Interactive Data Usage Map</h2>
      <MapContainer
        style={{ height: "600px", width: "100%" }}
        center={[20, 0]}
        zoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapComponent />
      </MapContainer>
      <Legend />
    </div>
  );
};

export default App;
