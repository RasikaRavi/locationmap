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

const WindMap = () => {
  const [windData, setWindData] = useState({
    lat: "",
    lng: "",
    a_10_speed: 0,
    a_50_speed: 0,
    a_100_speed: 0,
    a_10_direction: "", // Add static direction values here
    a_50_direction: "",
    a_100_direction: "",
  });

  const zoomLevel = 12;

  const markericon = new leaflet.Icon({
    iconUrl: require("C:/Users/Lenovo/Desktop/Learn React/locationmap/src/images/placeholder.png"),
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    // popupAnchor: [0, -46],
  });

  const onSuccess = (position) => {
    setWindData({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
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

          <Marker position={[windData.lat, windData.lng]} icon={markericon}>
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

export default WindMap;

//   const createMarker = (direction) => {
//     const arrowSize = 10 * zoomLevel; // Adjust the size of the arrow based on zoom level

//     return new leaflet.DivIcon({
//       className: "arrow-icon",
//       html: `<svg width="${arrowSize}" height="${arrowSize}" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${direction}deg)">
//                 <path d="M${arrowSize / 2} 0 L${
//         arrowSize / 2
//       } ${arrowSize}" stroke="black" />
//                 <path d="M${arrowSize / 2} 0 L${
//         arrowSize / 2 - arrowSize / 5
//       } ${arrowSize / 5} M${arrowSize / 2} 0 L${
//         arrowSize / 2 + arrowSize / 5
//       } ${arrowSize / 5}" stroke="black" />
//               </svg>`,
//       iconSize: [arrowSize, arrowSize],
//       iconAnchor: [arrowSize / 2, arrowSize / 2],
//     });
//   };
//   return (
//     <>
//       {windData.lat === "" && windData.lng === "" ? (
//         "..."
//       ) : (
//         <MapContainer
//           center={[windData.lat, windData.lng]}
//           zoom={zoomLevel}
//           style={{ height: "600px", width: "550px" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           <Marker position={[windData.lat, windData.lng]} icon={markericon}>
//             <Popup>⛅</Popup>
//           </Marker>

//           <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "green" }}
//             radius={parseInt(windData.a_10_speed)}
//           >
//             <SVGOverlay
//               bounds={[
//                 [
//                   windData.lat - circleAdjusment,
//                   windData.lng + circleAdjusment,
//                 ],
//                 [
//                   windData.lat - circleAdjusment + arrowLength,
//                   windData.lng + circleAdjusment + arrowLength,
//                 ],
//               ]}
//             >
//               <svg
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   transform: `rotate(${windData.a_10_direction}deg)`,
//                 }}
//               >
//                 <polyline
//                   points="50%,0 50%,100%"
//                   style={{ fill: "none", stroke: "black", strokeWidth: 1 }}
//                 />
//               </svg>
//             </SVGOverlay>
//           </Circle>

//           <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "blue" }}
//             radius={parseInt(windData.a_50_speed)}
//           >
//             <SVGOverlay
//               bounds={[
//                 [
//                   windData.lat - circleAdjusment,
//                   windData.lng + circleAdjusment,
//                 ],
//                 [
//                   windData.lat - circleAdjusment + arrowLength,
//                   windData.lng + circleAdjusment + arrowLength,
//                 ],
//               ]}
//             >
//               <svg
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   transform: `rotate(${windData.a_50_direction}deg)`,
//                 }}
//               >
//                 <polyline
//                   points="50%,0 50%,100%"
//                   style={{ fill: "none", stroke: "black", strokeWidth: 1 }}
//                 />
//               </svg>
//             </SVGOverlay>
//           </Circle>

//           <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "red" }}
//             radius={parseInt(windData.a_100_speed)}
//           >
//             <SVGOverlay
//               bounds={[
//                 [
//                   windData.lat - circleAdjusment,
//                   windData.lng + circleAdjusment,
//                 ],
//                 [
//                   windData.lat - circleAdjusment + arrowLength,
//                   windData.lng + circleAdjusment + arrowLength,
//                 ],
//               ]}
//             >
//               <svg
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   transform: `rotate(${windData.a_100_direction}deg)`,
//                 }}
//               >
//                 <polyline
//                   points="50%,0 50%,100%"
//                   style={{ fill: "none", stroke: "black", strokeWidth: 1 }}
//                 />
//               </svg>
//             </SVGOverlay>
//           </Circle>
//         </MapContainer>
//       )}
//     </>
//   );
// <>
//   {windData.lat === "" && windData.lng === "" ? (
//     "..."
//   ) : (
//     <MapContainer
//       center={[windData.lat, windData.lng]}
//       zoom={zoomLevel}
//       style={{ height: "400px", width: "500px" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       <Marker position={[windData.lat, windData.lng]} icon={markericon}>
//         <Popup>⛅</Popup>
//       </Marker>

//       <Circle
//         center={[
//           windData.lat - circleAdjusment,
//           windData.lng + circleAdjusment,
//         ]}
//         pathOptions={{ color: "green" }}
//         radius={parseInt(windData.a_10_speed)}
//       >
//         <Marker
//           position={[
//             windData.lat - circleAdjusment,
//             windData.lng + circleAdjusment,
//           ]}
//           icon={createMarker(windData.a_10_direction)}
//         />
//       </Circle>

//       <Circle
//         center={[
//           windData.lat - circleAdjusment,
//           windData.lng + circleAdjusment,
//         ]}
//         pathOptions={{ color: "blue" }}
//         radius={parseInt(windData.a_50_speed)}
//       >
//         <Marker
//           position={[
//             windData.lat - circleAdjusment,
//             windData.lng + circleAdjusment,
//           ]}
//           icon={createMarker(windData.a_50_direction)}
//         />
//       </Circle>

//       <Circle
//         center={[
//           windData.lat - circleAdjusment,
//           windData.lng + circleAdjusment,
//         ]}
//         pathOptions={{ color: "red" }}
//         radius={parseInt(windData.a_100_speed)}
//       >
//         <Marker
//           position={[
//             windData.lat - circleAdjusment,
//             windData.lng + circleAdjusment,
//           ]}
//           icon={createMarker(windData.a_100_direction)}
//         />
//       </Circle>
//     </MapContainer>
//   )}
// </>
