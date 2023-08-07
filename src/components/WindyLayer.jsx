import "leaflet-velocity";
import L from "leaflet";
import React from "react";
import { useLeafletContext } from "@react-leaflet/core";

const WindyLayer = ({
  displayValues,
  displayOptions,
  data,
  minVelocity,
  maxVlocity,
  opacity,
  color,
}) => {
  const context = useLeafletContext();

  React.useEffect(() => {
    const velocityLayer = L.velocityLayer({
      displayValues: displayValues,
      displayOptions: displayOptions,
      data: data,
      minVelocity: minVelocity,
      maxVelocity: maxVlocity,
      opacity: opacity,
      colorScale: color,
    });
    const container = context.layerContainer || context.map;

    container.addLayer(velocityLayer);

    return () => {
      container.removeLayer(velocityLayer);
    };
  });

  return null;
};

export default WindyLayer;
