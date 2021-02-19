import React from "react";
import { MapIndicator } from "./MapIndicator";

export function WorldMap({ locations }) {
  return (
    <>
    <p style={{
      textAlign: 'center',
      color: '#606060'
    }}><em>Hover on a location for cheat teleport command.</em></p>
    <div
      style={{
        width: "100%",
        paddingBottom: "100%",
        border: "2px solid #353535",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MapIndicator size={2} color="transparent" x={0} y={0}>
        +
      </MapIndicator>
      {locations.map(({ x, y }) => (
        <MapIndicator key={`${x},${y}`} size={10} x={x} y={y} color="#252525" />
      ))}
    </div>
    </>
  );
}
