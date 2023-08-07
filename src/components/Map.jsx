import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
  Circle,
  Tooltip,
  LayersControl,
} from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import WindyLayer from "./WindyLayer";
import jsonData from "../sampledata/wind-global.json";
// import CustomImageMarker from "./CustomImageMarker";

const Map = () => {
  const [windData, setWindData] = useState({
    lat: "",
    lng: "",
    // a_10_speed: 0,
    // a_50_speed: 0,
    // a_100_speed: 0,
    // a_10_direction: "",
    // a_50_direction: "",
    // a_100_direction: "",
  });
  // const [display, setDisplay] = useState("none");
  const zoomLevel = 12;

  const markericon = new leaflet.Icon({
    iconUrl: require("C:/Users/Lenovo/Desktop/Learn React/locationmap/src/images/placeholder.png"),
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -46],
  });

  const onSuccess = (windData) => {
    setWindData({
      lat: windData.coords.latitude,
      lng: windData.coords.longitude,
      // a_10_speed: 10 * 10,
      // a_50_speed: 50 * 10,
      // a_100_speed: 100 * 10,
      // // possible values: N|S|E|W   NE|NW|NS SE|SW|SN so on...
      // a_10_direction: "",
      // a_50_direction: "",
      // a_100_direction: "",
    });
  };

  const onError = (error) => {
    setWindData({
      error: {
        code: error.code,
        message: error.message,
      },
    });
    console.log("Error:", error.message);
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

  return (
    <>
      {windData.lat == "" && windData.lng == "" ? (
        "..."
      ) : (
        <MapContainer
          center={[windData.lat, windData.lng]}
          zoom={zoomLevel}
          style={{ height: "600px", width: "100%" }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Google map">
              <TileLayer
                attribution="@Maptiler Maps"
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=YqUn4ZF2ivinZYoKFv3X"
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                // url=https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=YqUn4ZF2ivinZYoKFv3X"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name="Windy Layer">
              <WindyLayer
                // displayValues={true}
                // displayOptions={{
                //   velocityType: "GBR Wind",
                //   displayPosition: "bottomright",
                //   displayEmptyString: "No wind data",
                // }}
                data={jsonData}
                maxVlocity={10}
                minVelocity={0}
                opacity={1}
                color={[
                  "rgb(36,104, 180)",
                  "rgb(60,157, 194)",
                  "rgb(128,205,193)",
                  "rgb(151,218,168)",
                  "rgb(198,231,181)",
                  "rgb(238,247,217)",
                  "rgb(255,238,159)",
                  "rgb(252,217,125)",
                  "rgb(255,182,100)",
                  "rgb(252,150,75)",
                  "rgb(250,112,52)",
                  "rgb(245,64,32)",
                  "rgb(237,45,28)",
                  "rgb(220,24,32)",
                  "rgb(180,0,35)",
                ]}
              />
            </LayersControl.Overlay>
          </LayersControl>
          <Marker position={[windData.lat, windData.lng]} icon={markericon}>
            <Popup>⛅</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
// {
//   /* <LayersControl.BaseLayer checked name="OSM">
//               <TileLayer
//                 attribution="© OpenStreetMap contributors"
//                 url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJpeWFua2ExMjEwOTIiLCJhIjoiY2trbWQxY3h1MnBwMDJvbW5iNW96eTlrcCJ9.scUQlt1OTvRBxmshXeldaQ"
//               />
//             </LayersControl.BaseLayer> */
// }

// {
//   /* <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "green" }}
//             radius={parseInt(windData.a_10_speed)}
//           ></Circle>
//           <Marker
//             position={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             icon={imageIcon}
//           />

//           <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "blue" }}
//             radius={parseInt(windData.a_50_speed)}
//           ></Circle>

//           <Marker
//             position={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             icon={imageIcon}
//           />

//           <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "red" }}
//             radius={parseInt(windData.a_100_speed)}
//           >
//             {" "}
//           </Circle>
//           <Marker
//             position={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             icon={imageIcon}
//           /> */
// }

// // let circleAdjusment = 0.00001;

// // const imageIcon = new leaflet.DivIcon({
// //   className: "my-custom-icon", // Optional, can style in CSs
// //   // https://cdn-icons-png.flaticon.com/512/20/20825.png
// //   // style: { display: { display } },
// //   html: `<img src="https://cdn-icons-png.flaticon.com/512/20/20902.png" alt="my-icon" style="width:50px;height:50px" />`,
// //   iconSize: [50, 50],
// // });

// import React, { useState, useEffect } from "react";
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   CircleMarker,
//   Circle,
//   Tooltip,
// } from "react-leaflet";
// import leaflet from "leaflet";
// import Arrow from "./Arrow";

// const Map = () => {
//   const [windData, setWindData] = useState({
//     lat: "",
//     lng: "",
//     a_10_speed: 0,
//     a_50_speed: 0,
//     a_100_speed: 0,
//     a_10_direction: "",
//     a_50_direction: "",
//     a_100_direction: "",
//   });

//   const zoomLevel = 12;

//   const markericon = new leaflet.Icon({
//     iconUrl: "/icons8-location-48.png",
//     iconSize: [48, 48],
//     iconAnchor: [24, 48],
//     // popupAnchor: [0, -46],
//   });

//   const onSuccess = (windData) => {
//     setWindData({
//       lat: windData.coords.latitude,
//       lng: windData.coords.longitude,
//       a_10_speed: 10 * 10,
//       a_50_speed: 50 * 10,
//       a_100_speed: 100 * 10,
//       // possible values: N|S|E|W   NE|NW|NS SE|SW|SN so on...
//       a_10_direction: "N",
//       a_50_direction: "S",
//       a_100_direction: "W",
//     });
//   };

//   const onError = (error) => {
//     setWindData({
//       error: {
//         code: error.code,
//         message: error.message,
//       },
//     });
//   };

//   useEffect(() => {
//     if (!("geolocation" in navigator)) {
//       onError({
//         code: 0,
//         message: "Geolocation not supported",
//       });
//     }
//     navigator.geolocation.getCurrentPosition(onSuccess, onError);
//   }, []);
//   let circleAdjusment = 0.00001;

//   return (
//     <>
//       {windData.lat == "" && windData.lng == "" ? (
//         "..."
//       ) : (
//         <MapContainer
//           center={[windData.lat, windData.lng]}
//           zoom={zoomLevel}
//           style={{ height: "400", width: "500" }}
//         >
//           <TileLayer
//             url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=YqUn4ZF2ivinZYoKFv3X"
//             // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

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
//             <Arrow
//               position={[
//                 windData.lat - circleAdjusment,
//                 windData.lng + circleAdjusment,
//               ]}
//               direction={windData.a_10_direction}
//             />
//           </Circle>

//           <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "blue" }}
//             radius={parseInt(windData.a_50_speed)}
//           >
//             <Arrow
//               position={[
//                 windData.lat - circleAdjusment,
//                 windData.lng + circleAdjusment,
//               ]}
//               direction={windData.a_50_direction}
//             />
//           </Circle>

//           <Circle
//             center={[
//               windData.lat - circleAdjusment,
//               windData.lng + circleAdjusment,
//             ]}
//             pathOptions={{ color: "red" }}
//             radius={parseInt(windData.a_100_speed)}
//           >
//             <Arrow
//               position={[
//                 windData.lat - circleAdjusment,
//                 windData.lng + circleAdjusment,
//               ]}
//               direction={windData.a_100_direction}
//             />
//           </Circle>
//         </MapContainer>
//       )}
//     </>
//   );
// };

// export default Map;
