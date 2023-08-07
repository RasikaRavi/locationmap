import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet-rotatedmarker";

const Arrow = ({ position, direction }) => {
  const context = useLeafletContext();

  useEffect(() => {
    const container = context.layerContainer || context.map;
    const svgElement = L.svg({ clickable: true }).addTo(container);

    const getRotation = () => {
      switch (direction) {
        case "N":
          return 0;
        case "S":
          return 180;
        case "E":
          return 90;
        case "W":
          return 270;
        default:
          return 0;
      }
    };

    const arrow = L.polyline(
      [
        [position[0], position[1]],
        [position[0] - 0.01, position[1]],
      ],
      { color: "black", weight: 3 }
    )
      .addTo(svgElement)
      .setRotationOrigin("center center")
      .setRotationAngle(getRotation());

    return () => {
      container.removeLayer(svgElement);
    };
  }, [context, direction, position]);

  return null;
};

export default Arrow;
