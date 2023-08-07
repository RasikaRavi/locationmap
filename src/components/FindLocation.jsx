import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  Circle,
  Tooltip,
} from "react-leaflet";
import leaflet from "leaflet";
// import "leaflet/dist/leaflet.css";

const FindLocation = () => {
  const [windData, setWindData] = useState({
    lat: "",
    lng: "",
    a_10_speed: 0,
    a_50_speed: 0,
    a_100_speed: 0,
    a_10_direction: "",
    a_50_direction: "",
    a_100_direction: "",
  });

  const zoomLevel = 12;

  const markericon = new leaflet.Icon({
    // iconUrl: require("E:/External_Project/loactionmap/src/images/placeholder.png"),
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    // popupAnchor: [0, -46],
  });

  const onSuccess = (windData) => {
    setWindData({
      lat: windData.coords.latitude,
      lng: windData.coords.longitude,
      a_10_speed: 10 * 10,
      a_50_speed: 50 * 10,
      a_100_speed: 100 * 10,
      // possible values: N|S|E|W   NE|NW|NS SE|SW|SN so on...
      a_10_direction: "",
      a_50_direction: "",
      a_100_direction: "",
    });
  };

  const onError = (error) => {
    setWindData({
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  let circleAdjusment = 0.00001;

  return (
    <>
      {windData.lat == "" && windData.lng == "" ? (
        "..."
      ) : (
        <MapContainer
          center={[windData.lat, windData.lng]}
          zoom={zoomLevel}
          style={{ height: "400", width: "500" }}
        >
          <TileLayer
            // url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=YqUn4ZF2ivinZYoKFv3X"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[windData.lat, windData.lng]}>
            <Popup>⛅</Popup>
          </Marker>

          <Circle
            center={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            pathOptions={{ color: "green" }}
            radius={parseInt(windData.a_10_speed)}
          ></Circle>

          <Circle
            center={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            pathOptions={{ color: "blue" }}
            radius={parseInt(windData.a_50_speed)}
          ></Circle>

          <Circle
            center={[
              windData.lat - circleAdjusment,
              windData.lng + circleAdjusment,
            ]}
            pathOptions={{ color: "red" }}
            radius={parseInt(windData.a_100_speed)}
          ></Circle>
        </MapContainer>
      )}
    </>
  );
};

export default FindLocation;
